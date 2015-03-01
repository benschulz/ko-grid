'use strict';

define(['onefold-js', 'onefold-dom'], function (js, dom) {
    function ApplicationEvent(originalEvent) {
        var applicationDefaultPrevented = originalEvent.defaultPrevented;

        js.objects.extend(this, originalEvent, {
            preventDefault: function () {
                applicationDefaultPrevented = true;
                return originalEvent.preventDefault();
            },
            preventApplicationButAllowBrowserDefault: function () {
                applicationDefaultPrevented = true;
            },
            get defaultPrevented() {
                return applicationDefaultPrevented;
            }
        });
    }

    function ApplicationEventHandler(handler, selector) {
        this.handler = handler;
        this.selector = selector;
    }

    return function ApplicationEventDispatcher(argumentsSupplier) {
        argumentsSupplier = argumentsSupplier || (event => [event]);

        var handlers = [];

        this.registerHandler = function (selectorOrHandler, handler) {
            var selector = arguments.length > 1 ? selectorOrHandler : undefined;
            handler = arguments.length > 1 ? handler : selectorOrHandler;

            handlers.push(new ApplicationEventHandler(handler, selector));
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
                var matches = Array.prototype.slice.call(root.querySelectorAll(selector))
                    .filter(match => dom.isOrContains(match, event.target));
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

            var applicableHandlers = handlersAndTheirMatches.filter(candidate => !!candidate.match);

            js.arrays.stableSort(applicableHandlers, (a, b) => b.depth - a.depth);

            applicableHandlers.forEach(function (h) {
                h.handler.apply(root, handlerArguments);
            });
        }
    };
});
