'use strict';

define(['knockout', 'ko-grid', '../tester.test'], function (ko, koGrid, tester) {
    return () => {
        describe('constructor: ', () => {

            function testConstructor(extensionId, Constructor, config, bindingValue) {
                koGrid.defineExtension(extensionId, {
                    Constructor: Constructor
                });

                var configExtensions = {}, bindingValueExtensions = {};
                configExtensions[extensionId] = config || {};
                bindingValueExtensions[extensionId] = bindingValue || {};

                tester
                    .for([]).columns([])
                    .config({extensions: configExtensions})
                    .extensions(bindingValueExtensions)
                    .insert.anywhere();
            }

            it('The first argument should be the extension binding value.', function (done) {
                var extensionId = this.test.title,
                    extensionBindingValue = 'expected-binding-value';

                testConstructor(
                    extensionId,
                    function TestExtension(arg1) {
                        expect(arg1).to.equal(extensionBindingValue);
                        done();
                    },
                    {},
                    extensionBindingValue
                );
            });

            it('The second argument should be the extension binding value.', function (done) {
                var extensionId = this.test.title,
                    extensionConfig = 'expected-config';

                testConstructor(
                    extensionId,
                    function TestExtension(arg1, arg2) {
                        expect(arg2).to.equal(extensionConfig);
                        done();
                    },
                    extensionConfig
                );
            });

            it('The third argument should be the grid.', function (done) {
                var extensionId = this.test.title;

                testConstructor(
                    extensionId,
                    function TestExtension(arg1, arg2, arg3) {
                        arg3.postApplyBindings(() => {
                            expect(arg3.extensions[extensionId]).to.equal(this);
                            done();
                        });
                    }
                );
            });

            it('The forth argument should be the complete binding value.', function (done) {
                var extensionId = this.test.title;

                testConstructor(
                    extensionId,
                    function TestExtension(arg1, arg2, arg3, arg4) {
                        expect(arg4.extensions[extensionId]).to.equal(arg1);
                        done();
                    }
                );
            });

            it('The fifth argument should be the complete config.', function (done) {
                var extensionId = this.test.title;

                testConstructor(
                    extensionId,
                    function TestExtension(arg1, arg2, arg3, arg4, arg5) {
                        expect(arg5.extensions[extensionId]).to.equal(arg2);
                        done();
                    }
                );
            });
        });
    };
});
