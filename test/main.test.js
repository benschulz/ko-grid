'use strict';

require(['require'], function (require) {
    window.mocha.setup('bdd');

    window.expect = window.chai.expect;

    require([
        'data/data.test',
        'headers/headers.test'
    ], function () {
        Array.prototype.slice.call(arguments).forEach(test => test());

        window.__karma__.start();
    });

});
