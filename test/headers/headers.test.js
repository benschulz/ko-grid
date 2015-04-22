'use strict';

define([
    './basic.test'
], function () {
    var tests = Array.prototype.slice.call(arguments);

    return () => {
        describe('headers: ', () => {
            tests.forEach(test => test());
        });
    };
});
