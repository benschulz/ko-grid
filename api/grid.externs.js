
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
