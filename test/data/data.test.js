'use strict';

define([
    './basic.test',
    './cell-hijacking.test',
    './cell-lookup.test',
    './event-dispatching.test',
    './row-classification.test'
], function () {
    var tests = Array.prototype.slice.call(arguments);

    return () => {
        describe('data: ', () => {
            tests.forEach(test => test());
        });
    };
});
