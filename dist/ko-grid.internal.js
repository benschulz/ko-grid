/*
 * Copyright (c) 2015, Ben Schulz
 * License: BSD 3-clause (http://opensource.org/licenses/BSD-3-Clause)
 */
define(['onefold-dom', 'indexed-list', 'stringifyable', 'onefold-lists', 'onefold-js', 'ko-data-source', 'ko-indexed-repeat', 'knockout'],    function(onefold_dom, indexed_list, stringifyable, onefold_lists, onefold_js, ko_data_source, ko_indexed_repeat, knockout) {
var ko_grid_application_event_dispatcher, ko_grid_template, text, text_ko_grid_columnshtmltemplate, ko_grid_columns, text_ko_grid_datahtmltemplate, ko_grid_data, text_ko_grid_headershtmltemplate, ko_grid_headers, ko_grid_layout, ko_grid_core, ko_grid_extensions, text_ko_grid_gridhtmltemplate, ko_grid_binding, ko_grid;

ko_grid_application_event_dispatcher = function (js, dom) {
  /** @constructor */
  function ApplicationEvent(originalEvent) {
    var commonProperties = [
      'altKey',
      'bubbles',
      'cancelable',
      'ctrlKey',
      'currentTarget',
      'detail',
      'eventPhase',
      'metaKey',
      'relatedTarget',
      'shiftKey',
      'target',
      'timeStamp',
      'type',
      'view',
      'which'
    ];
    var typeProperties = {
      'key': [
        'char',
        'charCode',
        'key',
        'keyCode'
      ],
      'mouse': [
        'button',
        'buttons',
        'clientX',
        'clientY',
        'offsetX',
        'offsetY',
        'pageX',
        'pageY',
        'screenX',
        'screenY',
        'toElement'
      ]
    };
    var properties = commonProperties.concat(typeProperties[originalEvent.type.substr(0, 3)] || []).concat(typeProperties[originalEvent.type.substr(0, 5)] || []);
    this.__originalEvent = originalEvent;
    this.__applicationDefaultPrevented = originalEvent.defaultPrevented;
    properties.forEach(function (p) {
      return Object.defineProperty(this, p, {
        get: function () {
          return originalEvent[p];
        }
      });
    }.bind(this));
  }
  ApplicationEvent.prototype = {
    preventDefault: function () {
      this.__applicationDefaultPrevented = true;
      return this.__originalEvent.preventDefault();
    },
    preventApplicationButAllowBrowserDefault: function () {
      this.__applicationDefaultPrevented = true;
    },
    get defaultPrevented() {
      return this.__applicationDefaultPrevented;
    }
  };
  ApplicationEvent.prototype = js.objects.extend({}, {
    get 'defaultPrevented'() {
      return this.defaultPrevented;
    },
    'preventDefault': ApplicationEvent.prototype.preventDefault,
    'preventApplicationButAllowBrowserDefault': ApplicationEvent.prototype.preventApplicationButAllowBrowserDefault
  }, ApplicationEvent.prototype);
  /** @constructor */
  function ApplicationEventHandler(handler, selector) {
    this.handler = handler;
    this.selector = selector;
  }
  /** @constructor */
  function ApplicationEventDispatcher(argumentsSupplier) {
    argumentsSupplier = argumentsSupplier || function (event) {
      return [event];
    };
    var handlers = [];
    this.registerHandler = function (selectorOrHandler, handler) {
      var selector = arguments.length > 1 ? selectorOrHandler : undefined;
      handler = arguments.length > 1 ? handler : selectorOrHandler;
      handlers.push(new ApplicationEventHandler(handler, selector));
      return {
        dispose: function () {
          if (handler) {
            handlers.splice(handlers.indexOf(handler), 1);
            handler = null;
          }
        }
      };
    };
    this.relativeToClosest = function (ancestorSelector) {
      return {
        dispatch: function (event) {
          var closestAncestor = dom.element.closest(event.target, ancestorSelector);
          if (closestAncestor) {
            var applicationEvent = new ApplicationEvent(event);
            dispatch(closestAncestor, applicationEvent, argumentsSupplier(applicationEvent, closestAncestor));
          }
        }
      };
    };
    function dispatch(root, event, handlerArguments) {
      function findDeepestMatch(selector) {
        var matches = Array.prototype.slice.call(root.querySelectorAll(selector)).filter(function (match) {
          return dom.isOrContains(match, event.target);
        });
        return matches.length ? matches[matches.length - 1] : undefined;
      }
      var determineDepth = dom.determineDepth.bind(null, root);
      var handlersAndTheirMatches = handlers.map(function (candidate) {
        var match = candidate.selector ? findDeepestMatch(candidate.selector) : root;
        return {
          handler: candidate.handler,
          match: match,
          depth: match ? determineDepth(match) : -1
        };
      });
      var applicableHandlers = handlersAndTheirMatches.filter(function (candidate) {
        return !!candidate.match;
      });
      js.arrays.stableSort(applicableHandlers, function (a, b) {
        return b.depth - a.depth;
      });
      applicableHandlers.forEach(function (h) {
        h.handler.apply(root, handlerArguments);
      });
    }
  }
  return ApplicationEventDispatcher;
}(onefold_js, onefold_dom);

ko_grid_template = function () {
  var PLACEHOLDER_KIND_REGULAR = 1;
  var PLACEHOLDER_KIND_BEFORE_AFTER = 2;
  var PLACEHOLDER_ID_PATTERN = /^[a-z]+(-[a-z]+)*$/;
  var PLACEHOLDER_MARKUP_PATTERN = /<!--(?:(before|after):)?([a-z]+(-[a-z]+)*)-->*/g;
  var OPERATOR_REPLACE = 1;
  var OPERATOR_INTO = 2;
  var OPERATOR_BEFORE = 3;
  var OPERATOR_AFTER = 4;
  var OPERATOR_TO_APPEND = 5;
  var OPERATOR_TO_PREPEND = 6;
  /** @constructor */
  // TODO eliminate mutation, move towards returning a new template at each step
  function GridTemplate(initialMarkup) {
    var placeholders = {};
    var checkValidPlaceholderId = function (id) {
      if (!PLACEHOLDER_ID_PATTERN.test(id))
        throw new Error('Invalid placeholder id `' + id + '`');
    };
    var registerPlaceholder = function (id, kind) {
      checkValidPlaceholderId(id);
      if (placeholders[id])
        throw new Error('Placeholder id `' + id + '` is already taken.');
      placeholders[id] = kind;
    };
    var registerPlaceholdersInMarkup = function (markup) {
      var match;
      while (!!(match = PLACEHOLDER_MARKUP_PATTERN.exec(markup))) {
        var beforeAfter = match[1], before = beforeAfter === 'before', id = match[2];
        if (beforeAfter && (markup.match(new RegExp((before ? 'after' : 'before') + ':' + id, 'g')) || []).length !== 1)
          throw new Error('Multiple or unmatched before-/after-placeholders for placeholder id `' + id + '`.');
        if (!beforeAfter || before)
          registerPlaceholder(id, beforeAfter ? PLACEHOLDER_KIND_BEFORE_AFTER : PLACEHOLDER_KIND_REGULAR);
      }
    };
    var resolvePlaceholderId = function (id, operator) {
      if (!placeholders[id])
        throw new Error('Unknown placeholder id `' + id + '`.');
      var checkKind = function (kind) {
        if (placeholders[id] !== kind)
          throw new Error('Operation is not defined for placeholder `' + id + '`.');
      };
      var regularPlaceholder = '<!--' + id + '-->', beforePlaceholder = '<!--before:' + id + '-->', afterPlaceholder = '<!--after:' + id + '-->';
      switch (operator) {
      case OPERATOR_REPLACE:
        checkKind(PLACEHOLDER_KIND_REGULAR);
        delete placeholders[id];
        return regularPlaceholder;
      case OPERATOR_INTO:
        checkKind(PLACEHOLDER_KIND_REGULAR);
        return regularPlaceholder;
      case OPERATOR_BEFORE:
        checkKind(PLACEHOLDER_KIND_BEFORE_AFTER);
        return beforePlaceholder;
      case OPERATOR_AFTER:
        checkKind(PLACEHOLDER_KIND_BEFORE_AFTER);
        return afterPlaceholder;
      case OPERATOR_TO_APPEND:
      case OPERATOR_TO_PREPEND:
        return placeholders[id] === PLACEHOLDER_KIND_REGULAR ? regularPlaceholder : operator === OPERATOR_TO_APPEND ? afterPlaceholder : beforePlaceholder;
      }
      throw new Error('Assertion error. Unkown operator: `' + operator + '`');
    };
    var configuredTemplate = initialMarkup;
    registerPlaceholdersInMarkup(configuredTemplate);
    var replacePlaceholder = function (placeholder, id, markup, replacementProducer) {
      if (id)
        registerPlaceholder(id, PLACEHOLDER_KIND_BEFORE_AFTER);
      registerPlaceholdersInMarkup(markup);
      var replacementMarkup = id ? resolvePlaceholderId(id, OPERATOR_BEFORE) + markup + resolvePlaceholderId(id, OPERATOR_AFTER) : markup;
      var replacement = replacementProducer(placeholder, replacementMarkup);
      configuredTemplate = configuredTemplate.replace(placeholder, replacement);
    };
    /**
     * @param {number} operator
     * @param {function(string,string)=} replacementProducer
     * @returns {Function}
     */
    var createPlaceholderReplacementOperation = function (operator, replacementProducer) {
      replacementProducer = replacementProducer || function (p, m) {
        return m + p;
      };
      return function (placeholderId) {
        var placeholder = resolvePlaceholderId(placeholderId, operator);
        return {
          insert: function (idOrMarkup, markup) {
            var id = markup ? idOrMarkup : null;
            markup = markup ? markup : idOrMarkup;
            replacePlaceholder(placeholder, markup ? id : null, markup, replacementProducer);
          }
        };
      };
    };
    this.into = createPlaceholderReplacementOperation(OPERATOR_INTO);
    this.before = createPlaceholderReplacementOperation(OPERATOR_BEFORE);
    this.after = createPlaceholderReplacementOperation(OPERATOR_AFTER, function (p, m) {
      return p + m;
    });
    this.replace = function (placeholderId) {
      return {
        with: createPlaceholderReplacementOperation(OPERATOR_REPLACE, function (p, m) {
          return m;
        })(placeholderId).insert
      };
    };
    this.to = function (placeholderId) {
      return {
        append: createPlaceholderReplacementOperation(OPERATOR_TO_APPEND)(placeholderId).insert,
        prepend: createPlaceholderReplacementOperation(OPERATOR_TO_PREPEND, function (p, m) {
          return p + m;
        })(placeholderId).insert
      };
    };
    this.build = function () {
      return configuredTemplate.replace(PLACEHOLDER_MARKUP_PATTERN, '');
    };
  }
  return GridTemplate;
}();
text = {
  load: function (id) {
    throw new Error('Dynamic load not allowed: ' + id);
  }
};
text_ko_grid_columnshtmltemplate = '<colgroup class="ko-grid-colgroup">\n    <col class="ko-grid-col" data-bind="indexedRepeat: { forEach: columns.displayed, indexedBy: \'id\', as: \'column\' }" data-repeat-bind="__gridColumn: column()">\n</colgroup>';

ko_grid_columns = function (ko, js, columnsTemplate) {
  var TO_STRING_VALUE_RENDERER = function (cellValue) {
    return cellValue === null ? '' : '' + cellValue;
  };
  var columns = {
    init: function (template) {
      template.replace('columns').with(columnsTemplate);
    },
    Constructor: function (bindingValue, gridConfig, grid) {
      function createColumn(columnSpec) {
        var column = new Column(grid, gridConfig, columnSpec);
        if (gridConfig['columnInitializer'])
          gridConfig['columnInitializer'](column);
        return column;
      }
      var disposables = [];
      this.all = ko.observableArray(bindingValue['columns'].map(createColumn));
      this['all'] = this.all;
      this.byId = function (id) {
        var column = this.tryById(id);
        if (!column)
          throw new Error('The column id `' + id + '` is undefined.');
        return column;
      }.bind(this);
      this['byId'] = this.byId;
      this.tryById = function (id) {
        var candidates = this.all().filter(function (c) {
          return c.id === id;
        });
        if (candidates.length > 1)
          throw new Error('Assertion error: Multiple columns with id `' + id + '`.');
        return candidates[0];
      }.bind(this);
      this['tryById'] = this.tryById;
      var displayedColumns = ko.observable(this.all().filter(function (c) {
        return c.__visible;
      }));
      this.displayed = function () {
        return displayedColumns();
      };
      this['displayed'] = this.displayed;
      this.show = function (column) {
        this.showOnlyThoseWhich(function (c) {
          return c.__visible || c === column;
        });
      }.bind(this);
      this.hide = function (column) {
        this.showOnlyThoseWhich(function (c) {
          return c.__visible && c !== column;
        });
      }.bind(this);
      this['show'] = this.show;
      this['hide'] = this.hide;
      this.reorder = function (columns) {
        var source = this.all().slice();
        var destination = [];
        columns.forEach(function (column) {
          var index = source.indexOf(column);
          source.splice(index, 1);
          destination.push(column);
        });
        if (source.length)
          throw new Error('The new column order must contain all columns.');
        this.all(destination);
        this.showOnlyThoseWhich(function (c) {
          return c.__visible;
        });
      }.bind(this);
      this['reorder'] = this.reorder;
      this.showOnlyThoseWhich = function (predicate) {
        var allColumns = this.all();
        var columnsToBeDisplayed = allColumns.filter(predicate);
        allColumns.forEach(function (c) {
          c.__visible = false;
        });
        columnsToBeDisplayed.forEach(function (c) {
          c.__visible = true;
        });
        displayedColumns(columnsToBeDisplayed);
      }.bind(this);
      this['showOnlyThoseWhich'] = this.showOnlyThoseWhich;
      this.combinedWidth = ko.pureComputed(function () {
        var sum = 0;
        var displayed = this.displayed();
        for (var i = 0; i < displayed.length; ++i)
          sum += displayed[i].widthInPixels();
        return sum;
      }.bind(this));
      this['combinedWidth'] = this.combinedWidth;
      this.add = function (column) {
        var viewModel = createColumn({
          userDefined: false,
          'id': '$' + column.id,
          'label': column.label,
          'hidden': column.hidden || false,
          'width': column.width
        });
        this.all.unshift(viewModel);
        this.showOnlyThoseWhich(function (c) {
          return c.__visible;
        });
        return viewModel;
      }.bind(this);
      this['add'] = this.add;
      this._dispose = function () {
        disposables.forEach(function (disposable) {
          disposable.dispose();
        });
      };
    }
  };
  ko.bindingHandlers['__gridColumn'] = {
    'init': function () {
    },
    'update': function (element, valueAccessor) {
      var column = valueAccessor();
      element.style.width = column.width();
    }
  };
  /** @constructor */
  function Column(grid, gridConfig, column) {
    this.id = column['id'];
    this['id'] = this.id;
    this.property = column['property'] || this.id;
    this['property'] = this.property;
    this.userDefined = column.userDefined !== false;
    this['userDefined'] = this.userDefined;
    this.__visible = !column['hidden'];
    this.visible = function () {
      return this.__visible;
    }.bind(this);
    this['visible'] = this['visible'];
    this.label = ko.observable(column['label']);
    this['label'] = this.label;
    this.width = ko.observable(column['width']);
    this['width'] = this.width;
    this.widthInPixels = function () {
      var w = this.width();
      if (w.substr(-2) !== 'px')
        throw new Error('The only currently supported column width values are absolute pixel lengths.');
      return parseInt(w.substring(0, w.length - 2), 10);
    }.bind(this);
    this['widthInPixels'] = this.widthInPixels;
    this.headerClasses = ko.observableArray(column['headerClasses'] || column['classes'] || []);
    this.cellClasses = ko.observableArray(column['cellClasses'] || column['classes'] || []);
    this.footerClasses = ko.observableArray(column['footerClasses'] || column['classes'] || []);
    this['headerClasses'] = this.headerClasses;
    this['cellClasses'] = this.cellClasses;
    this['footerClasses'] = this.footerClasses;
    this.metadata = gridConfig['columnMetadataSupplier'] ? gridConfig['columnMetadataSupplier'](grid.bindingValue, column) : {};
    this['metadata'] = this.metadata;
    this.renderValue = gridConfig['cellValueRenderer'] ? gridConfig['cellValueRenderer'].bind(undefined, this) : TO_STRING_VALUE_RENDERER;
    this['renderValue'] = this.renderValue;
    this.overrideValueRendering = function (override) {
      this.renderValue = override(this.renderValue);
    }.bind(this);
    this.overrideValueBinding = function (override) {
      var overridden = this._overrideValueBinding(override, {
        init: this._initCell,
        update: this._updateCell
      });
      if (!overridden || !overridden.init || !overridden.update)
        throw new Error('The cell value binding must define an `init` as well as an `update` method.');
      this._initCell = overridden.init;
      this._updateCell = overridden.update;
    }.bind(this);
    this._overrideValueBinding = function (override, current) {
      var overridden = override(js.objects.extend({
        init: current.init,
        update: current.update
      }, {
        'init': current.init,
        'update': current.update
      }));
      return {
        init: overridden.init || overridden['init'],
        update: overridden.update || overridden['update']
      };
    };
    this['overrideValueRendering'] = this.overrideValueRendering;
    this['overrideValueBinding'] = this.overrideValueBinding;
  }
  return columns;
}(knockout, onefold_js, text_ko_grid_columnshtmltemplate);
text_ko_grid_datahtmltemplate = '<tbody class="ko-grid-tbody" data-bind="_gridWidth: columns.combinedWidth() + \'px\'">\n    <tr class="ko-grid-tr ko-grid-row"\n        data-bind="indexedRepeat: {\n            forEach: data.rows.displayed,\n            indexedBy: function(r) { return grid.data.observableValueSelector(ko.unwrap(r[grid.primaryKey])); },\n            as: \'row\',\n            at: \'rowIndex\',\n            beforeElementRecycling: data.rows.__handleElementRecycling,\n            afterElementRecycled: data.rows.__handleElementRecycled,\n            allowDeviation: true,\n            onDeviation: data.rows.__handleDisplayedRowsDeviate,\n            onSynchronization: data.rows.__handleDisplayedRowsSynchronized }"\n        data-repeat-bind="__gridRow: { classify: grid.data.rows.__classify, row: row, index: rowIndex }">\n\n        <td data-bind="indexedRepeat: { forEach: columns.displayed, indexedBy: \'id\', as: \'column\', allowElementRecycling: false }"\n            data-repeat-bind="__gridCell: { row: row, column: column }"></td>\n    </tr>\n</tbody>';

ko_grid_data = function (ko, js, stringifyable, ApplicationEventDispatcher, dataTemplate) {
  var TEXT_NODE = window.Node.TEXT_NODE;
  var ELEMENT_NODE = window.Node.ELEMENT_NODE;
  var HIJACKED_KEY = '__@__hijacked';
  var document = window.document;
  var data = {
    init: function (template) {
      template.replace('body').with('body', dataTemplate);
      template.to('table').prepend(['<div class="ko-grid-load-indicator" data-bind="style: { display: data.rows.__dirty() ? \'block\' : \'none\' }">Loading&hellip;</div>'].join(''));
    },
    Constructor: function (bindingValue, config, grid) {
      var disposeCallbacks = [];
      /** @type {de.benshu.ko.dataSource.DataSource<?, ?, ?>} */
      this.source = bindingValue['dataSource'];
      this.valueSelector = bindingValue['valueSelector'] || config['valueSelector'] || function (p) {
        return p;
      };
      this['valueSelector'] = this.valueSelector;
      this.observableValueSelector = bindingValue['observableValueSelector'] || config['observableValueSelector'] || this.valueSelector;
      this['observableValueSelector'] = this.observableValueSelector;
      this.predicates = ko.observableArray(bindingValue.filters || []);
      this['predicates'] = this.predicates;
      this.predicate = ko.pureComputed(function () {
        return stringifyable.predicates.and(this.predicates().map(ko.unwrap));
      }.bind(this));
      this['predicate'] = this.predicate;
      this.comparator = ko.observable(stringifyable.comparators.indifferent);
      this['comparator'] = this.comparator;
      this.offset = ko.observable(0);
      this['offset'] = this.offset;
      this.limit = ko.observable(Number.POSITIVE_INFINITY);
      this['limit'] = this.limit;
      var view = this.source.openView(function (q) {
        return q.filteredBy(this.predicate).sortedBy(this.comparator).offsetBy(this.offset).limitedTo(this.limit);
      }.bind(this));
      disposeCallbacks.push(view.dispose.bind(view));
      this.view = view;
      this['view'] = view;
      this._postApplyBindings = function () {
      };
      this.__postApplyBindings = function (callback) {
        var innerCallback = this._postApplyBindings;
        this._postApplyBindings = function () {
          callback(innerCallback);
        };
      }.bind(this);
      disposeCallbacks.push(initTbodyElement.call(this, grid));
      disposeCallbacks.push(initRows.call(this));
      disposeCallbacks.push(initEventDispatching.call(this));
      disposeCallbacks.push(initElementLookup.call(this, grid));
      this._dispose = function () {
        disposeCallbacks.forEach(function (callback) {
          callback();
        });
      };
    }
  };
  function initTbodyElement(grid) {
    this.__postApplyBindings(function (inner) {
      inner();
      this.__tbodyElement = grid.element.querySelector('.ko-grid-tbody');
    }.bind(this));
    return function () {
      this.__tbodyElement = null;
    }.bind(this);
  }
  function initRows() {
    var disposables = [];
    var rows = {};
    this.rows = rows;
    this['rows'] = rows;
    rows.displayed = ko.observableArray([]);
    rows['displayed'] = rows.displayed;
    rows.displayedSynchronized = ko.observable(false).extend({ notify: 'always' });
    rows['displayedSynchronized'] = rows.displayedSynchronized;
    rows['__handleDisplayedRowsDeviate'] = function () {
      this.rows.displayedSynchronized(false);
    }.bind(this);
    rows['__handleDisplayedRowsSynchronized'] = function () {
      this.rows.displayedSynchronized(true);
    }.bind(this);
    var view = this.view;
    rows['__dirty'] = view.dirty;
    disposables.push(view.observables.subscribe(function (v) {
      rows.displayed(v);
    }));
    rows.displayed(view.observables());
    var classifiers = [];
    rows['__classify'] = function (row) {
      var classes = classifiers.map(function (c) {
        return c(row);
      });
      return Array.prototype.concat.apply([], classes);
    };
    rows.installClassifier = function (classifier) {
      classifiers.push(classifier);
    };
    rows['installClassifier'] = rows.installClassifier;
    return function () {
      disposables.forEach(function (disposable) {
        disposable.dispose();
      });
    };
  }
  function initEventDispatching() {
    var dispatchVia = function (dispatcher) {
      return function (event) {
        dispatcher.relativeToClosest('.ko-grid-cell').dispatch(event);
        return !event.defaultPrevented;
      };
    };
    var argumentsSupplier = function (event, cellElement) {
      var context = ko.contextFor(cellElement);
      var row = context['row']();
      var column = context['column']();
      var cell = row[column.property];
      return [
        event,
        cell,
        row,
        column
      ];
    };
    var onMouseDownDispatcher = new ApplicationEventDispatcher(argumentsSupplier);
    var onClickDispatcher = new ApplicationEventDispatcher(argumentsSupplier);
    var onDoubleClickDispatcher = new ApplicationEventDispatcher(argumentsSupplier);
    var onContextMenuDispatcher = new ApplicationEventDispatcher(argumentsSupplier);
    this.onCellMouseDown = onMouseDownDispatcher.registerHandler.bind(onMouseDownDispatcher);
    this.onCellClick = onClickDispatcher.registerHandler.bind(onClickDispatcher);
    this.onCellDoubleClick = onDoubleClickDispatcher.registerHandler.bind(onDoubleClickDispatcher);
    this.onCellContextMenu = onContextMenuDispatcher.registerHandler.bind(onContextMenuDispatcher);
    this['onCellMouseDown'] = this.onCellMouseDown;
    this['onCellClick'] = this.onCellClick;
    this['onCellDoubleClick'] = this.onCellDoubleClick;
    this['onCellContextMenu'] = this.onCellContextMenu;
    this.__postApplyBindings(function (inner) {
      inner();
      this.__tbodyElement.addEventListener('mousedown', dispatchVia(onMouseDownDispatcher));
      this.__tbodyElement.addEventListener('click', dispatchVia(onClickDispatcher));
      this.__tbodyElement.addEventListener('dblclick', dispatchVia(onDoubleClickDispatcher));
      this.__tbodyElement.addEventListener('contextmenu', dispatchVia(onContextMenuDispatcher));
    }.bind(this));
    return function () {
    };
  }
  function initElementLookup(grid) {
    var nthRowElement = function (n) {
      var node = this.__tbodyElement.querySelector('tr.ko-grid-row:nth-child(' + (n + 1) + ')');
      if (!node)
        throw new Error('Row `' + n + '` does not exist.');
      return node;
    }.bind(this);
    var nthCellOfRow = function (row, n) {
      var node = row.children[n];
      if (!node)
        throw new Error('Column `' + n + '` does not exist.');
      return node;
    };
    var hijackCount = 0;
    var hijacks = {};
    this.rows['__handleElementRecycling'] = function (element, bindingContext) {
      withHijacksOfRowCells(bindingContext, element, function (hijack, cell, row, column) {
        hijack.suspend();
        initCellElement(cell, row, column);
      });
    };
    this.rows['__handleElementRecycled'] = function (element, bindingContext) {
      withHijacksOfRowCells(bindingContext, element, function (hijack, cell, row, column) {
        hijack.resume(row, cell);
        initCellElement(cell, row, column);
        // TODO This update might have dependencies that won't get tracked.. (same below)
        updateCellElement(cell, row, column);
      });
    };
    function withHijacksOfRowCells(bindingContext, rowElement, action) {
      var row = bindingContext['row']();
      withHijacksOfRow(row, function (hijack) {
        var column = hijack.column;
        var columnIndex = grid.columns.displayed().indexOf(column);
        var cell = rowElement.children[columnIndex];
        action(hijack, cell, row, column);
      });
    }
    var withHijacksOfRow = function (row, action) {
      if (!hijackCount)
        return;
      var rowId = this.observableValueSelector(ko.unwrap(row[grid.primaryKey]));
      if (js.objects.hasOwn(hijacks, rowId))
        hijacks[rowId].forEach(action);
    }.bind(this);
    this.__withHijackOfCell = function (bindingContext, action) {
      var row = bindingContext['row']();
      var column = bindingContext['column']();
      withHijacksOfRow(row, function (hijack) {
        if (hijack.column === column)
          action(hijack);
      });
    };
    this.lookupCell = function (row, column) {
      var rowId = this.observableValueSelector(ko.unwrap(row[grid.primaryKey]));
      // TODO The closure compiler will transform a plain tryFirstIndexOf call. Why?
      var rowIndex = this.rows.displayed()['tryFirstIndexOf'](row);
      var columnIndex = grid.columns.displayed().indexOf(column);
      var element = nthCellOfRow(nthRowElement(rowIndex), columnIndex);
      function hijackCell(override) {
        if (element[HIJACKED_KEY])
          throw new Error('Illegal state: This cell is already hijacked.');
        var binding = column._overrideValueBinding(override, {
          init: column._initCell || defaultInit,
          update: column._updateCell || defaultUpdate
        });
        var hijack = element[HIJACKED_KEY] = new Hijack(element, row, column, binding);
        var rowHijacks = hijacks[rowId] = hijacks[rowId] || [];
        rowHijacks.push(hijack);
        ++hijackCount;
        initCellElement(element, row, column);
        updateCellElement(element, row, column);
        function release() {
          if (rowHijacks.length === 1)
            delete hijacks[rowId];
          else
            rowHijacks.splice(rowHijacks.indexOf(hijack), 1);
          --hijackCount;
          if (!hijack.suspended) {
            var e = hijack.element, r = hijack.row, c = hijack.column;
            hijack.suspend();
            initCellElement(e, r, c);
            // TODO This update might have dependencies that won't get tracked.. (same above)
            updateCellElement(e, r, c);
          }
        }
        return js.objects.extend({
          release: release,
          dispose: release
        }, {
          'dispose': release,
          'release': release
        });
      }
      return js.objects.extend({
        element: element,
        hijack: hijackCell
      }, {
        'element': element,
        'hijack': hijackCell
      });
    }.bind(this);
    this['lookupCell'] = this.lookupCell;
    return function () {
    };
  }
  /** @constructor */
  function Hijack(element, row, column, binding) {
    this.element = element;
    this.row = row;
    this.column = column;
    this.init = binding.init;
    this.update = binding.update;
  }
  Hijack.prototype = {
    get suspended() {
      return this.element === null;
    },
    resume: function (row, element) {
      this.element = element;
      this.row = row;
      element[HIJACKED_KEY] = this;
    },
    suspend: function () {
      this.element[HIJACKED_KEY] = null;
      this.element = null;
    }
  };
  ko.bindingHandlers['__gridRow'] = {
    'init': function () {
    },
    'update': function (element, valueAccessor) {
      var value = valueAccessor();
      var classify = value['classify'];
      var row = value['row']();
      var index = value['index']();
      var coreClasses = index % 2 === 1 ? [
        'ko-grid-tr',
        'ko-grid-row',
        'alternate'
      ] : [
        'ko-grid-tr',
        'ko-grid-row'
      ];
      var additionalClasses = classify(row);
      var distinctClasses = coreClasses.concat(additionalClasses);
      element.className = distinctClasses.join(' ');
    }
  };
  ko.bindingHandlers['__gridCell'] = {
    'init': function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var value = valueAccessor(), row = value['row'], column = value['column'];
      bindingContext['grid'].data.__withHijackOfCell(bindingContext, function (hijack) {
        return hijack.resume(row(), element);
      });
      initCellElement(element, row, column());
      return { 'controlsDescendantBindings': true };
    },
    'update': function (element, valueAccessor) {
      var value = valueAccessor();
      var row = value['row']();
      var column = value['column'].peek();
      // can't change anyways => peek to keep dependency count low
      updateCellElement(element, row, column);
    }
  };
  function initCellElement(element, row, column) {
    var hijacked = element[HIJACKED_KEY];
    while (element.firstChild)
      ko.removeNode(element.firstChild);
    var init = hijacked && hijacked.init || column._initCell || defaultInit;
    init(element, row, column);
  }
  function updateCellElement(element, row, column) {
    var cell = row[column.property];
    var hijacked = element[HIJACKED_KEY];
    // TODO since there may be thousands of cells we want to keep the dependency count at two (row+cell) => peek => need separate change handler for cellClasses
    // TODO should setting the className be moved to init?
    var columnClasses = column.cellClasses.peek().join(' ');
    element.className = 'ko-grid-td ko-grid-cell ' + columnClasses;
    var update = hijacked && hijacked.update || column._updateCell || defaultUpdate;
    update(element, cell, row, column);
  }
  function defaultInit(element) {
    element.insertBefore(document.createTextNode(''), element.firstChild);
  }
  function defaultUpdate(element, cell, row, column) {
    var child = element.firstChild;
    while (child.nodeType !== TEXT_NODE)
      child = child.nextSibling;
    child.nodeValue = column.renderValue(ko.unwrap(cell));
  }
  return data;
}(knockout, onefold_js, stringifyable, ko_grid_application_event_dispatcher, text_ko_grid_datahtmltemplate);
text_ko_grid_headershtmltemplate = '<thead class="ko-grid-thead" data-bind="_gridWidth: columns.combinedWidth() + \'px\'">\n    <!--before:headers-->\n    <tr class="ko-grid-tr ko-grid-headers"\n        data-bind="indexedRepeat: { forEach: headers.__rows, indexedBy: \'__rowId\', as: \'headerRow\' }"\n        data-repeat-bind="click: headers.__handleClick">\n\n        <th class="ko-grid-th"\n            data-bind="indexedRepeat: { forEach: headerRow(), indexedBy: \'id\', as: \'header\' }"\n            data-repeat-bind="__gridHeader: header"></th>\n    </tr>\n    <!--after:headers-->\n</thead>';

ko_grid_headers = function (ko, js, ApplicationEventDispatcher, headersTemplate) {
  var document = window.document, Node = window.Node;
  function columnHeaderId(column) {
    return 'column-header-' + column.id;
  }
  var fallbackIdCounter = 0;
  function columnGroupHeaderId(columnGroup) {
    var id = columnGroup.id || '@__' + ++fallbackIdCounter;
    return 'column-group-header-' + id;
  }
  var headers = {
    init: function (template) {
      template.replace('head').with(headersTemplate);
    },
    Constructor: function (bindingValue, config, grid) {
      var invertedColumnGroups = invertColumnGroups(bindingValue['columnGroups'] || []);
      var columnGroupHeaders = {};
      var columnHeaders = {};
      var rows = [];
      this.__rows = ko.computed(function () {
        var displayedColumns = grid.columns.displayed();
        var maxDepth = 0;
        displayedColumns.forEach(function (column) {
          var group = invertedColumnGroups[column.id];
          maxDepth = Math.max(maxDepth, group ? group.depth + group.overallHeight : 0);
        });
        rows.length = maxDepth + 1;
        for (var i = 0; i < rows.length; ++i) {
          rows[i] = rows[i] || ko.observableArray();
          rows[i]['__rowId'] = 'header-row-' + i;
          rows[i].valueWillMutate();
          rows[i]().length = 0;
        }
        var open = [];
        displayedColumns.forEach(function (column) {
          var group = invertedColumnGroups[column.id];
          var depth = group ? group.depth + group.height : 0;
          open.length = depth;
          var header = reuseExisting(columnHeaders, new ColumnHeader(column));
          header.__reset(maxDepth - depth + 1);
          rows[depth]().push(header);
          var newColumnGroupHeaders = increaseColumnSpanOfOpenOrOpenNewColumnGroupHeaders(group, open, column);
          for (var j = 0; j < newColumnGroupHeaders.length; ++j) {
            if (newColumnGroupHeaders[j])
              rows[j]().push(newColumnGroupHeaders[j]);
          }
        });
        rows.forEach(function (row) {
          row.valueHasMutated();
        });
        return rows;
      });
      this['__rows'] = this.__rows;
      this.all = ko.computed(function () {
        var result = [];
        this.__rows().forEach(function (row) {
          Array.prototype.push.apply(result, row());
        });
        return result;
      }.bind(this));
      this['all'] = this.all;
      this.forColumn = function (column) {
        var id = columnHeaderId(column);
        if (!Object.prototype.hasOwnProperty.call(columnHeaders, id))
          throw new Error('There is no header for the given column.');
        return columnHeaders[id];
      };
      this['forColumn'] = this.forColumn;
      var onClickDispatcher = new ApplicationEventDispatcher(function (event, headerElement) {
        return [
          event,
          ko.contextFor(headerElement)['header']()
        ];
      });
      this['__handleClick'] = function (_, event) {
        onClickDispatcher.relativeToClosest('.ko-grid-column-header, .ko-grid-column-group-header').dispatch(event);
        return !event.defaultPrevented;
      };
      this.onHeaderClick = onClickDispatcher.registerHandler.bind(onClickDispatcher);
      this.onColumnHeaderClick = function (selectorOrHandler, handler) {
        var selectorSpecified = arguments.length > 1;
        handler = selectorSpecified ? handler : selectorOrHandler;
        var wrappedHandler = function (event, header) {
          if (header instanceof ColumnHeader)
            handler.apply(this, arguments);
        };
        onClickDispatcher.registerHandler.apply(onClickDispatcher, selectorSpecified ? [
          selectorOrHandler,
          wrappedHandler
        ] : [wrappedHandler]);
      };
      this['onHeaderClick'] = this.onHeaderClick;
      this['onColumnHeaderClick'] = this.onColumnHeaderClick;
      this._dispose = function () {
        this.__rows.dispose();
        this.all.dispose();
      }.bind(this);
      function increaseColumnSpanOfOpenOrOpenNewColumnGroupHeaders(group, open, column) {
        if (!group)
          return [];
        if (open[group.depth] && open[group.depth]._columnGroup === group)
          return increaseColumnSpanOfOpenColumnGroupHeaders(group, open, column);
        open.length = group.depth;
        var result = increaseColumnSpanOfOpenOrOpenNewColumnGroupHeaders(group.containingGroup, open, column);
        result[group.depth] = open[group.depth] = openNewColumnGroupHeader(group, column);
        return result;
      }
      function increaseColumnSpanOfOpenColumnGroupHeaders(group, open, column) {
        var containingGroup = group;
        do {
          var g = open[containingGroup.depth];
          g.columns.push(column);
          g.columnSpan(g.columnSpan() + 1);
          containingGroup = containingGroup.containingGroup;
        } while (containingGroup);
        return [];
      }
      function openNewColumnGroupHeader(group, column) {
        var columnGroupHeader = reuseExisting(columnGroupHeaders, new ColumnGroupHeader(group));
        columnGroupHeader.__reset(column);
        return columnGroupHeader;
      }
      function reuseExisting(pool, newInstance) {
        var id = newInstance.id;
        var pooledInstance = pool[id] = pool[id] || newInstance;
        return pooledInstance;
      }
    }
  };
  /** @constructor */
  function ColumnHeader(column) {
    this.id = columnHeaderId(column);
    this['id'] = this.id;
    this.element = ko.observable(null);
    this['element'] = this.element;
    this.rowSpan = ko.observable(1);
    this['rowSpan'] = this.rowSpan;
    this.columnSpan = ko.observable(1);
    this['columnSpan'] = this.columnSpan;
    this.label = column.label;
    this['label'] = this.label;
    this.column = column;
    this['column'] = this.column;
    this.columns = [column];
    this['columns'] = this.columns;
    this.__reset = function (rowSpan) {
      this.rowSpan(rowSpan);
    }.bind(this);
  }
  /** @constructor */
  function ColumnGroupHeader(columnGroup) {
    this.id = columnGroupHeaderId(columnGroup);
    this['id'] = this.id;
    this.element = ko.observable(null);
    this['element'] = this.element;
    this._columnGroup = columnGroup;
    this.rowSpan = ko.observable(columnGroup.height);
    this['rowSpan'] = this.rowSpan;
    this.columnSpan = ko.observable(1);
    this['columnSpan'] = this.columnSpan;
    this.label = ko.observable(columnGroup.label);
    this['label'] = this.label;
    this.columns = [];
    this['columns'] = this.columns;
    this.__reset = function (column) {
      this.columns = [column];
      this.columnSpan(1);
    }.bind(this);
  }
  function invertColumnGroups(columnGroups) {
    var result = {};
    function addTableEntries(invertedColumnGroup) {
      invertedColumnGroup.columnIds.forEach(function (id) {
        var columnGroup = result[id];
        if (!columnGroup)
          result[id] = invertedColumnGroup;
        else if (columnGroup !== invertedColumnGroup)
          throw new Error('Column `' + id + '` is element of column group `' + columnGroup.label + '` as well as `' + invertedColumnGroup.label + '`.');
      });
      if (invertedColumnGroup.containingGroup)
        addTableEntries(invertedColumnGroup.containingGroup);
    }
    js.arrays.flatMap(columnGroups, invertColumnGroup.bind(this, null)).forEach(function (g) {
      addTableEntries(g);
    });
    return result;
  }
  function invertColumnGroup(containingGroup, columnGroup) {
    var overallHeight = calculateOverallColumnGroupHeight(columnGroup);
    var subgroups = columnGroup.elements.filter(function (g) {
      return typeof g !== 'string';
    });
    var columnIds = columnGroup.elements.filter(function (g) {
      return typeof g === 'string';
    });
    var inverted = {
      id: columnGroup.id,
      label: columnGroup.label,
      containingGroup: containingGroup,
      depth: containingGroup ? containingGroup.depth + 1 : 0,
      height: containingGroup ? containingGroup.overallHeight - overallHeight : 1,
      overallHeight: overallHeight,
      columnIds: columnIds
    };
    return subgroups.length ? js.arrays.flatMap(subgroups, invertColumnGroup.bind(this, inverted)) : inverted;
  }
  function calculateOverallColumnGroupHeight(columnGroup) {
    var subgroups = columnGroup.elements.filter(function (g) {
      return typeof g !== 'string';
    });
    return 1 + Math.max.apply(Math, [0].concat(subgroups.map(calculateOverallColumnGroupHeight)));
  }
  ko.bindingHandlers['__gridHeader'] = {
    'init': function (element, valueAccessor) {
      var header = valueAccessor()();
      header.element(element);
      ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        header.element(null);
      });
      element.insertBefore(document.createTextNode(''), element.firstChild);
      return { 'controlsDescendantBindings': true };
    },
    'update': function (element, valueAccessor) {
      var header = valueAccessor()();
      var id = header.id.replace(/[\s]/g, '_');
      if (header.column) {
        element.className = 'ko-grid-th ko-grid-column-header ' + id + ' ' + header.column.headerClasses().join(' ');
      } else {
        element.className = 'ko-grid-th ko-grid-column-group-header ' + id;
      }
      var width = header.columns.map(function (c) {
        return c.widthInPixels();
      }).reduce(function (a, b) {
        return a + b;
      }) + 'px';
      element.style.width = width;
      element.style.maxWidth = width;
      element.rowSpan = header.rowSpan();
      element.colSpan = header.columnSpan();
      var child = element.firstChild;
      while (child.nodeType !== Node.TEXT_NODE)
        child = child.nextSibling;
      child.nodeValue = header.label();
    }
  };
  return headers;
}(knockout, onefold_js, ko_grid_application_event_dispatcher, text_ko_grid_headershtmltemplate);

ko_grid_layout = function (ko) {
  var document = window.document;
  var layout = {
    init: function () {
    },
    Constructor: function (bindingValue, config, grid) {
      var recalculating = ko.observable(false);
      var recalculate = function (configuration) {
        if (configuration)
          configuration();
      };
      this.recalculate = function (configuration) {
        recalculate(configuration);
      };
      this['recalculate'] = this.recalculate;
      var recalculateTrigger = ko.computed(function () {
        if (recalculating())
          return;
        grid.columns.displayed().forEach(function (c) {
          c.width();
        });
        recalculate();
      });
      var beforeRelayoutHandlers = [];
      var afterRelayoutHandlers = [];
      this.beforeRelayout = function (handler) {
        beforeRelayoutHandlers.push(handler);
      };
      this.afterRelayout = function (handler) {
        afterRelayoutHandlers.push(handler);
      };
      this['beforeRelayout'] = this.beforeRelayout;
      this['afterRelayout'] = this.afterRelayout;
      this._postApplyBindings = function () {
        initScolling.call(this, grid);
        recalculate = createLayoutRecalculator(grid, recalculating, beforeRelayoutHandlers, afterRelayoutHandlers);
        grid.postApplyBindings(recalculate);
      }.bind(this);
      // TODO let caller specify cell type (header cell vs. data cell vs. footer cell as well as other classes)
      this.determineCellDimensions = function (content) {
        var cell = document.createElement('div');
        cell.className = 'ko-grid-td ko-grid-cell';
        cell.appendChild(typeof content === 'string' ? document.createTextNode(content) : content);
        cell.style.position = 'absolute';
        cell.style.visibility = 'hidden';
        document.body.appendChild(cell);
        try {
          return {
            width: cell.offsetWidth,
            height: cell.offsetHeight
          };
        } finally {
          document.body.removeChild(cell);
        }
      };
      this['determineCellDimensions'] = this.determineCellDimensions;
      this._dispose = function () {
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
      var offset = -scroller.scrollLeft + 'px';
      thead.style.left = offset;
      tfoot.style.left = offset;
    });
  };
  var createLayoutRecalculator = function (grid, recalculating, beforeRelayoutHandlers, afterRelayoutHandlers) {
    var gridElement = grid.element;
    var spacer = gridElement.querySelector('.ko-grid-table-scroller-padding');
    var scroller = gridElement.querySelector('.ko-grid-table-scroller');
    var thead = gridElement.querySelector('.ko-grid-thead');
    var tfoot = gridElement.querySelector('.ko-grid-tfoot');
    var updateHeaderHeight = function (h) {
      spacer.style.borderTopWidth = Math.max(h, 0) + 'px';
    };
    var updateFooterHeight = function (h) {
      spacer.style.borderBottomWidth = Math.max(h, 0) + 'px';
    };
    var recalculationInProgress = false;
    return function (configuration) {
      if (recalculationInProgress)
        return;
      try {
        recalculating(recalculationInProgress = true);
        // TODO try for a nicer solution
        var scrollLeftBeforeRecalculation = scroller.scrollLeft;
        if (configuration)
          configuration();
        beforeRelayoutHandlers.forEach(function (h) {
          h.call(gridElement);
        });
        withElementLayedOut(gridElement, function () {
          updateHeaderHeight(thead.clientHeight);
          updateFooterHeight(tfoot.clientHeight);
        });
        scroller.scrollLeft = scrollLeftBeforeRecalculation;
        afterRelayoutHandlers.forEach(function (h) {
          h.call(gridElement);
        });
      } finally {
        recalculating(false);
        recalculationInProgress = false;
      }
    };
  };
  function withElementLayedOut(element, action) {
    // This is a quick check to see if the element is layed out.
    if (element.offsetWidth && element.offsetHeight)
      return action();
    var parent = element.parentNode;
    var placeholder = document.createComment('placeholder');
    parent.replaceChild(placeholder, element);
    var positionBackup = element.style.position;
    element.style.position = 'absolute';
    element.style.visibility = 'hidden';
    document.body.appendChild(element);
    try {
      return action();
    } finally {
      parent.replaceChild(element, placeholder);
      element.style.position = positionBackup;
      element.style.visibility = 'visible';
    }
  }
  return layout;
}(knockout);

ko_grid_core = function (ko, columns, data, headers, layout) {
  var grid = ko.bindingHandlers['grid'] = ko.bindingHandlers['grid'] || {};
  var core = grid['core'] = grid['core'] || {
    'columns': columns,
    'data': data,
    'headers': headers,
    'layout': layout
  };
  return core;
}(knockout, ko_grid_columns, ko_grid_data, ko_grid_headers, ko_grid_layout);

ko_grid_extensions = function (ko, js) {
  var grid = ko.bindingHandlers['grid'] = ko.bindingHandlers['grid'] || {};
  var extensions = grid['extensions'] = grid['extensions'] || {};
  function registerExtension(extensionId, extension) {
    if (js.objects.hasOwn(extensions, extensionId))
      throw new Error('Extension id or alias already in use: `' + extensionId + '`.');
    extensions[extensionId] = extension;
    extension.__knownAliases.push(extensionId);
    return extension;
  }
  function lookUpExtension(extensionId) {
    if (!js.objects.hasOwn(extensions, extensionId))
      throw new Error('No known extension id or alias: `' + extensionId + '`.');
    return extensions[extensionId];
  }
  grid['defineExtension'] = grid.defineExtension = function (name, spec) {
    return registerExtension(name, new GridExtension(name, spec));
  };
  grid.lookUpExtension = lookUpExtension;
  grid['declareExtensionAlias'] = grid.declareExtensionAlias = function (alias, alreadyKnownAlias) {
    return registerExtension(alias, grid.lookUpExtension(alreadyKnownAlias));
  };
  grid['declareExtensionAliases'] = grid.declareExtensionAliases = function (aliases, alreadyKnownAlias) {
    var extension = grid.lookUpExtension(alreadyKnownAlias);
    aliases.forEach(function (a) {
      return registerExtension(a, extension);
    });
    return extension;
  };
  /** @constructor */
  function GridExtension(primaryName, spec) {
    this.primaryName = primaryName;
    this.dependencies = spec['dependencies'] || spec.dependencies || [];
    this.initializer = spec['initializer'] || spec.initializer || function () {
    };
    this.Constructor = spec['Constructor'] || spec.Constructor;
    this.__knownAliases = [];
  }
  GridExtension.prototype = {
    get knownAliases() {
      return this.__knownAliases.slice();
    },
    extractConfiguration: function (configurations, configName) {
      var usedAlias = this.__determineUsedAlias(configurations, function (presentAliases) {
        throw new Error('Conflicting configurations ' + presentAliases.map(function (c) {
          return '`' + c + '`';
        }).join(', ') + ' (configuration: `' + configName + '`).');
      });
      if (!usedAlias)
        throw new Error('The extension `' + this.primaryName + '` must be configured (configuration: `' + configName + '`)');
      return configurations[usedAlias];
    },
    tryExtractBindingValue: function (bindingValues) {
      var usedAlias = this.__determineUsedAlias(bindingValues, function (presentAliases) {
        throw new Error('Conflicting binding values ' + presentAliases.map(function (c) {
          return '`' + c + '`';
        }).join(', ') + '.');
      });
      return bindingValues[usedAlias];
    },
    __determineUsedAlias: function (object, dieDueToAmbiguity) {
      var presentAliases = this.__knownAliases.filter(function (a) {
        return js.objects.hasOwn(object, a);
      });
      if (presentAliases.length > 1)
        dieDueToAmbiguity(presentAliases);
      return presentAliases[0];
    }
  };
  return extensions;
}(knockout, onefold_js);
text_ko_grid_gridhtmltemplate = '<div class="ko-grid">\n    <!--before:grid-->\n    <div class="ko-grid-table-container">\n        <!--before:table-->\n        <div class="ko-grid-table-scroller-padding">\n            <div class="ko-grid-table-scroller">\n                <table class="ko-grid-table" data-bind="_gridWidth: columns.combinedWidth() + \'px\'">\n                    <!--columns-->\n                    <!--head-->\n                    <tfoot class="ko-grid-tfoot" data-bind="_gridWidth: columns.combinedWidth() + \'px\'"><!--tfoot--></tfoot>\n                    <!--body-->\n                </table>\n            </div>\n        </div>\n        <!--after:table-->\n    </div>\n    <!--after:grid-->\n</div>';

ko_grid_binding = function (req, ko, js, ApplicationEventDispatcher) {
  var require = req;
  var document = window.document;
  var koGrid = ko.bindingHandlers['grid'] = ko.bindingHandlers['grid'] || {};
  var core = ko_grid_core;
  var extensions = ko_grid_extensions;
  var GridTemplate = ko_grid_template;
  var tableTemplate = text_ko_grid_gridhtmltemplate;
  var coreComponentNames = [
    'columns',
    'headers',
    'data',
    'layout'
  ];
  var coreComponents = coreComponentNames.map(function (n) {
    return core[n];
  });
  var templateEngine = new ko.nativeTemplateEngine();
  templateEngine.addTemplate = function (templateName, templateMarkup) {
    var template = document.createElement('script');
    template.id = templateName;
    template.type = 'text/html';
    template.text = templateMarkup;
    document.querySelector('head').appendChild(template);
  };
  /** @constructor */
  function Grid(rootElement, bindingValue) {
    this.bindingValue = bindingValue;
    this.primaryKey = bindingValue['primaryKey'];
    this['primaryKey'] = this.primaryKey;
    this.rootElement = rootElement;
    this['rootElement'] = rootElement;
    this.element = null;
    this['element'] = null;
    this._dispose = function () {
    };
    this.__postApplyBindings = function () {
    };
    this.postApplyBindings = function (callback) {
      if (!this.__postApplyBindings)
        throw new Error('Illegal state: postApplyBindings-callbacks have been called already.');
      var innerCallback = this.__postApplyBindings;
      this.__postApplyBindings = function () {
        innerCallback();
        callback();
      };
    }.bind(this);
    this['postApplyBindings'] = this.postApplyBindings;
    var onKeyDownDispatcher = new ApplicationEventDispatcher();
    this.onKeyDown = onKeyDownDispatcher.registerHandler.bind(onKeyDownDispatcher);
    this['onKeyDown '] = this.onKeyDown;
    rootElement.addEventListener('keydown', function (e) {
      onKeyDownDispatcher.relativeToClosest('.ko-grid').dispatch(e);
      return !e.defaultPrevented;
    });
  }
  ko.bindingHandlers['grid']['init'] = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    var bindingValue = valueAccessor();
    var configName = bindingValue['config'];
    loadConfig(configName, function (config, templateName, extensionLoadOrder) {
      var disposeCallbacks = [];
      var grid = new Grid(element, bindingValue);
      ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        grid._dispose();
        disposeCallbacks.forEach(function (callback) {
          callback();
        });
      });
      js.objects.forEachProperty(core, function (componentName, component) {
        var instance = new component.Constructor(bindingValue, config, grid);
        grid[componentName] = instance;
        grid.columns = grid['columns'];
        grid.headers = grid['headers'];
        grid.data = grid['data'];
        grid.layout = grid['layout'];
        if (typeof instance._dispose === 'function')
          disposeCallbacks.push(instance._dispose.bind(instance));
      });
      var extensionConfigs = config['extensions'];
      var extensionBindingValues = bindingValue['extensions'] || {};
      var gridExtensions = grid['extensions'] = grid.extensions = {};
      extensionLoadOrder.forEach(function (extensionName) {
        var extension = koGrid.lookUpExtension(extensionName);
        var extensionBindingValue = extension.tryExtractBindingValue(extensionBindingValues) || {};
        var extensionConfig = apply(extension.extractConfiguration(extensionConfigs, configName), extensionBindingValue, bindingValue);
        if (extensionConfig['enabled'] === false && extensionBindingValue['enabled'] !== true || extensionBindingValue['enabled'] === false)
          return;
        extension.dependencies.forEach(function (dependency) {
          if (!gridExtensions[dependency])
            throw new Error('Dependency \'' + dependency + '\' was disabled.');
        });
        var instance = new extension.Constructor(extensionBindingValue, extensionConfig, grid, bindingValue, config);
        extension.knownAliases.forEach(function (alias) {
          gridExtensions[alias] = instance;
        });
        if (typeof instance.dispose === 'function')
          disposeCallbacks.push(instance.dispose.bind(instance));
      });
      while (element.firstChild)
        ko.removeNode(element.firstChild);
      var gridContext = bindingContext.createChildContext(grid, 'grid');
      ko.renderTemplate(templateName, gridContext, { 'templateEngine': templateEngine }, element);
      var gridElement = element.querySelector('.ko-grid');
      grid.element = gridElement;
      grid['element'] = gridElement;
      js.objects.forEachProperty(extensionConfigs, function (extensionName) {
        gridElement.className += ' with-' + js.strings.convertCamelToHyphenCase(extensionName);
      });
      coreComponentNames.forEach(function (n) {
        if (grid[n]._postApplyBindings)
          grid[n]._postApplyBindings();
      });
      grid.__postApplyBindings();
      grid.__postApplyBindings = null;
    });
    /**
     * @param {...*} config
     * @return {?}
     */
    function apply(config) {
      return typeof config === 'function' ? config.apply(undefined, Array.prototype.slice.call(arguments, 1)) : config;
    }
    return { 'controlsDescendantBindings': true };
  };
  ko.bindingHandlers['grid']['update'] = function () {
  };
  // TODO extract into own file
  var loadedConfigs = {};
  var loadConfig = function (configName, handler) {
    function callHandler() {
      var loadedConfig = loadedConfigs[configName];
      handler(loadedConfig.config, loadedConfig.templateName, loadedConfig.extensionLoadOrder);
    }
    if (loadedConfigs[configName])
      return callHandler();
    req([configName], function (config) {
      var template = new GridTemplate(tableTemplate);
      coreComponents.forEach(function (component) {
        component.init(template, config);
      });
      var extensionConfigs = config['extensions'] || {};
      var loadedExtensions = [];
      var loadingExtensions = [];
      var loadExtension = function (extensionName) {
        var extension = koGrid.lookUpExtension(extensionName);
        var primaryExtensionName = extension.primaryName;
        var extensionConfig = extension.extractConfiguration(extensionConfigs, configName);
        if (js.arrays.contains(loadedExtensions, primaryExtensionName))
          return;
        if (js.arrays.contains(loadingExtensions, primaryExtensionName))
          throw new Error('Dependency cycle: .. -> ' + loadingExtensions.join(' -> ') + ' -> ' + primaryExtensionName + ' -> ..');
        loadingExtensions.push(primaryExtensionName);
        extension.dependencies.forEach(loadExtension);
        extension.initializer(template, extensionConfig, config);
        loadedExtensions.push(loadingExtensions.pop());
      };
      Object.keys(extensionConfigs).forEach(loadExtension);
      var templateName = 'ko-grid-template-' + configName;
      templateEngine.addTemplate(templateName, template.build());
      loadedConfigs[configName] = {
        config: config,
        templateName: templateName,
        extensionLoadOrder: loadedExtensions
      };
      callHandler();
    });
  };
  ko.bindingHandlers['_gridWidth'] = {
    'init': function () {
    },
    'update': function (element, valueAccessor) {
      var w = valueAccessor();
      element.style.width = w;
      element.style.maxWidth = w;
    }
  };
  return koGrid;
}(req, knockout, onefold_js, ko_grid_application_event_dispatcher);
ko_grid = function (main) {
  return main;
}(ko_grid_binding);return ko_grid;
});