'use strict';

define([
    'knockout', 'onefold-js', 'stringifyable', './application-event-dispatcher', 'text!ko-grid/data.html.template'
], function (ko, js, stringifyable, ApplicationEventDispatcher, dataTemplate) {
    var TEXT_NODE = window.Node.TEXT_NODE;
    var ELEMENT_NODE = window.Node.ELEMENT_NODE;
    var HIJACKED_KEY = '__@__hijacked';

    var document = window.document;

    var data = {
        init: template => {
            template.replace('body').with('body', dataTemplate);
            template.to('table').prepend([
                '<div class="ko-grid-load-indicator" data-bind="style: { display: data.rows.__dirty() ? \'block\' : \'none\' }">Loading&hellip;</div>'].join(''));
        },
        Constructor: function (bindingValue, config, grid) {
            var disposeCallbacks = [];

            /** @type {de.benshu.ko.dataSource.DataSource<?, ?, ?>} */
            this.source = bindingValue['dataSource'];

            this.valueSelector = bindingValue['valueSelector'] || config['valueSelector'] || (p => p);
            this['valueSelector'] = this.valueSelector;
            this.observableValueSelector = bindingValue['observableValueSelector'] || config['observableValueSelector'] || this.valueSelector;
            this['observableValueSelector'] = this.observableValueSelector;

            this.predicates = ko.observableArray(bindingValue.filters || []);
            this['predicates'] = this.predicates;
            this.predicate = ko.pureComputed(() => stringifyable.predicates.and(this.predicates().map(ko.unwrap)));
            this['predicate'] = this.predicate;
            this.comparator = ko.observable(stringifyable.comparators.indifferent);
            this['comparator'] = this.comparator;
            this.offset = ko.observable(0);
            this['offset'] = this.offset;
            this.limit = ko.observable(Number.POSITIVE_INFINITY);
            this['limit'] = this.limit;

            var view = this.source.openView(q => q
                .filteredBy(this.predicate)
                .sortedBy(this.comparator)
                .offsetBy(this.offset)
                .limitedTo(this.limit));
            disposeCallbacks.push(view.dispose.bind(view));

            this.view = view;
            this['view'] = view;

            this._postApplyBindings = () => {};
            this.__postApplyBindings = callback => {
                var innerCallback = this._postApplyBindings;
                this._postApplyBindings = () => {
                    callback(innerCallback);
                };
            };

            disposeCallbacks.push(initTbodyElement.call(this, grid));
            disposeCallbacks.push(initRows.call(this));
            disposeCallbacks.push(initEventDispatching.call(this));
            disposeCallbacks.push(initElementLookup.call(this, grid));

            this._dispose = () => {
                disposeCallbacks.forEach(callback => {
                    callback();
                });
            };
        }
    };

    function initTbodyElement(grid) {
        this.__postApplyBindings(inner => {
            inner();
            this.__tbodyElement = grid.element.querySelector('.ko-grid-tbody');
        });

        return () => { this.__tbodyElement = null; };
    }

    function initRows() {
        var disposables = [];

        var rows = {};
        this.rows = rows;
        this['rows'] = rows;

        rows.displayed = ko.observableArray([]);
        rows['displayed'] = rows.displayed;

        rows.displayedSynchronized = ko.observable(false).extend({notify: 'always'});
        rows['displayedSynchronized'] = rows.displayedSynchronized;
        rows['__handleDisplayedRowsDeviate'] = () => { this.rows.displayedSynchronized(false); };
        rows['__handleDisplayedRowsSynchronized'] = () => { this.rows.displayedSynchronized(true); };

        var view = this.view;
        rows['__dirty'] = view.dirty;

        disposables.push(view.observables.subscribe(v => { rows.displayed(v); }));
        rows.displayed(view.observables());

        var classifiers = [];
        rows['__classify'] = row => {
            var classes = classifiers.map(c => c(row));
            return Array.prototype.concat.apply([], classes);
        };
        rows.installClassifier = classifier => { classifiers.push(classifier); };
        rows['installClassifier'] = rows.installClassifier;

        return () => {
            disposables.forEach(disposable => {
                disposable.dispose();
            });
        };
    }

    function initEventDispatching() {
        var dispatchVia = dispatcher => {
            return event => {
                dispatcher.relativeToClosest('.ko-grid-cell').dispatch(event);
                return !event.defaultPrevented;
            };
        };

        var argumentsSupplier = (event, cellElement) => {
            var context = ko.contextFor(cellElement);
            var row = context['row']();
            var column = context['column']();
            var cell = row[column.property];

            return [event, cell, row, column];
        };

        var onMouseDownDispatcher = new ApplicationEventDispatcher(argumentsSupplier);
        var onClickDispatcher = new ApplicationEventDispatcher(argumentsSupplier);
        var onDoubleClickDispatcher = new ApplicationEventDispatcher(argumentsSupplier);
        var onContextMenuDispatcher = new ApplicationEventDispatcher(argumentsSupplier);
        this.onCellMouseDown = onMouseDownDispatcher.registerHandler.bind(onMouseDownDispatcher);
        this.onCellClick = onClickDispatcher.registerHandler.bind(onClickDispatcher);
        this.onCellDoubleClick = onDoubleClickDispatcher.registerHandler.bind(onDoubleClickDispatcher);
        this.onCellContextMenu = onContextMenuDispatcher.registerHandler.bind(onContextMenuDispatcher);
        this['onCellMouseDown'] = this.onCellMouseDown;
        this['onCellClick'] = this.onCellClick;
        this['onCellDoubleClick'] = this.onCellDoubleClick;
        this['onCellContextMenu'] = this.onCellContextMenu;

        this.__postApplyBindings(inner => {
            inner();
            this.__tbodyElement.addEventListener('mousedown', dispatchVia(onMouseDownDispatcher));
            this.__tbodyElement.addEventListener('click', dispatchVia(onClickDispatcher));
            this.__tbodyElement.addEventListener('dblclick', dispatchVia(onDoubleClickDispatcher));
            this.__tbodyElement.addEventListener('contextmenu', dispatchVia(onContextMenuDispatcher));
        });

        return () => {};
    }

    function initElementLookup(grid) {
        var nthRowElement = n => {
            var node = this.__tbodyElement.querySelector('tr.ko-grid-row:nth-child(' + (n + 1) + ')');
            if (!node)
                throw new Error('Row `' + n + '` does not exist.');
            return node;
        };

        var nthCellOfRow = (row, n) => {
            var node = row.children[n];
            if (!node)
                throw new Error('Column `' + n + '` does not exist.');
            return node;
        };

        var hijackCount = 0;
        var hijacks = {};

        this.rows['__handleElementRecycling'] = (element, bindingContext) => {
            withHijacksOfRowCells(bindingContext, element, (hijack, cell, row, column) => {
                hijack.suspend();
                initCellElement(cell, row, column);
            });
        };
        this.rows['__handleElementRecycled'] = (element, bindingContext) => {
            withHijacksOfRowCells(bindingContext, element, (hijack, cell, row, column) => {
                hijack.resume(row, cell);
                initCellElement(cell, row, column);
                // TODO This update might have dependencies that won't get tracked.. (same below)
                updateCellElement(cell, row, column);
            });
        };

        function withHijacksOfRowCells(bindingContext, rowElement, action) {
            var row = bindingContext['row']();

            withHijacksOfRow(row, hijack => {
                var column = hijack.column;
                var columnIndex = grid.columns.displayed().indexOf(column);
                var cell = rowElement.children[columnIndex];

                action(hijack, cell, row, column);
            });
        }

        var withHijacksOfRow = (row, action) => {
            if (!hijackCount)
                return;

            var rowId = this.observableValueSelector(ko.unwrap(row[grid.primaryKey]));

            if (js.objects.hasOwn(hijacks, rowId))
                hijacks[rowId].forEach(action);
        };

        this.__withHijackOfCell = (bindingContext, action) => {
            var row = bindingContext['row']();
            var column = bindingContext['column']();
            withHijacksOfRow(row, (hijack) => {
                if (hijack.column === column)
                    action(hijack);
            });
        };

        this.lookupCell = (row, column) => {
            var rowId = this.observableValueSelector(ko.unwrap(row[grid.primaryKey]));
            // TODO The closure compiler will transform a plain tryFirstIndexOf call. Why?
            var rowIndex = this.rows.displayed()['tryFirstIndexOf'](row);
            var columnIndex = grid.columns.displayed().indexOf(column);

            var element = nthCellOfRow(nthRowElement(rowIndex), columnIndex);

            function hijackCell(override) {
                if (element[HIJACKED_KEY])
                    throw new Error('Illegal state: This cell is already hijacked.');

                var binding = column._overrideValueBinding(override, {
                    init: column._initCell || defaultInit,
                    update: column._updateCell || defaultUpdate
                });

                var hijack = element[HIJACKED_KEY] = new Hijack(element, row, column, binding);

                var rowHijacks = hijacks[rowId] = hijacks[rowId] || [];
                rowHijacks.push(hijack);
                ++hijackCount;

                initCellElement(element, row, column);
                updateCellElement(element, row, column);

                function release() {
                    if (rowHijacks.length === 1)
                        delete hijacks[rowId];
                    else
                        rowHijacks.splice(rowHijacks.indexOf(hijack), 1);
                    --hijackCount;

                    if (!hijack.suspended) {
                        var e = hijack.element,
                            r = hijack.row,
                            c = hijack.column;
                        hijack.suspend();
                        initCellElement(e, r, c);
                        // TODO This update might have dependencies that won't get tracked.. (same above)
                        updateCellElement(e, r, c);
                    }
                }

                return js.objects.extend({
                    release: release,
                    dispose: release
                }, {
                    'dispose': release,
                    'release': release
                });
            }

            return js.objects.extend({
                element: element,
                hijack: hijackCell
            }, {
                'element': element,
                'hijack': hijackCell
            });
        };
        this['lookupCell'] = this.lookupCell;

        return () => {};
    }

    /** @constructor */
    function Hijack(element, row, column, binding) {
        this.element = element;
        this.row = row;
        this.column = column;
        this.init = binding.init;
        this.update = binding.update;
    }

    Hijack.prototype = {
        get suspended() {
            return this.element === null;
        },

        resume: function (row, element) {
            this.element = element;
            this.row = row;
            element[HIJACKED_KEY] = this;
        },
        suspend: function () {
            this.element[HIJACKED_KEY] = null;
            this.element = null;
        }
    };

    ko.bindingHandlers['__gridRow'] = {
        'init': () => {},
        'update': (element, valueAccessor) => {
            var value = valueAccessor();
            var classify = value['classify'];
            var row = value['row']();
            var index = value['index']();

            var coreClasses = index % 2 === 1 ? ['ko-grid-tr', 'ko-grid-row', 'alternate'] : ['ko-grid-tr', 'ko-grid-row'];
            var additionalClasses = classify(row);
            var distinctClasses = coreClasses.concat(additionalClasses);
            element.className = distinctClasses.join(' ');
        }
    };

    ko.bindingHandlers['__gridCell'] = {
        'init': (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) => {
            var value = valueAccessor(),
                row = value['row'],
                column = value['column'];

            bindingContext['grid'].data.__withHijackOfCell(bindingContext, hijack => hijack.resume(row(), element));

            initCellElement(element, row, column());

            return {
                'controlsDescendantBindings': true
            };
        },
        'update': (element, valueAccessor) => {
            var value = valueAccessor();
            var row = value['row']();
            var column = value['column'].peek(); // can't change anyways => peek to keep dependency count low
            updateCellElement(element, row, column);
        }
    };

    function initCellElement(element, row, column) {
        var hijacked = element[HIJACKED_KEY];

        while (element.firstChild)
            ko.removeNode(element.firstChild);

        var init = hijacked && hijacked.init || column._initCell || defaultInit;
        init(element, row, column);
    }

    function updateCellElement(element, row, column) {
        var cell = row[column.property];

        var hijacked = element[HIJACKED_KEY];

        // TODO since there may be thousands of cells we want to keep the dependency count at two (row+cell) => peek => need separate change handler for cellClasses
        // TODO should setting the className be moved to init?
        var columnClasses = column.cellClasses.peek().join(' ');
        element.className = 'ko-grid-td ko-grid-cell ' + columnClasses;

        var update = hijacked && hijacked.update || column._updateCell || defaultUpdate;
        update(element, cell, row, column);
    }

    function defaultInit(element) {
        element.insertBefore(document.createTextNode(''), element.firstChild);
    }

    function defaultUpdate(element, cell, row, column) {
        var child = element.firstChild;
        while (child.nodeType !== TEXT_NODE)
            child = child.nextSibling;
        child.nodeValue = column.renderValue(ko.unwrap(cell));
    }

    return data;
});
