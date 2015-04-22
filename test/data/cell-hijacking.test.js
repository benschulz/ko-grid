'use strict';

define(['knockout', '../tester.test'], function (ko, tester) {
    function createSingleCellGrid() {
        return tester
            .for([
                {id: '1', name: 'Alice'}
            ])
            .columns(['name'])
            .insert.anywhere();
    }

    return () => {
        describe('cell-hijacking: ', () => {
            it('Cell hijacking should apply the provided binding override.', () => {
                return createSingleCellGrid()
                    .then(inspector => {
                        var row = inspector.grid.data.rows.displayed().get(0);
                        var column = inspector.grid.columns.all()[0];
                        var cell = inspector.grid.data.lookupCell(row, column);

                        cell.hijack(() => ({
                            init: element => {
                                element.appendChild(window.document.createTextNode(''));
                            },
                            update: element => {
                                element.classList.add('hijacked');
                                element.firstChild.nodeValue = 'Hijacked';
                            }
                        }));

                        var cellElement = inspector.cell(0, 0).element;
                        expect(cellElement.classList.contains('hijacked')).to.be.true;
                        expect(cellElement.textContent).to.equal('Hijacked');
                    });
            });

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
        });
    };
});
