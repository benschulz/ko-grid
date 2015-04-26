'use strict';

define([
    './aliases.test',
    './basic.test',
    './constructor.test',
    './dependencies.test'
], function () {
    var tests = Array.prototype.slice.call(arguments);

    return () => {
        describe('extensions: ', () => {
            tests.forEach(test => test());
        });
    };
});
