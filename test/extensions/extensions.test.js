'use strict';

define([
    './constructor.test'
], function () {
    var tests = Array.prototype.slice.call(arguments);

    return () => {
        describe('extensions: ', () => {
            tests.forEach(test => test());
        });
    };
});
