'use strict';

define(['knockout', 'ko-grid', '../tester.test'], function (ko, koGrid, tester) {
    return () => {
        describe('basic: ', () => {
            it('Hiding a column should remove it from the displayed columns.', () => {
                return tester
                    .for([])
                    .columns(['a', 'b', 'c'])
                    .insert.anywhere()
                    .then(inspector => {
                        inspector.grid.columns.hide(inspector.grid.columns.byId('b'));

                        expect(inspector.grid.columns.displayed().map(c => c.id)).to.eql(['a', 'c']);
                    });
            });

            it('Showing a column should add it from the displayed columns.', () => {
                return tester
                    .for([])
                    .columns(['a', {id: 'b', width: '200px', label: 'B', hidden: true}, 'c'])
                    .insert.anywhere()
                    .then(inspector => {
                        inspector.grid.columns.show(inspector.grid.columns.byId('b'));

                        expect(inspector.grid.columns.displayed().map(c => c.id)).to.eql(['a', 'b', 'c']);
                    });
            });
        });
    };
});
