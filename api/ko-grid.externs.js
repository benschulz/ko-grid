/** @namespace */
var koGrid = {};

/**
 * @param {!string} alias
 * @param {!string} alreadyKnownAlias
 */
koGrid.declareExtensionAlias = function (alias, alreadyKnownAlias) {};

/**
 * @param {!Array<string>} aliases
 * @param {!string} alreadyKnownAlias
 */
koGrid.declareExtensionAliases = function (aliases, alreadyKnownAlias) {};

/**
 * @param {!string} name
 * @param {!Object} spec
 */
koGrid.defineExtension = function (name, spec) {};

/** @namespace */
koGrid.extensions = {};

/**
 * @constructor
 * @template I, V, O
 */
koGrid.Grid = function () {};

/**
 * @type {!Element}
 */
koGrid.Grid.prototype.rootElement;

/**
 * @type {?Element}
 */
koGrid.Grid.prototype.element;

/**
 * @param {function()} callback
 */
koGrid.Grid.prototype.postApplyBindings = function (callback) {};

/**
 * @type {koGrid.Columns<I, V, O>}
 */
koGrid.Grid.prototype.columns;

/**
 * @type {koGrid.Headers<I, V, O>}
 */
koGrid.Grid.prototype.headers;

/**
 * @type {koGrid.Data<I, V, O>}
 */
koGrid.Grid.prototype.data;

/**
 * @type {koGrid.Layout}
 */
koGrid.Grid.prototype.layout;

/**
 * @type {Object}
 */
koGrid.Grid.prototype.extensions;

/**
 * @constructor
 * @template I, V, O
 */
koGrid.Columns = function () {};

/**
 * @param {string} id
 * @returns koGrid.Column
 */
koGrid.Columns.prototype.byId = function (id) {};

/**
 * @type {function():Array<koGrid.Column>}
 */
koGrid.Columns.prototype.displayed;

/**
 * @type {function():number}
 */
koGrid.Columns.prototype.combinedWidth;

/**
 * @constructor
 */
koGrid.Column = function () {};

/**
 * @type {string}
 */
koGrid.Column.prototype.id;

/**
 * @type {string}
 */
koGrid.Column.prototype.property;

/**
 * @type {boolean}
 */
koGrid.Column.prototype.userDefined;

/**
 * @returns {?number}
 */
koGrid.Column.prototype.widthInPixels = function () {};

/**
 * @type {function():Array<string>}
 */
koGrid.Column.prototype.headerClasses;

/**
 * @type {function():Array<string>}
 */
koGrid.Column.prototype.cellClasses;

/**
 * @type {function():Array<string>}
 */
koGrid.Column.prototype.footerClasses;

/**
 * @param {?} value
 * @returns {string}
 */
koGrid.Column.prototype.renderValue = function (value) {};

/** @typedef {function(Element, ?, koGrid.Column)} */
koGrid.Column.BindingInitializer;

/** @typedef {function(Element, ?, ?, koGrid.Column)} */
koGrid.Column.BindingUpdater;

/** @typedef {{init: koGrid.Column.BindingInitializer, update: koGrid.Column.BindingUpdater}} */
koGrid.Column.Binding;

/**
 * @param {function(koGrid.Column.Binding):koGrid.Column.Binding} override
 */
koGrid.Column.prototype.overrideValueBinding = function (override) {};

/**
 * @constructor
 * @template I, V, O
 */
koGrid.Headers = function () {};

/**
 * @type {ko.Subscribable<Array<koGrid.Header>>}
 */
koGrid.Headers.prototype.all;

/**
 * @param {string|function(this:Element, MouseEvent, koGrid.Header)} selectorOrHandler
 * @param {function(this:Element, MouseEvent, koGrid.Header)} handler
 */
koGrid.Headers.prototype.onHeaderClick = function (selectorOrHandler, handler) {};

/**
 * @param {string|function(this:Element, MouseEvent, koGrid.Header)} selectorOrHandler
 * @param {function(this:Element, MouseEvent, koGrid.Header)} handler
 */
koGrid.Headers.prototype.onColumnHeaderClick = function (selectorOrHandler, handler) {};

/**
 * @constructor
 */
koGrid.Header = function () {};

/**
 * @type {koGrid.Column}
 */
koGrid.Header.prototype.column;

/**
 * @constructor
 * @template I, V, O
 */
koGrid.Data = function () {};

/**
 * @type {function(?):?}
 */
koGrid.Data.prototype.observableValueSelector;

/**
 * @type {function(?):?}
 */
koGrid.Data.prototype.valueSelector;

/**
 * @type {ko.Subscribable<function(V):boolean>}
 */
koGrid.Data.prototype.predicate;

/**
 * @type {ko.Subscribable<function(V, V):number>}
 */
koGrid.Data.prototype.comparator;

/**
 * @constructor
 * @template I, V, O
 */
koGrid.Data.Rows = function () {};

/**
 * @type {ko.Subscribable<boolean>}
 */
koGrid.Data.Rows.prototype.displayedSynchronized;

/**
 * @type {Object}
 */
// TODO this is a bad API, should have grid.data.rows.installFilter(...)
koGrid.Data.prototype.predicates;

/**
 * @constructor
 */
koGrid.Layout = function () {};

/**
 * @param {function()} callback
 */
koGrid.Layout.prototype.afterRelayout = function (callback) {};

/**
 * @param {function()} callback
 */
koGrid.Layout.prototype.beforeRelayout = function (callback) {};

/**
 * @param {function()=} configuration
 */
koGrid.Layout.prototype.recalculate = function (configuration) {};

/**
 * @constructor
 */
koGrid.Extension = function () {};

/**
 * @constructor
 */
koGrid.Template = function () {};

/**
 * @param {string} placeholderId
 * @returns koGrid.Template.InsertInProgress
 */
koGrid.Template.prototype.after = function (placeholderId) {};

/**
 * @param {string} placeholderId
 * @returns koGrid.Template.InsertInProgress
 */
koGrid.Template.prototype.into = function (placeholderId) {};

/**
 * @param {string} placeholderId
 * @returns koGrid.Template.AppendPrependInProgress
 */
koGrid.Template.prototype.to = function (placeholderId) {};

/**
 * @constructor
 */
koGrid.Template.AppendPrependInProgress = function () {};

/**
 * @param {string} newPlaceholderIdOrMarkup
 * @param {string=} markup
 */
koGrid.Template.AppendPrependInProgress.prototype.append = function (newPlaceholderIdOrMarkup, markup) {};

/**
 * @param {string} newPlaceholderIdOrMarkup
 * @param {string=} markup
 */
koGrid.Template.AppendPrependInProgress.prototype.prepend = function (newPlaceholderIdOrMarkup, markup) {};

/**
 * @constructor
 */
koGrid.Template.InsertInProgress = function () {};

/**
 * @param {string} newPlaceholderIdOrMarkup
 * @param {string=} markup
 */
koGrid.Template.InsertInProgress.prototype.insert = function (newPlaceholderIdOrMarkup, markup) {};

