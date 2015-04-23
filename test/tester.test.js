'use strict';

define(['knockout', 'onefold-js', 'ko-data-source', 'ko-grid'], function (ko, js, koDataSource) {

    var document = window.document,
        merge = function () { return js.objects.extend.apply(null, [{}].concat(toArray(arguments))); };

    function toArray(arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    }

    var toBeRemoved = [];
    afterEach(function () {
        while (toBeRemoved.length)
            ko.removeNode(toBeRemoved.pop());
    });

    function forDataOrDataSource(dataOrDataSource) {
        var dataSource = Array.isArray(dataOrDataSource)
            ? createDataSourceFrom(dataOrDataSource)
            : dataOrDataSource;

        return identifiedByPreparator({
            dataSource: dataSource
        });
    }

    function createDataSourceFrom(data) {
        var dataSource = new koDataSource.ClientSideDataSource(v => v.id);
        dataSource.addEntries(data);
        return dataSource;
    }

    function identifiedByPreparator(partialConfiguration) {
        var implicitConfiguration = merge(partialConfiguration, {
            primaryKey: 'id'
        });

        return merge(columnsPreparator(implicitConfiguration), {
            identifiedBy: id => columnsPreparator(merge(partialConfiguration, {
                primaryKey: id
            }))
        });
    }

    function columnsPreparator(partialConfiguration) {
        return {
            columns: columnSpecs => {
                var normalizedColumnSpecs = columnSpecs.map(columnSpec => typeof columnSpec === 'string'
                    ? {id: columnSpec, width: '200px', label: cap(columnSpec)} : columnSpec);

                return columnGroupsPreparator(merge(partialConfiguration, {
                    columns: normalizedColumnSpecs
                }));
            }
        };
    }

    function cap(s) {
        return s[0].toUpperCase() + s.slice(1);
    }

    function columnGroupsPreparator(partialConfiguration) {
        return merge(configPreparator(partialConfiguration), {
            groupedInto: columnGroups => configPreparator(merge(partialConfiguration, {
                columnGroups: columnGroups
            }))
        });
    }

    function configPreparator(partialConfiguration) {
        var implicitConfiguration = merge(partialConfiguration, {
            config: defineTestConfig('empty-test-config', {})
        });

        return merge(inserter(implicitConfiguration), {
            config: config => inserter(merge(partialConfiguration, {
                config: defineAnonymousTestConfig(config)
            }))
        });
    }

    var testConfigCounter = 0;

    function defineAnonymousTestConfig(config) {
        return defineTestConfig('anonymous-test-config-' + (++testConfigCounter), config);
    }

    function defineTestConfig(id, config) {
        define(id, [], config);
        return id;
    }

    function inserter(configuration) {
        return {
            insert: {
                anywhere: function () {
                    return this.into(createContainer());
                },
                into: function (container) {
                    var grid = document.createElement('div');
                    container.appendChild(grid);

                    ko.applyBindingsToNode(grid, {
                        grid: {
                            config: configuration.config,
                            dataSource: configuration.dataSource,
                            primaryKey: configuration.primaryKey,
                            columns: configuration.columns,
                            columnGroups: configuration.columnGroups
                        }
                    });

                    var resolver = resolve => {
                        if (container.querySelector('.ko-grid')) {
                            var grid = ko.contextFor(container.querySelector('.ko-grid')).grid;

                            if (grid.data.rows.displayedSynchronized())
                                return resolve(new GridInspector(container, grid));
                        }

                        window.setTimeout(resolver, 0, resolve);
                    };
                    return new Promise(resolver);
                }
            }
        };
    }

    function GridInspector(container, grid) {
        function header(rowIndex, columnIndex) {
            return new HeaderInspector(container.querySelector('.ko-grid-headers:nth-child(' + (rowIndex + 1) + ') > :nth-child(' + (columnIndex + 1) + ')'));
        }

        header.rasterized = function (rowIndex, columnIndex) {
            var raster = [];
            toArray(container.querySelectorAll('.ko-grid-headers')).forEach((row, rowIndex) => {
                raster[rowIndex] = raster[rowIndex] || [];

                var shift = 0;
                toArray(row.children).forEach((cell, cellIndex) => {
                    while (raster[rowIndex][cellIndex + shift])
                        ++shift;

                    var columnIndex = cellIndex + shift,
                        rowSpan = cell.rowSpan,
                        columnSpan = cell.colSpan;

                    for (var x = 0; x < columnSpan; ++x) for (var y = 0; y < rowSpan; ++y) {
                        var row = raster[rowIndex + y] = raster[rowIndex + y] || [];
                        row[columnIndex + x] = cell;
                    }
                });
            });

            return new HeaderInspector(raster[rowIndex][columnIndex]);
        };

        this.grid = grid;
        this.header = header;
        this.element = container.querySelector('.ko-grid');
        this.row = rowIndex => new RowInspector(container.querySelector('.ko-grid-row:nth-child(' + (rowIndex + 1) + ')'));
        this.cell = (rowIndex, columnIndex) => this.row(rowIndex).cell(columnIndex);

        js.objects.extend(this, {
            get rowCount() { return container.querySelectorAll('.ko-grid-row').length; }
        });
    }

    function HeaderInspector(header) {
        expect(header).to.not.be.null;
        this.element = header;
    }

    function RowInspector(row) {
        expect(row).to.not.be.null;
        this.element = row;
        this.cells = () => toArray(row.querySelectorAll('.ko-grid-cell')).map(c => new CellInspector(c));
        this.cell = columnIndex => new CellInspector(row.querySelector('.ko-grid-cell:nth-child(' + (columnIndex + 1) + ')'));
    }

    function CellInspector(cell) {
        expect(cell).to.not.be.null;
        this.element = cell;
    }

    function createContainer(parent) {
        var container = document.createElement('div');
        (parent || document.body).appendChild(container);
        toBeRemoved.push(container);
        return container;
    }

    return {
        for: forDataOrDataSource
    };
});
