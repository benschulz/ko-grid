
/** @typedef {function(new:de.benshu.ko.grid.Extension, *, *, de.benshu.ko.grid.Grid, *, *)} */
de.benshu.ko.grid.ExtensionConstructor;

/** @typedef {{dependencies: Array<string>, initializer: function(de.benshu.ko.grid.Template), Constructor: de.benshu.ko.grid.ExtensionConstructor}} */
de.benshu.ko.grid.ExtensionSpec;

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
 * @param {!de.benshu.ko.grid.ExtensionSpec} spec
 */
de.benshu.ko.grid.defineExtension = function (name, spec) {};

/** @namespace */
de.benshu.ko.grid.extensions = {};

/**
 * @constructor
 */
de.benshu.ko.grid.Extension = function () {};
