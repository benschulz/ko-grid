

/** @namespace */
de.benshu.ko.grid = {};


/**
 * @constructor
 * @template I, V, O
 */
de.benshu.ko.grid.Grid = function () {};

/**
 * @type {de.benshu.ko.grid.Columns<I, V, O>}
 */
de.benshu.ko.grid.Grid.prototype.columns;

/**
 * @type {de.benshu.ko.grid.Data<I, V, O>}
 */
de.benshu.ko.grid.Grid.prototype.data;

/**
 * @type {?Element}
 */
de.benshu.ko.grid.Grid.prototype.element;

/**
 * @type {Object}
 */
de.benshu.ko.grid.Grid.prototype.extensions;

/**
 * @type {de.benshu.ko.grid.Headers<I, V, O>}
 */
de.benshu.ko.grid.Grid.prototype.headers;

/**
 * @type {de.benshu.ko.grid.Layout}
 */
de.benshu.ko.grid.Grid.prototype.layout;

/**
 * @type {!Element}
 */
de.benshu.ko.grid.Grid.prototype.rootElement;

/**
 * @param {string|function(KeyboardEvent)} selectorOrHandler
 * @param {function(KeyboardEvent)=} handler
 */
de.benshu.ko.grid.Grid.prototype.onKeyDown = function (selectorOrHandler, handler) {};

/**
 * @param {function()} callback
 */
de.benshu.ko.grid.Grid.prototype.postApplyBindings = function (callback) {};


/**
 * @constructor
 * @template I, V, O
 */
de.benshu.ko.grid.Data = function () {};

/**
 * @type {ko.Subscribable<function(V, V):number>}
 */
de.benshu.ko.grid.Data.prototype.comparator;

/**
 * @type {ko.Subscribable<number>}
 */
de.benshu.ko.grid.Data.prototype.limit;

/**
 * @type {function(?):?}
 */
de.benshu.ko.grid.Data.prototype.observableValueSelector;

/**
 * @type {ko.Subscribable<number>}
 */
de.benshu.ko.grid.Data.prototype.offset;

/**
 * @type {ko.Subscribable<function(V):boolean>}
 */
de.benshu.ko.grid.Data.prototype.predicate;

/**
 * @type {function(?):?}
 */
de.benshu.ko.grid.Data.prototype.valueSelector;

/**
 * @type {de.benshu.ko.dataSource.View<?, ?>}
 */
de.benshu.ko.grid.Data.prototype.view;

/**
 * @param {O} row
 * @param {de.benshu.ko.grid.Column} column
 * @returns de.benshu.ko.grid.Data.Cell
 */
de.benshu.ko.grid.Data.prototype.lookupCell = function (row, column) {};

/**
 * @param {string|function(MouseEvent, ?, O, de.benshu.ko.grid.Column)} selectorOrHandler
 * @param {function(MouseEvent, ?, O, de.benshu.ko.grid.Column)} handler
 */
de.benshu.ko.grid.Data.prototype.onCellClick = function (selectorOrHandler, handler) {};

/**
 * @param {string|function(MouseEvent, ?, O, de.benshu.ko.grid.Column)} selectorOrHandler
 * @param {function(MouseEvent, ?, O, de.benshu.ko.grid.Column)} handler
 */
de.benshu.ko.grid.Data.prototype.onCellDoubleClick = function (selectorOrHandler, handler) {};

/**
 * @constructor
 * @template I, V, O
 */
de.benshu.ko.grid.Data.Rows = function () {};

/**
 * @param {function(O):Array<string>} classifier
 */
de.benshu.ko.grid.Data.Rows.prototype.installClassifier = function(classifier) {};

/**
 * @type {ko.Subscribable<boolean>}
 */
de.benshu.ko.grid.Data.Rows.prototype.displayedSynchronized;

/**
 * @constructor
 */
de.benshu.ko.grid.Data.Cell = function () {};

/**
 * @type {Element}
 */
de.benshu.ko.grid.Data.Cell.prototype.element;

/**
 * @param classes
 * @returns de.benshu.ko.grid.Data.Cell.Hijacked
 */
de.benshu.ko.grid.Data.Cell.prototype.hijack = function (classes) {};

/**
 * @constructor
 */
de.benshu.ko.grid.Data.Cell.Hijacked = function () {};

/**
 * @returns undefined
 */
de.benshu.ko.grid.Data.Cell.Hijacked.dispose = function () {};
de.benshu.ko.grid.Data.Cell.Hijacked.release = de.benshu.ko.grid.Data.Cell.Hijacked.dispose;

/**
 * @type {Object}
 */
// TODO this is a bad API, should have grid.data.rows.installFilter(...)
de.benshu.ko.grid.Data.prototype.predicates;


/** @namespace */
de.benshu.ko.grid.events = {};

/** @interface */
de.benshu.ko.grid.events.ApplicationEvent = function(){};

/**
 * @returns undefined
 */
de.benshu.ko.grid.events.ApplicationEvent.preventApplicationButAllowBrowserDefault = function() {};


/**
 * @param {!string} alias
 * @param {!string} alreadyKnownAlias
 */
de.benshu.ko.grid.declareExtensionAlias = function (alias, alreadyKnownAlias) {};

/**
 * @param {!Array<string>} aliases
 * @param {!string} alreadyKnownAlias
 */
de.benshu.ko.grid.declareExtensionAliases = function (aliases, alreadyKnownAlias) {};

/**
 * @param {!string} name
 * @param {!Object} spec
 */
de.benshu.ko.grid.defineExtension = function (name, spec) {};

/** @namespace */
de.benshu.ko.grid.extensions = {};

/**
 * @constructor
 */
de.benshu.ko.grid.Extension = function () {};


/**
 * @constructor
 * @template I, V, O
 */
de.benshu.ko.grid.Columns = function () {};

/**
 * @param {string} id
 * @returns de.benshu.ko.grid.Column
 */
de.benshu.ko.grid.Columns.prototype.byId = function (id) {};


/**
 * @type {function():Array<de.benshu.ko.grid.Column>}
 */
de.benshu.ko.grid.Columns.prototype.displayed;

/**
 * @type {function():number}
 */
de.benshu.ko.grid.Columns.prototype.combinedWidth;


/**
 * @constructor
 */
de.benshu.ko.grid.Header = function () {};

/**
 * @type {de.benshu.ko.grid.Column}
 */
de.benshu.ko.grid.Header.prototype.column;


/**
 * @constructor
 * @template I, V, O
 */
de.benshu.ko.grid.Headers = function () {};

/**
 * @type {ko.Subscribable<Array<de.benshu.ko.grid.Header>>}
 */
de.benshu.ko.grid.Headers.prototype.all;

/**
 * @param {de.benshu.ko.grid.Column} column
 * @returns {de.benshu.ko.grid.Header}
 */
de.benshu.ko.grid.Headers.prototype.forColumn = function (column) {};

/**
 * @param {string|function(this:Element, MouseEvent, de.benshu.ko.grid.Header)} selectorOrHandler
 * @param {function(this:Element, MouseEvent, de.benshu.ko.grid.Header)} handler
 */
de.benshu.ko.grid.Headers.prototype.onHeaderClick = function (selectorOrHandler, handler) {};

/**
 * @param {string|function(this:Element, MouseEvent, de.benshu.ko.grid.Header)} selectorOrHandler
 * @param {function(this:Element, MouseEvent, de.benshu.ko.grid.Header)} handler
 */
de.benshu.ko.grid.Headers.prototype.onColumnHeaderClick = function (selectorOrHandler, handler) {};


/**
 * @constructor
 */
de.benshu.ko.grid.Column = function () {};

/**
 * @type {string}
 */
de.benshu.ko.grid.Column.prototype.id;

/**
 * @type {string}
 */
de.benshu.ko.grid.Column.prototype.property;

/**
 * @type {boolean}
 */
de.benshu.ko.grid.Column.prototype.userDefined;

/**
 * @returns {?number}
 */
de.benshu.ko.grid.Column.prototype.widthInPixels = function () {};

/**
 * @type {function():Array<string>}
 */
de.benshu.ko.grid.Column.prototype.headerClasses;

/**
 * @type {function():Array<string>}
 */
de.benshu.ko.grid.Column.prototype.cellClasses;

/**
 * @type {function():Array<string>}
 */
de.benshu.ko.grid.Column.prototype.footerClasses;

/**
 * @param {?} value
 * @returns {string}
 */
de.benshu.ko.grid.Column.prototype.renderValue = function (value) {};

/** @typedef {function(Element, ?, de.benshu.ko.grid.Column)} */
de.benshu.ko.grid.Column.BindingInitializer;

/** @typedef {function(Element, ?, ?, de.benshu.ko.grid.Column)} */
de.benshu.ko.grid.Column.BindingUpdater;

/** @typedef {{init: de.benshu.ko.grid.Column.BindingInitializer, update: de.benshu.ko.grid.Column.BindingUpdater}} */
de.benshu.ko.grid.Column.Binding;

/**
 * @param {function(de.benshu.ko.grid.Column.Binding):de.benshu.ko.grid.Column.Binding} override
 */
de.benshu.ko.grid.Column.prototype.overrideValueBinding = function (override) {};


/**
 * @constructor
 */
de.benshu.ko.grid.Layout = function () {};

/**
 * @param {function()} callback
 */
de.benshu.ko.grid.Layout.prototype.afterRelayout = function (callback) {};

/**
 * @param {function()} callback
 */
de.benshu.ko.grid.Layout.prototype.beforeRelayout = function (callback) {};

/**
 * @param {string|Node} content
 * @returns {{width:number, height:number}}
 */
de.benshu.ko.grid.Layout.prototype.determineCellDimensions = function (content) {};

/**
 * @param {function()=} configuration
 */
de.benshu.ko.grid.Layout.prototype.recalculate = function (configuration) {};


/**
 * @constructor
 */
de.benshu.ko.grid.Template = function () {};

/**
 * @param {string} placeholderId
 * @returns de.benshu.ko.grid.Template.InsertInProgress
 */
de.benshu.ko.grid.Template.prototype.after = function (placeholderId) {};

/**
 * @param {string} placeholderId
 * @returns de.benshu.ko.grid.Template.InsertInProgress
 */
de.benshu.ko.grid.Template.prototype.before = function (placeholderId) {};

/**
 * @param {string} placeholderId
 * @returns de.benshu.ko.grid.Template.InsertInProgress
 */
de.benshu.ko.grid.Template.prototype.into = function (placeholderId) {};

/**
 * @param {string} placeholderId
 * @returns de.benshu.ko.grid.Template.AppendPrependInProgress
 */
de.benshu.ko.grid.Template.prototype.to = function (placeholderId) {};

/**
 * @constructor
 */
de.benshu.ko.grid.Template.AppendPrependInProgress = function () {};

/**
 * @param {string} newPlaceholderIdOrMarkup
 * @param {string=} markup
 */
de.benshu.ko.grid.Template.AppendPrependInProgress.prototype.append = function (newPlaceholderIdOrMarkup, markup) {};

/**
 * @param {string} newPlaceholderIdOrMarkup
 * @param {string=} markup
 */
de.benshu.ko.grid.Template.AppendPrependInProgress.prototype.prepend = function (newPlaceholderIdOrMarkup, markup) {};

/**
 * @constructor
 */
de.benshu.ko.grid.Template.InsertInProgress = function () {};

/**
 * @param {string} newPlaceholderIdOrMarkup
 * @param {string=} markup
 */
de.benshu.ko.grid.Template.InsertInProgress.prototype.insert = function (newPlaceholderIdOrMarkup, markup) {};
