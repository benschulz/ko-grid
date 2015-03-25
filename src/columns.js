'use strict';

define(['knockout', 'onefold-js', 'text!ko-grid/columns.html.template'], function (ko, js, columnsTemplate) {
    var TO_STRING_VALUE_RENDERER = cellValue => cellValue === null ? '' : '' + cellValue;

    var columns = {
        init: function (template) {
            template.replace('columns').with(columnsTemplate);
        },
        Constructor: function (bindingValue, gridConfig, grid) {
            function createColumn(columnSpec) {
                var column = new Column(grid, gridConfig, columnSpec);
                if (gridConfig['columnInitializer'])
                    gridConfig['columnInitializer'](column);
                return column;
            }

            var disposables = [];

            this.all = ko.observableArray(bindingValue['columns'].map(createColumn));
            this['all'] = this.all;

            this.byId = id => {
                var column = this.tryById(id);
                if (!column)
                    throw new Error('The column id `' + id + '` is already taken.');
                return column;
            };
            this['byId'] = this.byId;

            this.tryById = id => {
                var candidates = this.all().filter(c => c.id === id);
                if (candidates.length > 1)
                    throw new Error('Assertion error: Multiple columns with id `' + id + '`.');
                return candidates[0];
            };
            this['tryById'] = this.tryById;

            var displayedColumns = ko.observable(this.all().filter(c => c.__visible));
            this.displayed = () => displayedColumns();
            this['displayed'] = this.displayed;

            this.show = column => { this.showOnlyThoseWhich(c => c.__visible || c === column); };
            this.hide = column => { this.showOnlyThoseWhich(c => c.__visible && c !== column); };
            this['show'] = this.show;
            this['hide'] = this.hide;

            this.reorder = columns => {
                var source = this.all().slice();
                var destination = [];

                columns.forEach(column => {
                    var index = source.indexOf(column);
                    source.splice(index, 1);
                    destination.push(column);
                });
                if (source.length)
                    throw new Error('The new column order must contain all columns.');

                this.all(destination);
                this.showOnlyThoseWhich(c => c.__visible);
            };
            this['reorder'] = this.reorder;

            this.showOnlyThoseWhich = predicate => {
                var allColumns = this.all();
                var columnsToBeDisplayed = allColumns.filter(predicate);

                allColumns.forEach(c => { c.__visible = false; });
                columnsToBeDisplayed.forEach(c => { c.__visible = true; });

                displayedColumns(columnsToBeDisplayed);
            };
            this['showOnlyThoseWhich'] = this.showOnlyThoseWhich;

            this._combinedWidthInPixels = ko.computed(() => {
                var sum = 0;
                var displayed = this.displayed();
                for (var i = 0; i < displayed.length; ++i)
                    sum += displayed[i].widthInPixels();
                return sum;
            });
            this['_combinedWidthInPixels'] = this._combinedWidthInPixels;
            disposables.push(this._combinedWidthInPixels);

            this.add = column => {
                var viewModel = createColumn({
                    userDefined: false,
                    'id': '$' + column.id,
                    'label': column.label,
                    'hidden': column.hidden || false,
                    'width': column.width
                });

                this.all.unshift(viewModel);
                this.showOnlyThoseWhich(c => c.__visible);

                return viewModel;
            };
            this['add'] = this.add;

            this._dispose = () => {
                disposables.forEach(disposable => { disposable.dispose(); });
            };
        }
    };

    ko.bindingHandlers['__gridColumn'] = {
        'init': js.functions.nop,
        'update': function (element, valueAccessor) {
            var column = valueAccessor();

            element.style.width = column.width();
        }
    };

    function Column(grid, gridConfig, column) {
        this.id = column['id'];
        this['id'] = this.id;
        this.property = column['property'] || this.id;
        this['property'] = this.property;
        this.userDefined = column.userDefined !== false;
        this['userDefined'] = this.userDefined;
        this.__visible = !column['hidden'];
        this.visible = () => this.__visible;
        this['visible'] = this['visible'];
        this.label = ko.observable(column['label']);
        this['label'] = this.label;
        this.width = ko.observable(column['width']);
        this['width'] = this.width;
        this.widthInPixels = () => {
            var w = this.width();
            if (w.substr(-2) !== 'px') throw new Error('The only currently supported column width values are absolute pixel lengths.');
            return parseInt(w.substring(0, w.length - 2), 10);
        };
        this['widthInPixels'] = this.widthInPixels;
        this.headerClasses = ko.observableArray(column['headerClasses'] || column['classes'] || []);
        this.cellClasses = ko.observableArray(column['cellClasses'] || column['classes'] || []);
        this.footerClasses = ko.observableArray(column['footerClasses'] || column['classes'] || []);
        this['headerClasses'] = this.headerClasses;
        this['cellClasses'] = this.cellClasses;
        this['footerClasses'] = this.footerClasses;

        this.metadata = gridConfig['columnMetadataProvider'] ? gridConfig['columnMetadataProvider'](grid, column) : {};
        this['metadata'] = this.metadata;

        this.renderValue = gridConfig['cellValueRenderer'] ? gridConfig['cellValueRenderer'].bind(undefined, this) : TO_STRING_VALUE_RENDERER;
        this['renderValue'] = this.renderValue;

        this.overrideValueRendering = override => { this.renderValue = override(this.renderValue); };
        this.overrideValueBinding = override => {
            var overridden = override({init: this._initCell, update: this._updateCell});
            if (!overridden || !overridden.init || !overridden.update)
                throw new Error('The cell value binding must define an `init` as well as an `update` method.');

            this._initCell = overridden.init;
            this._updateCell = overridden.update;
        };
        this['overrideValueRendering'] = this.overrideValueRendering;
        this['overrideValueBinding'] = this.overrideValueBinding;
    }

    return columns;
});
