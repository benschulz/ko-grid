'use strict';

define(['knockout', 'ko-grid', '../tester.test'], function (ko, koGrid, tester) {
    return () => {
        describe('constructor: ', () => {

            function testDependencies(extensionIdPrefix, extensions) {
                var configExtensions = {},
                    bindingValueExtensions = {};

                Object.keys(extensions).forEach(k => {
                    var extensionId = extensionIdPrefix + k;
                    var extension = extensions[k];

                    koGrid.defineExtension(extensionId, {
                        dependencies: extension.dependencies && extension.dependencies.map(d => extensionIdPrefix + d),
                        Constructor: extension.Constructor || function DummyConstructor() {}
                    });

                    if (extension.config !== false)
                        configExtensions[extensionId] = extension.config || {};
                    if (extension.bindingValue !== false)
                        bindingValueExtensions[extensionId] = extension.bindingValue || {};
                });

                tester
                    .for([]).columns([])
                    .config({extensions: configExtensions})
                    .extensions(bindingValueExtensions)
                    .insert.anywhere();
            }

            it('Dependent extensions should be loaded before their dependencies.', function (done) {
                var extensionIdPrefix = this.test.title + '-';

                testDependencies(extensionIdPrefix, {
                    a: {},
                    b: {
                        dependencies: ['a', 'c'],
                        Constructor: function (bindingValue, config, grid) {
                            expect(grid.extensions[extensionIdPrefix + 'a']).to.not.be.undefined;
                            expect(grid.extensions[extensionIdPrefix + 'c']).to.not.be.undefined;
                            done();
                        }
                    },
                    c: {}
                });
            });

            it('Dependency cycles should lead to an exception.', function (done) {
                var onerrorBackup = window.onerror;
                window.onerror = function (message) {
                    expect(message.toLowerCase()).to.contain('dependency cycle');
                    done();
                };
                after(() => window.onerror = onerrorBackup);

                testDependencies(this.test.title + '-', {
                    a: {dependencies: ['b']},
                    b: {dependencies: ['c']},
                    c: {dependencies: ['a']}
                });
            });

            it('An unconfigured dependency should lead to an exception.', function (done) {
                var onerrorBackup = window.onerror;
                window.onerror = function (message) {
                    expect(message.toLowerCase()).to.contain('configured');
                    done();
                };
                after(() => window.onerror = onerrorBackup);

                testDependencies(this.test.title + '-', {
                    a: {dependencies: ['b']},
                    b: {config: false}
                });
            });

            it('A dependency disabled in the config should lead to an exception.', function (done) {
                var onerrorBackup = window.onerror;
                window.onerror = function (message) {
                    expect(message.toLowerCase()).to.contain('disabled');
                    done();
                };
                after(() => window.onerror = onerrorBackup);

                testDependencies(this.test.title + '-', {
                    a: {dependencies: ['b']},
                    b: {config: {enabled: false}}
                });
            });

            it('A dependency disabled in the bindingValue should lead to an exception.', function (done) {
                var onerrorBackup = window.onerror;
                window.onerror = function (message) {
                    expect(message.toLowerCase()).to.contain('disabled');
                    done();
                };
                after(() => window.onerror = onerrorBackup);

                testDependencies(this.test.title + '-', {
                    a: {dependencies: ['b']},
                    b: {bindingValue: {enabled: false}}
                });
            });
        });
    };
});
