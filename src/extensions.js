'use strict';

define(['knockout', 'onefold-js'], function (ko, js) {
    var grid = ko.bindingHandlers['grid'] = ko.bindingHandlers['grid'] || {};
    var extensions = grid['extensions'] = grid['extensions'] || {};

    function registerExtension(extensionId, extension) {
        if (js.objects.hasOwn(extensions, extensionId))
            throw new Error('Extension id or alias already in use: `' + extensionId + '`.');
        extensions[extensionId] = extension;
        return extension;
    }

    function lookUpExtension(extensionId) {
        if (!js.objects.hasOwn(extensions, extensionId))
            throw new Error('No known extension id or alias: `' + extensionId + '`.');
        return extensions[extensionId];
    }

    grid.defineExtension = (extensionId, extensionSpec) => registerExtension(extensionId, new GridExtension(extensionSpec));

    grid.lookUpExtension = lookUpExtension;

    grid.declareExtensionAlias = (extensionAlias, extensionId) => registerExtension(extensionAlias, grid.lookUpExtension(extensionId));

    /** @constructor */
    function GridExtension(extensionSpec) {
        this.dependencies = extensionSpec.dependencies || [];
        this.initializer = extensionSpec.initializer || js.functions.nop;
        this.Constructor = extensionSpec.Constructor;
    }

    return extensions;
});
