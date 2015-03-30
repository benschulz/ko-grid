
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
