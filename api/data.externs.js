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
 * @type {ko.Subscribable<de.benshu.onefold.lists.List<O>>}
 */
de.benshu.ko.grid.Data.Rows.prototype.displayed;

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
