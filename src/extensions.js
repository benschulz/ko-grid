'use strict';

define(['knockout', 'onefold-js'], function (ko, js) {
    var grid = ko.bindingHandlers['grid'] = ko.bindingHandlers['grid'] || {};
    var extensions = grid['extensions'] = grid['extensions'] || {};

    function registerExtension(extensionId, extension) {
        if (js.objects.hasOwn(extensions, extensionId))
            throw new Error('Extension id or alias already in use: `' + extensionId + '`.');
        extensions[extensionId] = extension;
        extension.__knownAliases.push(extensionId);
        return extension;
    }

    function lookUpExtension(extensionId) {
        if (!js.objects.hasOwn(extensions, extensionId))
            throw new Error('No known extension id or alias: `' + extensionId + '`.');
        return extensions[extensionId];
    }

    grid['defineExtension'] = grid.defineExtension = (name, spec) => registerExtension(name, new GridExtension(name, spec));

    grid.lookUpExtension = lookUpExtension;

    grid['declareExtensionAlias'] = grid.declareExtensionAlias = (alias, alreadyKnownAlias) => registerExtension(alias, grid.lookUpExtension(alreadyKnownAlias));
    grid['declareExtensionAliases'] = grid.declareExtensionAliases = (aliases, alreadyKnownAlias) => {
        var extension = grid.lookUpExtension(alreadyKnownAlias);
        aliases.forEach(a => registerExtension(a, extension));
        return extension;
    };

    /** @constructor */
    function GridExtension(primaryName, spec) {
        this.primaryName = primaryName;
        this.dependencies = spec['dependencies'] || [];
        this.initializer = spec['initializer'] || (() => {});
        this.Constructor = spec['Constructor'];

        this.__knownAliases = [];
    }

    GridExtension.prototype = {
        get knownAliases() { return this.__knownAliases.slice(); },

        extractConfiguration: function (configurations, configName) {
            var usedAlias = this.__determineUsedAlias(configurations, presentAliases => {
                throw new Error('Conflicting configurations ' + presentAliases.map(c => '`' + c + '`').join(', ') + ' (configuration: `' + configName + '`).');
            });

            if (!usedAlias)
                throw new Error('The extension `' + this.primaryName + '` must be configured (configuration: `' + configName + '`)');

            return configurations[usedAlias];
        },
        tryExtractBindingValue: function (bindingValues) {
            var usedAlias = this.__determineUsedAlias(bindingValues, presentAliases => {
                throw new Error('Conflicting binding values ' + presentAliases.map(c => '`' + c + '`').join(', ') + '.');
            });

            return bindingValues[usedAlias];
        },
        __determineUsedAlias: function (object, dieDueToAmbiguity) {
            var presentAliases = this.__knownAliases.filter(a=> js.objects.hasOwn(object, a));

            if (presentAliases.length > 1)
                dieDueToAmbiguity(presentAliases);

            return presentAliases[0];
        }
    };

    return extensions;
});
