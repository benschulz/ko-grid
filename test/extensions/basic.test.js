'use strict';

define(['knockout', 'ko-grid', '../tester.test'], function (ko, koGrid, tester) {
    return () => {
        describe('basic: ', () => {
            it('Configuring an undefined extension should cause an exception.', function (done) {
                var onerrorBackup = window.onerror;
                window.onerror = function (message) {
                    expect(message.toLowerCase()).to.contain('no known extension id or alias');
                    done();
                };
                after(() => window.onerror = onerrorBackup);

                tester
                    .for([]).columns([])
                    .config({extensions: {undefinedExtension: {}}})
                    .insert.anywhere();
            });
        });
    };
});
