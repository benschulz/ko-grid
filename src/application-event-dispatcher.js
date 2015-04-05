'use strict';

define(['onefold-js', 'onefold-dom'], function (js, dom) {
    /** @constructor */
    function ApplicationEvent(originalEvent) {
        var commonProperties = ['altKey', 'bubbles', 'cancelable', 'ctrlKey', 'currentTarget', 'detail',
            'eventPhase', 'metaKey', 'relatedTarget', 'shiftKey', 'target', 'timeStamp', 'type', 'view',
            'which'];
        var typeProperties = {
            'key': ['char', 'charCode', 'key', 'keyCode'],
            'mouse': ['button', 'buttons', 'clientX', 'clientY', 'offsetX', 'offsetY', 'pageX', 'pageY',
                'screenX', 'screenY', 'toElement']
        };

        var properties = commonProperties
            .concat(typeProperties[originalEvent.type.substr(0, 3)] || [])
            .concat(typeProperties[originalEvent.type.substr(0, 5)] || []);

        this.__originalEvent = originalEvent;
        this.__applicationDefaultPrevented = originalEvent.defaultPrevented;

        properties.forEach(p => Object.defineProperty(this, p, {
            get: function () { return originalEvent[p]; }
        }));

        //function ApplicationEvent() {
        //    var applicationDefaultPrevented = originalEvent.defaultPrevented;
        //
        //    js.objects.extend(this, {
        //        preventDefault: function () {
        //            applicationDefaultPrevented = true;
        //            return originalEvent.preventDefault();
        //        },
        //        preventApplicationButAllowBrowserDefault: function () {
        //            applicationDefaultPrevented = true;
        //        },
        //        get defaultPrevented() {
        //            return applicationDefaultPrevented;
        //        }
        //    });
        //}
        //
        //// While this isn't great performance-wise, copying properties manually
        //// probably would not be either. Unless one wrote a special constructor
        //// per event type, perhaps.
        //ApplicationEvent.prototype = originalEvent;
        //
        //return new ApplicationEvent();
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
        get'defaultPrevented'() { return this.defaultPrevented; },
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
        argumentsSupplier = argumentsSupplier || (event => [event]);

        var handlers = [];

        this.registerHandler = function (selectorOrHandler, handler) {
            var selector = arguments.length > 1 ? selectorOrHandler : undefined;
            handler = arguments.length > 1 ? handler : selectorOrHandler;

            handlers.push(new ApplicationEventHandler(handler, selector));

            return {
                dispose: () => {
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
    }

    return ApplicationEventDispatcher;
})
;
