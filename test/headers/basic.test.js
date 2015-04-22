'use strict';

define(['knockout', '../tester.test'], function (ko, tester) {
    return () => {
        describe('basic: ', () => {
            it('Column groups should be placed above their elements.', () => {
                return tester
                    .for([])
                    .columns(['a', 'b', 'c', 'd'])
                    .groupedInto([
                        {label: 'ab', elements: ['a', 'b']},
                        {label: 'cd', elements: ['c', 'd']}
                    ])
                    .insert.anywhere()
                    .then(inspector => {
                        expect(inspector.header.rasterized(0, 0).element.textContent).to.equal('ab');
                        expect(inspector.header.rasterized(0, 1).element.textContent).to.equal('ab');
                        expect(inspector.header.rasterized(0, 2).element.textContent).to.equal('cd');
                        expect(inspector.header.rasterized(0, 3).element.textContent).to.equal('cd');
                        expect(inspector.header.rasterized(1, 0).element.textContent).to.equal('A');
                        expect(inspector.header.rasterized(1, 1).element.textContent).to.equal('B');
                        expect(inspector.header.rasterized(1, 2).element.textContent).to.equal('C');
                        expect(inspector.header.rasterized(1, 3).element.textContent).to.equal('D');
                    });
            });

            it('Column groups of column groups should be placed above their elements.', () => {
                return tester
                    .for([])
                    .columns(['a', 'b', 'c', 'd'])
                    .groupedInto([
                        {
                            label: 'abcd',
                            elements: [
                                {label: 'ab', elements: ['a', 'b']},
                                {label: 'cd', elements: ['c', 'd']}
                            ]
                        }
                    ])
                    .insert.anywhere()
                    .then(inspector => {
                        expect(inspector.header.rasterized(0, 0).element.textContent).to.equal('abcd');
                        expect(inspector.header.rasterized(0, 1).element.textContent).to.equal('abcd');
                        expect(inspector.header.rasterized(0, 2).element.textContent).to.equal('abcd');
                        expect(inspector.header.rasterized(0, 3).element.textContent).to.equal('abcd');
                        expect(inspector.header.rasterized(1, 0).element.textContent).to.equal('ab');
                        expect(inspector.header.rasterized(1, 1).element.textContent).to.equal('ab');
                        expect(inspector.header.rasterized(1, 2).element.textContent).to.equal('cd');
                        expect(inspector.header.rasterized(1, 3).element.textContent).to.equal('cd');
                        expect(inspector.header.rasterized(2, 0).element.textContent).to.equal('A');
                        expect(inspector.header.rasterized(2, 1).element.textContent).to.equal('B');
                        expect(inspector.header.rasterized(2, 2).element.textContent).to.equal('C');
                        expect(inspector.header.rasterized(2, 3).element.textContent).to.equal('D');
                    });
            });

            it('Have columns span multiple rows when necessary.', () => {
                return tester
                    .for([])
                    .columns(['a', 'b'])
                    .groupedInto([{label: 'ab', elements: ['a', {label: 'b', elements: ['b']}]}])
                    .insert.anywhere()
                    .then(inspector => {
                        expect(inspector.header.rasterized(0, 0).element.textContent).to.equal('ab');
                        expect(inspector.header.rasterized(0, 1).element.textContent).to.equal('ab');
                        expect(inspector.header.rasterized(1, 0).element.textContent).to.equal('A');
                        expect(inspector.header.rasterized(1, 1).element.textContent).to.equal('b');
                        expect(inspector.header.rasterized(2, 0).element.textContent).to.equal('A');
                        expect(inspector.header.rasterized(2, 1).element.textContent).to.equal('B');
                    });
            });

            it('Assigning a column to multiple groups should fail.', () => {
                expect(() => tester
                    .for([])
                    .columns(['a'])
                    .groupedInto([
                        {label: 'a1', elements: ['a']},
                        {label: 'a2', elements: ['a']}
                    ])
                    .insert.anywhere())
                    .to.throw();
            });

            it('Looking up the header of a visible column should return the column\'s header.', () => {
                return tester
                    .for([])
                    .columns([
                        {id: 'a', width: '100px', label: 'A'},
                        {id: 'b', width: '100px', label: 'B'},
                        {id: 'c', width: '100px', label: 'C'}
                    ])
                    .insert.anywhere()
                    .then(inspector => {
                        var column = inspector.grid.columns.byId('b');

                        var result = inspector.grid.headers.forColumn(column);

                        expect(result.column).to.equal(column);
                    });
            });

            it('Looking up the header of a hidden column should fail.', () => {
                return tester
                    .for([])
                    .columns([
                        {id: 'id', width: '100px', label: 'Label', hidden: true}
                    ])
                    .insert.anywhere()
                    .then(inspector => {
                        var column = inspector.grid.columns.byId('id');

                        expect(() => inspector.grid.headers.forColumn(column)).to.throw();
                    });
            });
        });
    };
});
