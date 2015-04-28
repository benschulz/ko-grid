'use strict';

define(['knockout', 'ko-grid', '../tester.test'], function (ko, koGrid, tester) {
    return () => {
        describe('basic: ', () => {
            it('Determining cell dimensions should yield the expected dimensions.', () => {
                return tester
                    .for([]).columns([])
                    .insert.anywhere()
                    .then(inspector => {
                        // TODO The borders and paddings make for a fragile test. Maybe fixing the TODO in layout.js will help out here?
                        var content = window.document.createElement('div');
                        content.style.width = '87px';
                        content.style.height = '95px';

                        var result = inspector.grid.layout.determineCellDimensions(content);

                        expect(result.width).to.closeTo(100, 1);  // We can get slight deviations due
                        expect(result.height).to.closeTo(100, 1); // to `border-collapse: collapse`.
                    });
            });
        });
    };
});
