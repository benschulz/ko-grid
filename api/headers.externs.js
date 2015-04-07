
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
