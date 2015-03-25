'use strict';

define(['knockout', 'onefold-js', './application-event-dispatcher', 'text!ko-grid/headers.html.template'], function (ko, js, ApplicationEventDispatcher, headersTemplate) {
    var document = window.document,
        Node = window.Node;

    function columnHeaderId(column) {
        return 'column-header-' + column.id;
    }

    var fallbackIdCounter = 0;

    function columnGroupHeaderId(columnGroup) {
        var id = columnGroup.id || '@__' + (++fallbackIdCounter);
        return 'column-group-header-' + id;
    }

    var headers = {
        init: template => {
            template.replace('head').with('headers', headersTemplate);
        },
        Constructor: (bindingValue, config, grid) => {
            var invertedColumnGroups = invertColumnGroups(bindingValue['columnGroups'] || []);

            var columnGroupHeaders = {};
            var columnHeaders = {};

            var rows = [];
            this.__rows = ko.computed(() => {
                var displayedColumns = grid.columns.displayed();
                var maxDepth = 0;

                displayedColumns.forEach(column => {
                    var group = invertedColumnGroups[column.id];
                    maxDepth = Math.max(maxDepth, group ? group.depth + group.overallHeight : 0);
                });

                rows.length = maxDepth + 1;
                for (var i = 0; i < rows.length; ++i) {
                    rows[i] = rows[i] || ko.observableArray();
                    rows[i]['__rowId'] = 'header-row-' + i;
                    rows[i].valueWillMutate();
                    rows[i]().length = 0;
                }

                var open = [];
                displayedColumns.forEach(column => {
                    var group = invertedColumnGroups[column.id];
                    var depth = group ? group.depth + group.height : 0;

                    open.length = depth;
                    var header = reuseExisting(columnHeaders, new ColumnHeader(column));
                    header.__reset(maxDepth - depth + 1);
                    rows[depth]().push(header);

                    var newColumnGroupHeaders = increaseColumnSpanOfOpenOrOpenNewColumnGroupHeaders(group, open, column);
                    for (var j = 0; j < newColumnGroupHeaders.length; ++j) {
                        if (newColumnGroupHeaders[j]) rows[j]().push(newColumnGroupHeaders[j]);
                    }
                });

                rows.forEach(row => { row.valueHasMutated(); });

                return rows;
            });
            this['__rows'] = this.__rows;

            this.all = ko.computed(() => {
                var result = [];
                this.__rows().forEach(row => {
                    Array.prototype.push.apply(result, row());
                });
                return result;
            });
            this['all'] = this.all;

            this.forColumn = column => {
                var id = columnHeaderId(column);
                if (!Object.prototype.hasOwnProperty.call(columnHeaders, id))
                    throw new Error('Es existiert kein Header für die gegebene Spalte.');
                return columnHeaders[id];
            };
            this['forColumn'] = this.forColumn;

            var onClickDispatcher = new ApplicationEventDispatcher((event, headerElement) => [event, ko.contextFor(headerElement)['header']()]);
            this['__handleClick'] = (_, event) => {
                onClickDispatcher.relativeToClosest('.ko-grid-column-header, .ko-grid-column-group-header').dispatch(event);
                return !event.defaultPrevented;
            };
            this.onHeaderClick = onClickDispatcher.registerHandler.bind(onClickDispatcher);
            this.onColumnHeaderClick = function (selectorOrHandler, handler) {
                var selectorSpecified = arguments.length > 1;
                handler = selectorSpecified ? handler : selectorOrHandler;
                var wrappedHandler = function (event, header) {
                    if (header instanceof ColumnHeader)
                        handler.apply(this, arguments);
                };
                onClickDispatcher.registerHandler.apply(onClickDispatcher, selectorSpecified ? [selectorOrHandler, wrappedHandler] : [wrappedHandler]);
            };
            this['onHeaderClick'] = this.onHeaderClick;
            this['onColumnHeaderClick'] = this.onColumnHeaderClick;

            this._dispose = () => {
                this.__rows.dispose();
                this.all.dispose();
            };

            function increaseColumnSpanOfOpenOrOpenNewColumnGroupHeaders(group, open, column) {
                if (!group)
                    return [];
                if (open[group.depth] && open[group.depth]._columnGroup === group)
                    return increaseColumnSpanOfOpenColumnGroupHeaders(group, open, column);

                open.length = group.depth;
                var result = increaseColumnSpanOfOpenOrOpenNewColumnGroupHeaders(group.containingGroup, open, column);
                result[group.depth] = open[group.depth] = openNewColumnGroupHeader(group, column);
                return result;
            }

            function increaseColumnSpanOfOpenColumnGroupHeaders(group, open, column) {
                var containingGroup = group;
                do {
                    var g = open[containingGroup.depth];
                    g.columns.push(column);
                    g.columnSpan(g.columnSpan() + 1);
                    containingGroup = containingGroup.containingGroup;
                } while (containingGroup);
                return [];
            }

            function openNewColumnGroupHeader(group, column) {
                var columnGroupHeader = reuseExisting(columnGroupHeaders, new ColumnGroupHeader(group));
                columnGroupHeader.__reset(column);
                return columnGroupHeader;
            }

            function reuseExisting(pool, newInstance) {
                var id = newInstance.id;
                var pooledInstance = pool[id] = pool[id] || newInstance;
                return pooledInstance;
            }
        }
    };

    /** @constructor */
    function ColumnHeader(column) {
        this.id = columnHeaderId(column);
        this['id'] = this.id;
        this.element = ko.observable(null);
        this['element'] = this.element;
        this.rowSpan = ko.observable(1);
        this['rowSpan'] = this.rowSpan;
        this.columnSpan = ko.observable(1);
        this['columnSpan'] = this.columnSpan;
        this.label = column.label;
        this['label'] = this.label;
        this.column = column;
        this['column'] = this.column;
        this.columns = [column];
        this['columns'] = this.columns;

        this.__reset = rowSpan => {
            this.rowSpan(rowSpan);
        };
    }

    /** @constructor */
    function ColumnGroupHeader(columnGroup) {
        this.id = columnGroupHeaderId(columnGroup);
        this['id'] = this.id;
        this.element = ko.observable(null);
        this['element'] = this.element;
        this._columnGroup = columnGroup;
        this.rowSpan = ko.observable(columnGroup.height);
        this['rowSpan'] = this.rowSpan;
        this.columnSpan = ko.observable(1);
        this['columnSpan'] = this.columnSpan;
        this.label = ko.observable(columnGroup.label);
        this['label'] = this.label;
        this.columns = [];
        this['columns'] = this.columns;

        this.__reset = column => {
            this.columns = [column];
            this.columnSpan(1);
        };
    }

    function invertColumnGroups(columnGroups) {
        var result = {};

        function addTableEntries(invertedColumnGroup) {
            invertedColumnGroup.columnIds.forEach(id => {
                var columnGroup = result[id];
                if (!columnGroup)
                    result[id] = invertedColumnGroup;
                else if (columnGroup !== invertedColumnGroup)
                    throw new Error('Column `' + id + '` is element of column group `' + columnGroup.label + '` as well as `' + invertedColumnGroup.label + '`.');
            });

            if (invertedColumnGroup.containingGroup)
                addTableEntries(invertedColumnGroup.containingGroup);
        }

        js.arrays
            .flatMap(columnGroups, invertColumnGroup.bind(this, null))
            .forEach(g => { addTableEntries(g); });

        return result;
    }

    function invertColumnGroup(containingGroup, columnGroup) {
        var overallHeight = calculateOverallColumnGroupHeight(columnGroup);
        var subgroups = columnGroup.elements.filter(g => typeof g !== 'string');
        var columnIds = columnGroup.elements.filter(g => typeof g === 'string');

        var inverted = {
            id: columnGroup.id,
            label: columnGroup.label,
            containingGroup: containingGroup,
            depth: containingGroup ? containingGroup.depth + 1 : 0,
            height: containingGroup ? containingGroup.overallHeight - overallHeight : 1,
            overallHeight: overallHeight,
            columnIds: columnIds
        };

        return subgroups.length
            ? js.arrays.flatMap(subgroups, invertColumnGroup.bind(this, inverted))
            : inverted;
    }

    function calculateOverallColumnGroupHeight(columnGroup) {
        var subgroups = columnGroup.elements.filter(g => typeof g !== 'string');
        return 1 + Math.max.apply(Math, [0].concat(subgroups.map(calculateOverallColumnGroupHeight)));
    }

    ko.bindingHandlers['__gridHeader'] = {
        'init': (element, valueAccessor) => {
            var header = valueAccessor()();

            header.element(element);
            ko.utils.domNodeDisposal.addDisposeCallback(element, () => { header.element(null); });

            var child = element.firstChild;
            while (child) {
                var c = child;
                if (c.nodeType === Node.TEXT_NODE)
                    ko.removeNode(c);
                child = child.nextSibling;
            }
            element.insertBefore(document.createTextNode(''), element.firstChild);

            return {'controlsDescendantBindings': true};
        },
        'update': (element, valueAccessor) => {
            var header = valueAccessor()();

            var id = header.id.replace(/[\s]/g, '_');
            if (header.column) {
                element.className = 'ko-grid-th ko-grid-column-header ' + id + ' ' + header.column.headerClasses().join(' ');
            } else {
                element.className = 'ko-grid-th ko-grid-column-group-header ' + id;
            }

            var width = header.columns.map(c => c.widthInPixels()).reduce((a, b) => a + b) + 'px';
            element.style.width = width;
            element.style.maxWidth = width;
            element.rowSpan = header.rowSpan();
            element.colSpan = header.columnSpan();

            var child = element.firstChild;
            while (child.nodeType !== Node.TEXT_NODE)
                child = child.nextSibling;
            child.nodeValue = header.label();
        }
    };

    return headers;
});
