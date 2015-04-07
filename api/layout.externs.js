
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
