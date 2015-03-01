'use strict';

define(['req', 'knockout', 'onefold-js', './template', './core', './extensions', 'text!ko-grid/grid.html.template', 'ko-indexed-repeat'], function (req, ko, js) {
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

    function Grid(element, bindingValue) {
        this.elementId = element.id;
        this['elementId'] = this.elementId;
        this.primaryKey = bindingValue['primaryKey'];
        this['primaryKey'] = this.primaryKey;
        this._rootElement = element;
        this._classes = ko.observableArray([]);
        this._dispose = js.functions.nop;
    }

    ko.bindingHandlers['grid']['init'] = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var bindingValue = valueAccessor();
        loadConfig(bindingValue['config'], function (config, templateName, extensionLoadOrder) {
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

            var configExtensions = config['extensions'];
            var bindingExtensions = bindingValue['extensions'];
            var gridExtensions = grid['extensions'] = {};

            extensionLoadOrder.forEach(function (extensionName) {
                var extension = koGrid.lookUpExtension(extensionName);
                var extensionConfig = configExtensions[extensionName];
                var extensionBindingValue = bindingExtensions ? bindingExtensions[extensionName] || {} : {};

                if (extensionConfig['enabled'] === false && extensionBindingValue['enabled'] !== true || extensionBindingValue['enabled'] === false)
                    return;
                extension.dependencies.forEach(function (dependency) {
                    if (!gridExtensions[dependency])
                        throw new Error('Dependency \'' + dependency + '\' was disabled.');
                });

                var instance = new extension.Constructor(extensionBindingValue, extensionConfig, grid, bindingValue, config);
                gridExtensions[extensionName] = instance;
                if (typeof instance.dispose === 'function')
                    disposeCallbacks.push(instance.dispose.bind(instance));
            });

            while (element.firstChild)
                ko.removeNode(element.firstChild);

            coreComponentNames.forEach(function (n) {
                if (grid[n]._preApplyBindings)
                    grid[n]._preApplyBindings();
            });

            var gridContext = bindingContext.createChildContext(grid, 'grid');
            ko.renderTemplate(templateName, gridContext, {'templateEngine': templateEngine}, element);

            var gridElement = element.querySelector('.ko-grid');
            js.objects.forEachProperty(configExtensions, function (extensionName) {
                gridElement.className += ' with-' + js.strings.convertCamelToHyphenCase(extensionName);
            });

            coreComponentNames.forEach(function (n) {
                if (grid[n]._postApplyBindings)
                    grid[n]._postApplyBindings();
            });
        });

        return {'controlsDescendantBindings': true};
    };
    ko.bindingHandlers['grid']['update'] = js.functions.nop;

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

            var configExtensions = config['extensions'];
            var loadedExtensions = [];
            var loadingExtensions = [];
            var loadExtension = function (extensionName) {
                var extension = koGrid.lookUpExtension(extensionName);

                if (js.arrays.contains(loadedExtensions, extensionName))
                    return;
                if (!extension)
                    throw new Error('Extension  \'' + extensionName + '\' is not defined/loaded.');
                if (js.arrays.contains(loadingExtensions, extensionName))
                    throw new Error('Dependency-Cycle: .. -> ' + loadingExtensions.join(' -> ') + ' -> ' + extensionName + ' -> ..');
                if (!configExtensions[extensionName])
                    throw new Error('The extension \'' + extensionName + '\' must be configured (configuration: \'' + configName + '\')');

                loadingExtensions.push(extensionName);
                extension.dependencies.forEach(loadExtension);
                extension.initializer(template, configExtensions[extensionName], config);

                if (loadingExtensions.pop() !== extensionName)
                    throw new Error('Assertion error.');
                loadedExtensions.push(extensionName);
            };
            js.objects.forEachProperty(configExtensions, loadExtension);

            var templateName = 'grid-template-' + configName;
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
        'init': js.functions.nop,
        'update': function (element, valueAccessor) {
            var w = valueAccessor();
            element.style.width = w;
            element.style.maxWidth = w;
        }
    };

    return koGrid;
});
