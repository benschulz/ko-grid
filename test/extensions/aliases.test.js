'use strict';

define(['knockout', 'ko-grid', '../tester.test'], function (ko, koGrid, tester) {
    return () => {
        describe('aliases: ', () => {

            function testAliases(extensionId, aliases) {
                var configExtensions = {},
                    bindingValueExtensions = {};

                Object.keys(aliases).forEach(a => {
                    var alias = extensionId + '-' + a;
                    if (aliases[a].config)
                        configExtensions[alias] = aliases[a].config;
                    if (aliases[a].bindingValue)
                        bindingValueExtensions[alias] = aliases[a].bindingValue;
                });

                var toBeDeclared = Object.keys(aliases).map(a => extensionId + '-' + a);
                if (toBeDeclared.length === 1)
                    koGrid.declareExtensionAlias(toBeDeclared[0], extensionId);
                else
                    koGrid.declareExtensionAliases(toBeDeclared, extensionId);

                tester
                    .for([]).columns([])
                    .config({extensions: configExtensions})
                    .extensions(bindingValueExtensions)
                    .insert.anywhere();
            }

            it('Extensions should be configurable via aliases declared by `declareExtensionAlias`.', function (done) {
                var extensionId = this.test.title;
                var expectedAliasConfig = 'expected-alias-config';

                koGrid.defineExtension(extensionId, {
                    Constructor: function (_, config) {
                        expect(config).to.equal(expectedAliasConfig);
                        done();
                    }
                });

                testAliases(extensionId, {
                    alias: {config: expectedAliasConfig}
                });
            });

            it('Extensions should be configurable via aliases declared by `declareExtensionAliases`.', function (done) {
                var extensionId = this.test.title;
                var expectedAliasConfig = 'expected-alias-config';

                koGrid.defineExtension(extensionId, {
                    Constructor: function (_, config) {
                        expect(config).to.equal(expectedAliasConfig);
                        done();
                    }
                });

                testAliases(extensionId, {
                    foo: {},
                    alias: {config: expectedAliasConfig},
                    bar: {}
                });
            });

            it('Configuring an extension via different aliases should cause an exception.', function (done) {
                var onerrorBackup = window.onerror;
                window.onerror = function (message) {
                    expect(message.toLowerCase()).to.contain('conflicting configurations');
                    done();
                };
                after(() => window.onerror = onerrorBackup);

                var extensionId = this.test.title;
                koGrid.defineExtension(extensionId, {Constructor: function () {}});

                testAliases(extensionId, {
                    a: {config: 'config-a'},
                    b: {config: 'config-b'}
                });
            });

            it('Configuring an extension with conflicting binding values via different aliases should cause an exception.', function (done) {
                var onerrorBackup = window.onerror;
                window.onerror = function (message) {
                    expect(message.toLowerCase()).to.contain('conflicting binding values');
                    done();
                };
                after(() => window.onerror = onerrorBackup);

                var extensionId = this.test.title;
                koGrid.defineExtension(extensionId, {Constructor: function () {}});

                testAliases(extensionId, {
                    a: {bindingValue: 'binding-value-a', config: {}},
                    b: {bindingValue: 'binding-value-b'}
                });
            });

            it('Defining an extension with an id already taken should fail.', function () {
                var extensionId = this.test.title;
                koGrid.defineExtension(extensionId, {Constructor: function () {}});

                expect(() => koGrid.defineExtension(extensionId, {Constructor: function () {}})).to.throw();
            });

            it('Declaring an alias already taken should fail.', function () {
                var extensionIdA = this.test.title + '-a';
                var extensionIdB = this.test.title + '-b';
                koGrid.defineExtension(extensionIdA, {Constructor: function () {}});
                koGrid.defineExtension(extensionIdB, {Constructor: function () {}});

                expect(() => koGrid.declareExtensionAlias(extensionIdA, extensionIdB)).to.throw();
            });
        });
    };
});
