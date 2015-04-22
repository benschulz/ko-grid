'use strict';

define([
    './basic.test',
    './cell-hijacking.test',
    './event-dispatching.test'
], function () {
    var tests = Array.prototype.slice.call(arguments);

    return () => {
        describe('data: ', () => {
            tests.forEach(test => test());
        });
    };
});
