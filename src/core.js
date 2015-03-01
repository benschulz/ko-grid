'use strict';

define(['knockout', './columns', './data', './headers', './layout'], function (ko, columns, data, headers, layout) {
    var grid = ko.bindingHandlers['grid'] = ko.bindingHandlers['grid'] || {};
    var core = grid['core'] = grid['core'] || {
        'columns': columns,
        'data': data,
        'headers': headers,
        'layout': layout
    };
    return core;
});
