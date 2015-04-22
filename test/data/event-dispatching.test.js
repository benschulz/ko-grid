'use strict';

define(['knockout', 'simulant', '../tester.test'], function (ko, simulant, tester) {
    function createSingleCellGrid() {
        return tester
            .for([
                {id: '1', name: 'Alice'}
            ])
            .columns(['name'])
            .config({
                columnInitializer: column => {
                    column.overrideValueBinding(() => ({
                        init: element => {
                            var span = window.document.createElement('span');
                            span.className = 'qualifier';
                            span.appendChild(window.document.createTextNode(''))
                            element.appendChild(span);
                        },
                        update: (element, cell, row, column) => {
                            element.firstChild.firstChild.nodeValue = column.renderValue(ko.unwrap(cell));
                        }
                    }));
                }
            })
            .insert.anywhere();
    }

    function fail() {
        throw new Error('Unexpected invocation.');
    }

    return () => {
        describe('event-dispatching: ', () => {
            it('A direct cell click should be dispatched to an unqualified `onCellClick`-handler.', done => {
                return createSingleCellGrid()
                    .then(inspector => {
                        inspector.grid.data.onCellClick(() => done());

                        simulant.fire(inspector.cell(0, 0).element, 'click');
                    });
            });

            it('A direct cell click should not be dispatched to a qualified `onCellClick`-handler.', () => {
                return createSingleCellGrid()
                    .then(inspector => {
                        inspector.grid.data.onCellClick('.qualifier', fail);

                        simulant.fire(inspector.cell(0, 0).element, 'click');
                    });
            });

            it('An indirect cell click should be dispatched to a matching qualified `onCellClick`-handler.', done => {
                return createSingleCellGrid()
                    .then(inspector => {
                        inspector.grid.data.onCellClick('.qualifier', () => done());

                        simulant.fire(inspector.cell(0, 0).element.querySelector('.qualifier'), 'click');
                    });
            });

            it('An indirect cell click should not be dispatched to a non-matching qualified `onCellClick`-handler.', () => {
                return createSingleCellGrid()
                    .then(inspector => {
                        inspector.grid.data.onCellClick('.unmatched-qualifier', fail);

                        simulant.fire(inspector.cell(0, 0).element.querySelector('.qualifier'), 'click');
                    });
            });
        });
    };
});
