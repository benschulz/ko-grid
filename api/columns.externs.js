
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
