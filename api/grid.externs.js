
/**
 * @constructor
 * @template I, V, O
 */
de.benshu.ko.grid.Grid = function () {};

/**
 * @type {!Element}
 */
de.benshu.ko.grid.Grid.prototype.rootElement;

/**
 * @type {?Element}
 */
de.benshu.ko.grid.Grid.prototype.element;

/**
 * @param {function()} callback
 */
de.benshu.ko.grid.Grid.prototype.postApplyBindings = function (callback) {};

/**
 * @type {de.benshu.ko.grid.Columns<I, V, O>}
 */
de.benshu.ko.grid.Grid.prototype.columns;

/**
 * @type {de.benshu.ko.grid.Headers<I, V, O>}
 */
de.benshu.ko.grid.Grid.prototype.headers;

/**
 * @type {de.benshu.ko.grid.Data<I, V, O>}
 */
de.benshu.ko.grid.Grid.prototype.data;

/**
 * @type {de.benshu.ko.grid.Layout}
 */
de.benshu.ko.grid.Grid.prototype.layout;

/**
 * @type {Object}
 */
de.benshu.ko.grid.Grid.prototype.extensions;
