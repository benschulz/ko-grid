'use strict';

define(['knockout', '../tester.test'], function (ko, tester) {
    function range(size) {
        return Array.apply(null, new Array(size)).map((_, i) => i);
    }

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

            it('Rows should be displayed incrementally.', done => {
                var rowCount = 100;
                var entries = range(rowCount).map(i => ({id: '' + i, a: (i + 1) + 'A', b: (i + 1) + 'B', c: (i + 1) + 'C'}));

                return tester
                    .for([])
                    .columns(['a', 'b', 'c'])
                    .insert.anywhere()
                    .then(inspector => {
                        var incrementalStepObserved = false;
                        inspector.grid.data.rows.displayedSynchronized.subscribe(sync => {
                            expect(!sync || inspector.rowCount === rowCount).to.be.true;

                            incrementalStepObserved = incrementalStepObserved || !sync;
                            if (sync && incrementalStepObserved)
                                done();
                        });

                        inspector.grid.data.source.addEntries(entries);
                    });
            });
        });
    };
});
