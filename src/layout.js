'use strict';

define(['knockout'], function (ko) {
    var document = window.document;

    var layout = {
        init: () => {},
        Constructor: function (bindingValue, config, grid) {
            var recalculating = ko.observable(false);

            var recalculate = configuration => {
                if (configuration)
                    configuration();
            };
            this.recalculate = (configuration) => { recalculate(configuration); };
            this['recalculate'] = this.recalculate;
            var recalculateTrigger = ko.computed(() => {
                if (recalculating()) return;
                grid.columns.displayed().forEach(c => { c.width(); });
                recalculate();
            });

            var beforeRelayoutHandlers = [];
            var afterRelayoutHandlers = [];
            this.beforeRelayout = handler => { beforeRelayoutHandlers.push(handler); };
            this.afterRelayout = handler => { afterRelayoutHandlers.push(handler); };
            this['beforeRelayout'] = this.beforeRelayout;
            this['afterRelayout'] = this.afterRelayout;

            this._postApplyBindings = () => {
                initScolling.call(this, grid);
                recalculate = createLayoutRecalculator(grid, recalculating, beforeRelayoutHandlers, afterRelayoutHandlers);

                grid.postApplyBindings(recalculate);
            };

            // TODO let caller specify cell type (header cell vs. data cell vs. footer cell as well as other classes)
            this.determineCellDimensions = content => {
                var cell = document.createElement('div');
                cell.className = 'ko-grid-td ko-grid-cell';
                cell.appendChild(typeof content === 'string' ? document.createTextNode(content) : content);
                cell.style.position = 'absolute';
                cell.style.visibility = 'hidden';
                document.body.appendChild(cell);
                try {
                    return {width: cell.offsetWidth, height: cell.offsetHeight};
                } finally {
                    document.body.removeChild(cell);
                }
            };
            this['determineCellDimensions'] = this.determineCellDimensions;

            this._dispose = () => {
                recalculateTrigger.dispose();
            };
        }
    };

    var initScolling = function (grid) {
        var gridElement = grid.element;
        var scroller = gridElement.querySelector('.ko-grid-table-scroller');
        var thead = gridElement.querySelector('.ko-grid-thead');
        var tfoot = gridElement.querySelector('.ko-grid-tfoot');

        scroller.addEventListener('scroll', function () {
            var offset = (-scroller.scrollLeft) + 'px';
            thead.style.left = offset;
            tfoot.style.left = offset;
        });
    };

    var createLayoutRecalculator = (grid, recalculating, beforeRelayoutHandlers, afterRelayoutHandlers) => {
        var gridElement = grid.element;
        var spacer = gridElement.querySelector('.ko-grid-table-scroller-padding');
        var scroller = gridElement.querySelector('.ko-grid-table-scroller');
        var thead = gridElement.querySelector('.ko-grid-thead');
        var tfoot = gridElement.querySelector('.ko-grid-tfoot');

        var updateHeaderHeight = h => { spacer.style.borderTopWidth = Math.max(h, 0) + 'px'; };
        var updateFooterHeight = h => { spacer.style.borderBottomWidth = Math.max(h, 0) + 'px'; };

        var recalculationInProgress = false;
        return configuration => {
            if (recalculationInProgress) return;

            try {
                recalculating(recalculationInProgress = true);

                // TODO try for a nicer solution
                var scrollLeftBeforeRecalculation = scroller.scrollLeft;

                if (configuration)
                    configuration();

                beforeRelayoutHandlers.forEach(h => { h.call(gridElement); });

                updateHeaderHeight(thead.clientHeight);
                updateFooterHeight(tfoot.clientHeight);

                scroller.scrollLeft = scrollLeftBeforeRecalculation;

                afterRelayoutHandlers.forEach(h => { h.call(gridElement); });
            } finally {
                recalculating(false);
                recalculationInProgress = false;
            }
        };
    };

    return layout;
});
