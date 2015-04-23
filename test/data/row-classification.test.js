'use strict';

define(['knockout', '../tester.test'], function (ko, tester) {
    return () => {
        describe('basic: ', () => {
            it('Row classifiers should be applied.', () => {
                return tester
                    .for([
                        {id: '1', name: 'Alice'}
                    ])
                    .columns(['name'])
                    .insert.anywhere()
                    .then(inspector => {
                        inspector.grid.data.rows.installClassifier(r => ['some-class']);

                        // TODO test via extension so the classifier is installed *before* displaying data
                        inspector.grid.data.limit(0);
                        inspector.grid.data.limit(Number.POSITIVE_INFINITY);

                        expect(inspector.row(0).element.classList.contains('some-class')).to.be.true;
                    });
            });
        });
    };
});
