'use strict';

define(['knockout', 'ko-grid', '../tester.test'], function (ko, koGrid, tester) {
    return () => {
        describe('basic: ', () => {
            it('Looking up a non-existent column should fail.', () => {
                return tester
                    .for([])
                    .columns(['a', 'b', 'c', 'd', 'e'])
                    .insert.anywhere()
                    .then(inspector => {
                        expect(() => inspector.grid.columns.byId('foo')).to.throw();
                    });
            });

            it('Finding multiple columns with the same id should raise an exception.', () => {
                // TODO This is testing a state that should not be achievable in the first state. => Refactor.
                return tester
                    .for([])
                    .columns(['a', 'b', {id: 'b', width: '200px', label: 'b', hidden: true}, 'c'])
                    .insert.anywhere()
                    .then(inspector => {
                        expect(() => inspector.grid.columns.byId('b')).to.throw();
                    });
            });

            it('Adding a column adds a column with the id-prefix `\'$\'`.', () => {
                return tester
                    .for([])
                    .columns([])
                    .insert.anywhere()
                    .then(inspector => {
                        inspector.grid.columns.add({
                            id: 'id',
                            width: '100px',
                            label: 'Label'
                        });

                        expect(inspector.grid.columns.byId('$id').widthInPixels()).to.equal(100);
                        expect(inspector.grid.columns.byId('$id').label()).to.equal('Label');
                        expect(inspector.grid.columns.byId('$id').visible()).to.be.true;
                    });
            });
        });
    };
});
