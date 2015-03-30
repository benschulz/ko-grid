
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
