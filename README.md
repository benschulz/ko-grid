# ko-grid [![Build Status](https://travis-ci.org/benschulz/ko-grid.svg?branch=master)](https://travis-ci.org/benschulz/ko-grid) [![Coverage Status](https://coveralls.io/repos/benschulz/ko-grid/badge.svg?branch=master)](https://coveralls.io/r/benschulz/ko-grid?branch=master)

The ko-grid is an extensible UI component for displaying tabular data. It is [knockout](http://knockoutjs.com/)-based and its binding name is simply `grid`.

If you want to look at ko-grid in action, you can look at some [live examples](http://benschulz.github.io/ko-grid-examples/). The corresponding sources are in a [separate repository](https://github.com/benschulz/ko-grid-examples). To get started, have a look at [src/sscces](https://github.com/benschulz/ko-grid-examples/tree/master/src/sscces) for short, self-contained examples.

## Features

### Core

The ko-grid component itself is only a base to be built upon. As such it provides few features on its own.

 - column groups
 - flexible sizing

### Extensions

 - [**aggregate**](https://github.com/benschulz/ko-grid-aggregate). Display aggregate information in the grid's footer.
 - [**cell-navigation**](https://github.com/benschulz/ko-grid-cell-navigation). Navigate the grid using arrow keys, enter and tab.
 - [**column-resizing**](https://github.com/benschulz/ko-grid-column-resizing). Let the user resize columns by dragging its right border.
 - [**column-scaling**](https://github.com/benschulz/ko-grid-column-scaling). Have the column widths scale to fit the grid width when extra space is available.
 - [**column-width-persistence**](https://github.com/benschulz/ko-grid-column-width-persistence). Users' column width adjustments are remembered.
 - [**editing**](https://github.com/benschulz/ko-grid-editing). Edit cell values Excel-style.
 - [**export**](https://github.com/benschulz/ko-grid-export). Offer an export of the grid's data as an excel sheet.
 - [**filtering**](https://github.com/benschulz/ko-grid-filtering). Let users filter rows based on per-column criteria.
 - [**full-screen**](https://github.com/benschulz/ko-grid-full-screen). Offer a full screen mode to let users take advantage of space usually occupied by other components.
 - [**height-adjuster**](https://github.com/benschulz/ko-grid-height-adjuster). Let users resize the grid vertically.
 - [**links**](https://github.com/benschulz/ko-grid-links). Have cells in a column link to other pages.
 - [**paging**](https://github.com/benschulz/ko-grid-paging). Divide rows into pages.
 - [**selection**](https://github.com/benschulz/ko-grid-selection). Single- or multi-selection of rows.
 - [**sorting**](https://github.com/benschulz/ko-grid-sorting). Let users sort rows by column.
 - [**virtualization**](https://github.com/benschulz/ko-grid-virtualization). Reduce traffic and improve performance with row virtualization.

#### Other Extensions

The following extensions don't provide user-oriented features directly, but rather through other extensions listed above.

 - [**column-sizing**](https://github.com/benschulz/ko-grid-column-sizing). Defines which columns are resizable and which aren't.
 - [**resize-detection**](https://github.com/benschulz/ko-grid-resize-detection). Detects when the grids container was resized and triggers a relayout.
 - [**toolbar**](https://github.com/benschulz/ko-grid-toolbar). Displays a grid toolbar to be filled by other extensions.
 - [**view-modes**](https://github.com/benschulz/ko-grid-view-modes). Keeps track of the view mode(s) the grid is currently in (e.g. full-screen mode).
 - [**view-state-storage**](https://github.com/benschulz/ko-grid-view-state-storage). Persists view state information in (by default) the `localStorage` to be restored later.

## Requirements

**Libraries**. There are no library dependencies other than knockout. (jQuery is *not* required.)

**Bindings**. The ko-grid depends on another binding, called [`indexedRepeat`](https://github.com/benschulz/ko-grid). It is included in the [ko-grid-bundle](https://github.com/benschulz/ko-grid-bundle), if you chose to use that.

**Browser**. The ko-grid component is targeted at evergreen browsers. That means any up-to-date Firefox, Chromium or Safari is supported. Internet Explorer 11 is supported as well, for Internet Explorer 10 you need to provide a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) polyfill.

## Configuration

### Binding Value

#### config

**Required**. The name of the grid configuration to use.

If you are using RequireJS, this is the name of the AMD module to load as the config. If you aren't using RequireJS, the config must be accessible as `window.ko.bindingHandlers.grid.config[configName]`, where `configName` is defined by this option.

#### dataSource

**Required**. A [DataSource](http://benschulz.github.io/ko-data-source/de.benshu.ko.dataSource.DataSource.html) of the data to be displayed.

Please refer to the [ko-data-source](https://github.com/benschulz/ko-data-source) documentation for pointers on how to construct a data source. 

#### primaryKey

**Required**. The name of a property which uniquely identifies entries, commonly `'id'`.

Please note that entry ids *must* be strings as they are used as keys in object hashes.

#### columns

**Required**. An array of column definitions.

```javascript
columns: [{
    // Required.
    id: 'sampleColumnId',

    // Optional. Defaults to same value as id.
    property: 'propertyNameOrEntries',

    // Optional. Defaults to false.
    hidden: false,

    // Required. The text to display in the column header.
    label: 'Sample Column',

    // Required. Currently only pixel values are supported.
    width: '100px',

    // Optional. Classes to add to the column header, data and footer cells.
    classes: ['frob'],

    // Optional. Classes to add to the column header. Overrides classes property.
    headerClasses: ['foo'],

    // Optional. Classes to add to data cells in this column. Overrides classes property.
    cellClasses: ['bar'],

    // Optional. Classes to add to footer cells in this column. Overrides classes property.
    footerClasses: ['baz'],
}, …]
```

#### columnGroups

**Optional**. An array of column group definitions. Nested column groups (column groups of column groups) are supported.

A column group definition:
```javascript
columnGroups: [{
    // Optional. An id is generated for internal use if none is specified.
    id: 'sampleColumnId',

    // Required. The text to display in the column group header.
    label: 'Sample Column',

    // Required. The columns and/or column groups this column group contains.
    elements: [
        'some-column-id',
        { /* another column group here (id, label, elements) */ },
        'some-other-column-id'
    ]
}, …]
```

#### extensions

**Optional**. Extension configuration.

Usually extensions are customized via the config, rather than the binding value. However, grid specific customization can't be made in config that is potentially shared with other grids. Such configuration is placed here.

### Config

With the exception of `extensions` and the `cellValueRenderer`, most options described here can be omitted for most use cases.

#### extensions

This objects serves two purposes. For one, it defines the set of extensions to load for grids using this configuration. Beyond that it can be used to configure the listed extensions.

```javascript
extensions: {
    // The sorting extension will be loaded for grids using this config.
    sorting: {},
    // The links extension will be loaded, but disabled for all grids
    // except those which explicitly enable it via the binding value.
    links: { enabled: false }
    // The filtering extension will throttle reevaluation triggered by
    // user input by one second (1000ms).
    filtering: { throttle: { by: 1000 } }
}
```

#### cellValueRenderer

**Optional**. A function which renders cell values. It takes two arguments, the first is the column, the second is the cell value to be rendered.

#### columnMetadataSupplier

**Optional**. A function which, given a grids binding value and a column definition, produces some form of metadata. This metadata will be stored and accessible as `column.metadata` throughout the lifetime of the grid.

#### valueSelector

**Optional**. Defaults to identity (`v => v`).

If entries' properties contain metadata alongside each value, it is necessary for the grid to get at the value only (e.g. for sorting). This function extracts the value from the value-plus-metadata-property.

```javascript
// For a grid of displaying users shaped like this…
{
    id: { readOnly: true, value: 'alice' },
    email: { readOnly: false, value: 'alice@example.org' }
    // ...
};
// … the valueSelector would look like this.
function valueSelector(property) {
	return propertyValue;
}
```

#### observableValueSelector

**Optional**. Defaults to identity (`v => v`).

Same concept as `observableValueSelector`, but for observable entries. For an explanation of the distinction between an observable and a non-observable, please refer to the [ko-data-source](https://github.com/benschulz/ko-data-source) documentation.


## Example-Binding

```html
<h2>Example: Countries and dependencies by population</h2>

<div data-bind="grid: {
    config: 'some-configuration',
    dataSource: countriesByPopulationDataSource,
    primaryKey: 'id',
    columns: [
        { id: 'rank', width: '50px', label: 'Rank', classes: ['numeric'] },
        { id: 'country', width: '400px', label: 'Country (or dependent territory)' },
        { id: 'population', width: '150px', label: 'Population', classes: ['numeric'] },
        { id: 'percentage', width: '120px', label: '% of world population', classes: ['numeric'] },
        { id: 'date', width: '150px', label: 'Date' }
    ],
    columnGroups: [{ label: 'Census', elements: [ 'population', 'percentage' ] }],
    extensions: {
        sorting: { initiallyBy: 'rank' }
    }
}">
</div>
```
