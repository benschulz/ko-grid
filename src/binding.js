'use strict';

define([
    'req', 'knockout', 'onefold-js', './application-event-dispatcher',
    './template', './core', './extensions', 'text!ko-grid/grid.html.template', 'ko-indexed-repeat'
], function (req, ko, js, ApplicationEventDispatcher) {
    var require = req;
    var document = window.document;

    var koGrid = ko.bindingHandlers['grid'] = ko.bindingHandlers['grid'] || {};
    var core = require('./core');
    var extensions = require('./extensions');
    var GridTemplate = require('./template');

    var tableTemplate = require('text!ko-grid/grid.html.template');

    var coreComponentNames = ['columns', 'headers', 'data', 'layout'];
    var coreComponents = coreComponentNames.map(n => core[n]);

    var templateEngine = new ko.nativeTemplateEngine();
    templateEngine.addTemplate = function (templateName, templateMarkup) {
        var template = document.createElement('script');
        template.id = templateName;
        template.type = 'text/html';
        template.text = templateMarkup;

        document.querySelector('head').appendChild(template);
    };

    /** @constructor */
    function Grid(rootElement, bindingValue) {
        this.bindingValue = bindingValue;
        this.primaryKey = bindingValue['primaryKey'];
        this['primaryKey'] = this.primaryKey;
        this.rootElement = rootElement;
        this['rootElement'] = rootElement;
        this.element = null;
        this['element'] = null;
        this._dispose = () => {};

        this.__postApplyBindings = () => {};

        this.postApplyBindings = callback => {
            if (!this.__postApplyBindings)
                throw new Error('Illegal state: postApplyBindings-callbacks have been called already.');

            var innerCallback = this.__postApplyBindings;
            this.__postApplyBindings = () => {
                innerCallback();
                callback();
            };
        };
        this['postApplyBindings'] = this.postApplyBindings;

        var onKeyDownDispatcher = new ApplicationEventDispatcher();
        this.onKeyDown = onKeyDownDispatcher.registerHandler.bind(onKeyDownDispatcher);
        this['onKeyDown '] = this.onKeyDown;
        rootElement.addEventListener('keydown', e => {
            onKeyDownDispatcher.relativeToClosest('.ko-grid').dispatch(e);
            return !e.defaultPrevented;
        });
    }

    ko.bindingHandlers['grid']['init'] = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var bindingValue = valueAccessor();
        var configName = bindingValue['config'];

        loadConfig(configName, function (config, templateName, extensionLoadOrder) {
            var disposeCallbacks = [];
            var grid = new Grid(element, bindingValue);
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                grid._dispose();
                disposeCallbacks.forEach(function (callback) {
                    callback();
                });
            });

            js.objects.forEachProperty(core, function (componentName, component) {
                var instance = new component.Constructor(bindingValue, config, grid);
                grid[componentName] = instance;
                grid.columns = grid['columns'];
                grid.headers = grid['headers'];
                grid.data = grid['data'];
                grid.layout = grid['layout'];
                if (typeof instance._dispose === 'function')
                    disposeCallbacks.push(instance._dispose.bind(instance));
            });

            var extensionConfigs = config['extensions'];
            var extensionBindingValues = bindingValue['extensions'] || {};
            var gridExtensions = grid['extensions'] = grid.extensions = {};

            extensionLoadOrder.forEach(function (extensionName) {
                var extension = koGrid.lookUpExtension(extensionName);
                var extensionBindingValue = extension.tryExtractBindingValue(extensionBindingValues) || {};
                var extensionConfig = apply(extension.extractConfiguration(extensionConfigs, configName), extensionBindingValue, bindingValue);

                if (extensionConfig['enabled'] === false && extensionBindingValue['enabled'] !== true || extensionBindingValue['enabled'] === false)
                    return;
                extension.dependencies.forEach(function (dependency) {
                    if (!gridExtensions[dependency])
                        throw new Error('Dependency \'' + dependency + '\' was disabled.');
                });

                var instance = new extension.Constructor(extensionBindingValue, extensionConfig, grid, bindingValue, config);
                extension.knownAliases.forEach(alias => {
                    gridExtensions[alias] = instance;
                });
                if (typeof instance.dispose === 'function')
                    disposeCallbacks.push(instance.dispose.bind(instance));
            });

            while (element.firstChild)
                ko.removeNode(element.firstChild);

            var gridContext = bindingContext.createChildContext(grid, 'grid');
            ko.renderTemplate(templateName, gridContext, {'templateEngine': templateEngine}, element);

            var gridElement = element.querySelector('.ko-grid');
            grid.element = gridElement;
            grid['element'] = gridElement;

            js.objects.forEachProperty(extensionConfigs, function (extensionName) {
                gridElement.className += ' with-' + js.strings.convertCamelToHyphenCase(extensionName);
            });

            coreComponentNames.forEach(function (n) {
                if (grid[n]._postApplyBindings)
                    grid[n]._postApplyBindings();
            });

            grid.__postApplyBindings();
            grid.__postApplyBindings = null;
        });

        /**
         * @param {...*} config
         * @return {?}
         */
        function apply(config) {
            return typeof config === 'function'
                ? config.apply(undefined, Array.prototype.slice.call(arguments, 1))
                : config;
        }

        return {'controlsDescendantBindings': true};
    };
    ko.bindingHandlers['grid']['update'] = () => {};

    // TODO extract into own file
    var loadedConfigs = {};
    var loadConfig = function (configName, handler) {
        function callHandler() {
            var loadedConfig = loadedConfigs[configName];
            handler(loadedConfig.config, loadedConfig.templateName, loadedConfig.extensionLoadOrder);
        }

        if (loadedConfigs[configName])
            return callHandler();

        req([configName], function (config) {
            var template = new GridTemplate(tableTemplate);
            coreComponents.forEach(function (component) { component.init(template, config); });

            var extensionConfigs = config['extensions'] || {};
            var loadedExtensions = [];
            var loadingExtensions = [];
            var loadExtension = function (extensionName) {
                var extension = koGrid.lookUpExtension(extensionName);
                var primaryExtensionName = extension.primaryName;
                var extensionConfig = extension.extractConfiguration(extensionConfigs, configName);

                if (js.arrays.contains(loadedExtensions, primaryExtensionName))
                    return;
                if (js.arrays.contains(loadingExtensions, primaryExtensionName))
                    throw new Error('Dependency cycle: .. -> ' + loadingExtensions.join(' -> ') + ' -> ' + primaryExtensionName + ' -> ..');

                loadingExtensions.push(primaryExtensionName);
                extension.dependencies.forEach(loadExtension);
                extension.initializer(template, extensionConfig, config);
                loadedExtensions.push(loadingExtensions.pop());
            };
            Object.keys(extensionConfigs).forEach(loadExtension);

            var templateName = 'ko-grid-template-' + configName;
            templateEngine.addTemplate(templateName, template.build());
            loadedConfigs[configName] = {
                config: config,
                templateName: templateName,
                extensionLoadOrder: loadedExtensions
            };

            callHandler();
        });
    };

    ko.bindingHandlers['_gridWidth'] = {
        'init': () => {},
        'update': function (element, valueAccessor) {
            var w = valueAccessor();
            element.style.width = w;
            element.style.maxWidth = w;
        }
    };

    return koGrid;
});
