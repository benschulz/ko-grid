'use strict';

define(['knockout', '../tester.test'], function (ko, tester) {
    function createTwoEntryGrid(columns) {
        return tester
            .for([
                {id: '1', name: 'Alice', age: 30, email: 'alice@example.org'},
                {id: '2', name: 'Bob', age: 57, email: 'bob@example.org'}
            ])
            .columns(columns)
            .insert.anywhere();
    }

    function createTwoEntrySingleCellGrid() {
        return createTwoEntryGrid(['name'])
            .then(function (inspector) {
                inspector.grid.data.limit(1);
                return inspector;
            });
    }

    function createThreeColumnSingleRowGrid() {
        return createTwoEntryGrid(['name', 'age', 'email'])
            .then(function (inspector) {
                inspector.grid.data.limit(1);
                return inspector;
            });
    }

    function createTwoEntryThreeColumnGrid() {
        return createTwoEntryGrid(['name', 'age', 'email'])
            .then(function (inspector) {
                inspector.grid.data.limit(1);
                return inspector;
            });
    }

    function createSingleCellGrid() {
        return createTwoEntrySingleCellGrid();
    }

    function withSimpleHijackIndicator(b) {
        return {
            init: b.init,
            update: function (element) {
                b.update.apply(undefined, arguments);
                element.firstChild.nodeValue += ' (hijacked)';
            }
        };
    }

    return () => {
        describe('cell-hijacking: ', () => {
            it('Cell hijacking can decorate the existing binding.', () => {
                return createSingleCellGrid()
                    .then(inspector => {
                        var row = inspector.grid.data.rows.displayed().get(0);
                        var column = inspector.grid.columns.all()[0];
                        var cell = inspector.grid.data.lookupCell(row, column);

                        cell.hijack(b => ({
                            init: function (element) {
                                b.init.apply(undefined, arguments);
                                element.insertBefore(window.document.createElement('span'), element.firstChild);
                                element.appendChild(window.document.createElement('span'));
                                element.firstChild.appendChild(window.document.createTextNode('['));
                                element.lastChild.appendChild(window.document.createTextNode(']'));
                            },
                            update: function (element) {
                                b.update.apply(undefined, arguments);
                                element.firstChild.nextSibling.nodeValue = '(' + element.firstChild.nextSibling.nodeValue + ')';
                            }
                        }));

                        expect(inspector.cell(0, 0).element.textContent).to.equal('[(Alice)]');
                    });
            });

            it('Hijacking should allow manipulation of the cell\'s text node `nodeValue`.', () => {
                return createSingleCellGrid()
                    .then(inspector => {
                        var row = inspector.grid.data.rows.displayed().get(0);
                        var column = inspector.grid.columns.all()[0];
                        var cell = inspector.grid.data.lookupCell(row, column);

                        cell.hijack(withSimpleHijackIndicator);

                        expect(inspector.cell(0, 0).element.textContent).to.equal('Alice (hijacked)');
                    });
            });

            it('Releasing the hijacked cell should restore the original binding.', () => {
                return createSingleCellGrid()
                    .then(inspector => {
                        var row = inspector.grid.data.rows.displayed().get(0);
                        var column = inspector.grid.columns.all()[0];
                        var cell = inspector.grid.data.lookupCell(row, column);

                        cell.hijack(withSimpleHijackIndicator).release();

                        expect(inspector.cell(0, 0).element.textContent).to.equal('Alice');
                    });
            });

            it('Hijacking should not affect entries reusing the same row element.', () => {
                return createTwoEntrySingleCellGrid()
                    .then(inspector => {
                        var row = inspector.grid.data.rows.displayed().get(0);
                        var column = inspector.grid.columns.all()[0];
                        var cell = inspector.grid.data.lookupCell(row, column);

                        cell.hijack(withSimpleHijackIndicator);
                        inspector.grid.data.offset(1);

                        expect(inspector.cell(0, 0).element.textContent).to.equal('Bob');
                    });
            });

            it('The hijack should be restored when the entry is redisplayed in a recycled row.', () => {
                return createTwoEntryThreeColumnGrid()
                    .then(inspector => {
                        var row = inspector.grid.data.rows.displayed().get(0);
                        var ageColumn = inspector.grid.columns.byId('age');
                        var cell = inspector.grid.data.lookupCell(row, ageColumn);

                        cell.hijack(withSimpleHijackIndicator);
                        inspector.grid.data.offset(1);
                        inspector.grid.data.offset(0);

                        expect(inspector.cell(0, 1).element.textContent).to.equal('30 (hijacked)');
                    });
            });

            it('The hijack should be restored when the entry is redisplayed in a new row.', () => {
                return createTwoEntryThreeColumnGrid()
                    .then(inspector => {
                        var row = inspector.grid.data.rows.displayed().get(0);
                        var ageColumn = inspector.grid.columns.byId('age');
                        var cell = inspector.grid.data.lookupCell(row, ageColumn);

                        cell.hijack(withSimpleHijackIndicator);
                        inspector.grid.data.offset(1);
                        inspector.grid.data.limit(2);
                        inspector.grid.data.offset(0);

                        expect(inspector.cell(0, 1).element.textContent).to.equal('30 (hijacked)');
                    });
            });

            it('Releasing the hijacked cell when it is not displayed should work.', () => {
                return createTwoEntrySingleCellGrid()
                    .then(inspector => {
                        var row = inspector.grid.data.rows.displayed().get(0);
                        var column = inspector.grid.columns.all()[0];
                        var cell = inspector.grid.data.lookupCell(row, column);

                        var hijack = cell.hijack(withSimpleHijackIndicator);
                        inspector.grid.data.offset(1);
                        hijack.release();
                        inspector.grid.data.offset(0);

                        expect(inspector.cell(0, 0).element.textContent).to.equal('Alice');
                    });
            });

            it('Hijacking an already hijacked cell should fail.', () => {
                return createSingleCellGrid()
                    .then(inspector => {
                        var row = inspector.grid.data.rows.displayed().get(0);
                        var column = inspector.grid.columns.all()[0];
                        var cell = inspector.grid.data.lookupCell(row, column);

                        cell.hijack(withSimpleHijackIndicator);
                        expect(() => cell.hijack(withSimpleHijackIndicator)).to.throw();
                    });
            });

            it('Hijacking two cells in the same row should work.', () => {
                return createThreeColumnSingleRowGrid()
                    .then(inspector => {
                        var row = inspector.grid.data.rows.displayed().get(0);
                        var nameColumn = inspector.grid.columns.byId('name');
                        var emailColumn = inspector.grid.columns.byId('email');
                        var nameCell = inspector.grid.data.lookupCell(row, nameColumn);
                        var emailCell = inspector.grid.data.lookupCell(row, emailColumn);

                        nameCell.hijack(withSimpleHijackIndicator);
                        emailCell.hijack(withSimpleHijackIndicator);

                        expect(inspector.cell(0, 0).element.textContent).to.equal('Alice (hijacked)');
                        expect(inspector.cell(0, 2).element.textContent).to.equal('alice@example.org (hijacked)');
                    });
            });

            it('Releasing a hijack should not affect other hijacks in the same row.', () => {
                return createThreeColumnSingleRowGrid()
                    .then(inspector => {
                        var row = inspector.grid.data.rows.displayed().get(0);
                        var nameColumn = inspector.grid.columns.byId('name');
                        var emailColumn = inspector.grid.columns.byId('email');
                        var nameCell = inspector.grid.data.lookupCell(row, nameColumn);
                        var emailCell = inspector.grid.data.lookupCell(row, emailColumn);

                        var nameHijack = nameCell.hijack(withSimpleHijackIndicator);
                        emailCell.hijack(withSimpleHijackIndicator);
                        nameHijack.release();

                        expect(inspector.cell(0, 2).element.textContent).to.equal('alice@example.org (hijacked)');
                    });
            });
        });
    };
});
