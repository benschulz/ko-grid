'use strict';

require(['require'], function (require) {
    window.mocha.setup('bdd');

    window.expect = window.chai.expect;

    require([
        'columns/columns.test',
        'data/data.test',
        'extensions/extensions.test',
        'headers/headers.test'
    ], function () {
        Array.prototype.slice.call(arguments).forEach(test => test());

        window.__karma__.start();
    });

});
