/**
 * @constructor
 * @template I, V, O
 */
de.benshu.ko.grid.Data = function () {};

/**
 * @type {function(?):?}
 */
de.benshu.ko.grid.Data.prototype.observableValueSelector;

/**
 * @type {function(?):?}
 */
de.benshu.ko.grid.Data.prototype.valueSelector;

/**
 * @type {ko.Subscribable<function(V):boolean>}
 */
de.benshu.ko.grid.Data.prototype.predicate;

/**
 * @type {ko.Subscribable<function(V, V):number>}
 */
de.benshu.ko.grid.Data.prototype.comparator;

/**
 * @type {ko.Subscribable<number>}
 */
de.benshu.ko.grid.Data.prototype.offset;

/**
 * @type {ko.Subscribable<number>}
 */
de.benshu.ko.grid.Data.prototype.limit;

/**
 * @type {de.benshu.ko.dataSource.View<?, ?>}
 */
de.benshu.ko.grid.Data.prototype.view;

/**
 * @constructor
 * @template I, V, O
 */
de.benshu.ko.grid.Data.Rows = function () {};

/**
 * @type {ko.Subscribable<boolean>}
 */
de.benshu.ko.grid.Data.Rows.prototype.displayedSynchronized;

/**
 * @type {Object}
 */
// TODO this is a bad API, should have grid.data.rows.installFilter(...)
de.benshu.ko.grid.Data.prototype.predicates;
