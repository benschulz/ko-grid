'use strict';

define(['knockout', '../tester.test'], function (ko, tester) {
    return () => {
        describe('basic: ', () => {
            it('Row-wise data cell order should initially correspond to column order.', () => {
                return tester
                    .for([
                        {id: '1', name: 'Alice', email: 'alice@example.org'}
                    ])
                    .columns(['name', 'email'])
                    .insert.anywhere()
                    .then(inspector => {
                        expect(inspector.row(0).cells().map(c => c.element.textContent)).to.eql(['Alice', 'alice@example.org']);
                    });
            });

            it('Row-wise data cell order should reflect changes to column order.', () => {
                return tester
                    .for([
                        {id: '1', name: 'Alice', email: 'alice@example.org'}
                    ])
                    .columns(['name', 'email'])
                    .insert.anywhere()
                    .then(inspector => {
                        inspector.grid.columns.reorder(inspector.grid.columns.all().reverse());

                        expect(inspector.row(0).cells().map(c => c.element.textContent)).to.eql(['alice@example.org', 'Alice']);
                    });
            });
        });
    };
});
