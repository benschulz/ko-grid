'use strict';

define(['knockout', '../tester.test'], function (ko, tester) {
    function createGrid(columns, offset, limit) {
        return tester
            .for([
                {id: '1', name: 'Alice', age: 30, email: 'alice@example.org'},
                {id: '2', name: 'Bob', age: 57, email: 'bob@example.org'},
                {id: '3', name: 'Carol', age: 23, email: 'carol@example.org'}
            ])
            .columns(columns)
            .insert.anywhere()
            .then(function (inspector) {
                inspector.grid.data.comparator((a, b) => a.name.localeCompare(b.name));
                inspector.grid.data.offset(offset);
                inspector.grid.data.limit(limit);
                return inspector;
            });
    }

    var ALL_COLUMNS = ['name', 'age', 'email'];

    function createCompleteGrid() {
        return createGrid(ALL_COLUMNS, 0, Number.POSITIVE_INFINITY);
    }

    function createGridWithColumns(columns) {
        return createGrid(columns, 0, Number.POSITIVE_INFINITY);
    }

    function createGridClippedTo(offset, limit) {
        return createGrid(ALL_COLUMNS, offset, limit);
    }

    return () => {
        describe('cell-lookup: ', () => {
            it('Looking up a cell for a displayed entry and a displayed column should return the corresponding cell.', () => {
                return createCompleteGrid()
                    .then(inspector => {
                        var row = inspector.grid.data.rows.displayed().get(1);
                        var column = inspector.grid.columns.all()[1];

                        var cell = inspector.grid.data.lookupCell(row, column);

                        expect(cell.element).to.equal(inspector.cell(1, 1).element);
                    });
            });

            it('Looking up a cell for a hidden column should fail.', () => {
                return createGridWithColumns(['name', {id: 'age', width: '100px', hidden: true}, 'email'])
                    .then(inspector => {
                        var row = inspector.grid.data.rows.displayed().get(1);
                        var column = inspector.grid.columns.all()[1];

                        expect(() => inspector.grid.data.lookupCell(row, column)).to.throw();
                    });
            });

            it('Looking up a cell for a non-displayed entry should fail.', () => {
                return createGridClippedTo(1, 1)
                    .then(inspector => {
                        var row = inspector.grid.data.source.openEntryView('1').observable;
                        var column = inspector.grid.columns.all()[1];

                        expect(() => inspector.grid.data.lookupCell(row, column)).to.throw();
                    });
            });
        });
    };
});
