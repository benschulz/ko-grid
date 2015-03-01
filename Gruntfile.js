'use strict';

module.exports = function (grunt) {
    require('grunt-commons')(grunt, {
        name: 'ko-grid',
        main: 'binding',
        internalMain: 'binding',

        shims: {
            knockout: 'window.ko',
            require: function (configName, handler) {
                if (!Array.isArray(configName) || configName.length !== 1 || typeof configName[0] !== 'string' || typeof handler !== 'function')
                    throw new Error('Assertion error.');

                var store = window.ko.bindingHandlers['grid']['config'] = window.ko.bindingHandlers['grid']['config'] || {};
                handler(store[configName[0]]);
            }
        }
    }).initialize({
        less: true
    });
};
