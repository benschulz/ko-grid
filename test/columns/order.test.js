'use strict';

define(['knockout', 'ko-grid', '../tester.test'], function (ko, koGrid, tester) {
    return () => {
        describe('basic: ', () => {
            it('Initially column order should correspond to their binding value order.', () => {
                var columnIds = ['a', 'b', 'c', 'd', 'e'];

                return tester
                    .for([])
                    .columns(columnIds)
                    .insert.anywhere()
                    .then(inspector => {
                        expect(inspector.grid.columns.all().map(c => c.id)).to.eql(columnIds);
                    });
            });

            it('A reordering of columns should be reflected by `columns.all`.', () => {
                var columnIds = ['a', 'b', 'c', 'd', 'e'];

                return tester
                    .for([])
                    .columns(columnIds)
                    .insert.anywhere()
                    .then(inspector => {
                        inspector.grid.columns.reorder(inspector.grid.columns.all().reverse());

                        expect(inspector.grid.columns.all().map(c => c.id)).to.eql(columnIds.reverse());
                    });
            });

            it('A reordering of columns should be reflected by `columns.all`.', () => {
                var columnIds = ['a', 'b', 'c', 'd', 'e'];

                return tester
                    .for([])
                    .columns(columnIds)
                    .insert.anywhere()
                    .then(inspector => {
                        inspector.grid.columns.reorder(inspector.grid.columns.all().reverse());

                        expect(inspector.grid.columns.all().map(c => c.id)).to.eql(columnIds.reverse());
                    });
            });

            it('Dropping a column by reordering should fail.', () => {
                var columnIds = ['a', 'b', 'c', 'd', 'e'];

                return tester
                    .for([])
                    .columns(columnIds)
                    .insert.anywhere()
                    .then(inspector => {
                        var allColumns = inspector.grid.columns.all(),
                            someColumns = allColumns.slice(0, 2).concat(allColumns.slice(3));

                        expect(() => inspector.grid.columns.reorder(someColumns)).to.throw();
                    });
            });
        });
    };
});
