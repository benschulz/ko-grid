'use strict';

define([
    'knockout', 'onefold-js', 'stringifyable', './application-event-dispatcher', 'text!ko-grid/data.html.template'
], function (ko, js, stringifyable, ApplicationEventDispatcher, dataTemplate) {
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
        this['onCellMouseDown '] = this.onCellMouseDown;
        this['onCellClick '] = this.onCellClick;
        this['onCellDoubleClick '] = this.onCellDoubleClick;
        this['onCellContextMenu '] = this.onCellContextMenu;

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
            var node = this.__tbodyElement.firstChild;
            var i = -1;
            while (node) {
                if (node.nodeType === ELEMENT_NODE && node.tagName === 'TR' && (' ' + node.className + ' ').indexOf('ko-grid-row') >= 0)
                    if (++i === n) return node;
                node = node.nextSibling;
            }
            throw new Error('Row `' + n + '` does not exist.');
        };

        var nthCellOfRow = (row, n) => {
            var node = row.firstChild;
            var i = -1;
            while (node) {
                if (node.nodeType === ELEMENT_NODE && node.tagName === 'TD' && (' ' + node.className + ' ').indexOf('td') >= 0)
                    if (++i === n) return node;
                node = node.nextSibling;
            }
            throw new Error('Column `' + n + '` does not exist.');
        };

        var hijacks = [];

        this.rows['__handleElementRecycling'] = element => {
            Array.prototype.slice.call(element.querySelectorAll('.ko-grid-cell')).forEach(c => c[HIJACKED_KEY] = null);
        };
        this.rows['__handleElementRecycled'] = (element, bindingContext) => {
            var row = bindingContext['row']();
            var rowId = this.observableValueSelector(ko.unwrap(row[grid.primaryKey]));

            if (js.objects.hasOwn(hijacks, rowId)) {
                hijacks[rowId].forEach(h => {
                    var column = h.column;
                    var columnIndex = grid.columns.displayed().indexOf(column);
                    var cell = element.children[columnIndex];

                    h.element = cell;
                    cell[HIJACKED_KEY] = h;
                    if (h.init)
                        initCellElement(cell, row, column);
                    updateCellElement(cell, row, column);

                });
            }
        };

        this.lookupCell = (row, column) => {
            var rowId = this.observableValueSelector(ko.unwrap(row[grid.primaryKey]));
            var rowIndex = this.rows.displayed().tryFirstIndexOf(row);
            var columnIndex = grid.columns.displayed().indexOf(column);

            var element = nthCellOfRow(nthRowElement(rowIndex), columnIndex);

            function hijack(classes, override) {
                if (element[HIJACKED_KEY])
                    throw new Error('Illegal state: This cell is already hijacked.');

                var binding = column._overrideValueBinding(override || (b => b));
                var hijacked = element[HIJACKED_KEY] = {
                    element: element,
                    column: column,
                    classes: classes,
                    init: binding.init,
                    update: binding.update
                };

                var rowHijacks = hijacks[rowId] = hijacks[rowId] || [];
                rowHijacks.push(hijacked);

                if (hijacked.init)
                    initCellElement(element, row, column);
                updateCellElement(element, row, column);

                function release() {
                    if (rowHijacks.length === 1)
                        delete hijacks[rowId];
                    else
                        rowHijacks.splice(rowHijacks.indexOf(hijacked), 1);

                    if (hijacked.element[HIJACKED_KEY] !== hijacked)
                        return; // the element was recycled for another entry

                    hijacked.element[HIJACKED_KEY] = null;
                    initCellElement(hijacked.element, row, column);
                    updateCellElement(hijacked.element, row, column);
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
                hijack: hijack
            }, {
                'element': element,
                'hijack': hijack
            });
        };
        this['lookupCell'] = this.lookupCell;

        return () => {};
    }

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
        'init': (element, valueAccessor) => {
            var value = valueAccessor();

            initCellElement(element, value['row'], value['column']());

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

        if (hijacked && hijacked.init)
            hijacked.init(element, row, column);
        if (column._initCell)
            column._initCell(element, row, column);
        else
            element.appendChild(document.createTextNode(''));
    }

    function updateCellElement(element, row, column) {
        var cell = row[column.property];
        var cellValue = cell && ko.unwrap(cell);

        var hijacked = element[HIJACKED_KEY];

        // TODO since there may be thousands of cells we want to keep the dependency count at two (row+cell) => peek => need separate change handler for cellClasses
        var columnClasses = column.cellClasses.peek().join(' ');
        element.className = 'ko-grid-td ko-grid-cell ' + columnClasses + (hijacked ? ' ' + hijacked.classes : '');

        if (hijacked && hijacked.update)
            hijacked.update(element, cell, row, column);
        if (column._initCell)
            column._updateCell(element, cell, row, column);
        else
            element.lastChild.nodeValue = column.renderValue(cellValue);
    }

    return data;
});
