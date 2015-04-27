
'use strict';

define([
    './basic.test',
    './order.test',
    './visibility.test'
], function () {
    var tests = Array.prototype.slice.call(arguments);

    return () => {
        describe('columns: ', () => {
            tests.forEach(test => test());
        });
    };
});
