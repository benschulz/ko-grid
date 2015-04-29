'use strict';

define(['knockout', 'simulant', '../tester.test'], function (ko, simulant, tester) {
    function fail() {
        throw new Error('Unexpected invocation.');
    }

    return () => {
        describe('event-dispatching: ', () => {
            it('A column header click should be dispatched to an unqualified `onColumnHeaderClick`-handler.', done => {
                return tester
                    .for([])
                    .columns(['column'])
                    .insert.anywhere()
                    .then(inspector => {
                        inspector.grid.headers.onColumnHeaderClick(() => done());

                        simulant.fire(inspector.header(0, 0).element, 'click');
                    });
            });

            it('A column group header click should not be dispatched to an `onColumnHeaderClick`-handler.', () => {
                return tester
                    .for([])
                    .columns(['column'])
                    .groupedInto([{label: 'Group', elements: ['column']}])
                    .insert.anywhere()
                    .then(inspector => {
                        inspector.grid.headers.onColumnHeaderClick(fail);

                        simulant.fire(inspector.header(0, 0).element, 'click');
                    });
            });
        });
    };
});
