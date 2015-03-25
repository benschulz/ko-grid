'use strict';

define([], function () {
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
        var checkValidPlaceholderId = id => {
            if (!PLACEHOLDER_ID_PATTERN.test(id)) throw new Error('Invalid placeholder id `' + id + '`');
        };
        var registerPlaceholder = (id, kind) => {
            checkValidPlaceholderId(id);
            if (placeholders[id]) throw new Error('Placeholder id `' + id + '` is already taken.');
            placeholders[id] = kind;
        };
        var registerPlaceholdersInMarkup = markup => {
            var match;
            while (!!(match = PLACEHOLDER_MARKUP_PATTERN.exec(markup))) {
                var beforeAfter = match[1], before = beforeAfter === 'before',
                    id = match[2];

                if (beforeAfter && (markup.match(new RegExp((before ? 'after' : 'before') + ':' + id, 'g')) || []).length !== 1)
                    throw new Error('Multiple or unmatched before-/after-placeholders for placeholder id `' + id + '`.');

                if (!beforeAfter || before)
                    registerPlaceholder(id, beforeAfter ? PLACEHOLDER_KIND_BEFORE_AFTER : PLACEHOLDER_KIND_REGULAR);
            }
        };
        var resolvePlaceholderId = (id, operator) => {
            if (!placeholders[id]) throw new Error('Unknown placeholder id `' + id + '`.');
            var checkKind = kind => {
                if (placeholders[id] !== kind) throw new Error('Operation is not defined for placeholder `' + id + '`.');
            };

            var regularPlaceholder = '<!--' + id + '-->',
                beforePlaceholder = '<!--before:' + id + '-->',
                afterPlaceholder = '<!--after:' + id + '-->';

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
                    return placeholders[id] === PLACEHOLDER_KIND_REGULAR
                        ? '<!--' + id + '-->'
                        : (operator === OPERATOR_TO_APPEND ? afterPlaceholder : beforePlaceholder);
            }
            throw new Error('Assertion error. Unkown operator: `' + operator + '`');
        };

        var configuredTemplate = initialMarkup;
        registerPlaceholdersInMarkup(configuredTemplate);

        var replacePlaceholder = (placeholder, id, markup, replacementProducer) => {
            if (id) registerPlaceholder(id, PLACEHOLDER_KIND_BEFORE_AFTER);
            registerPlaceholdersInMarkup(markup);
            var replacementMarkup = id ? resolvePlaceholderId(id, OPERATOR_BEFORE) + markup + resolvePlaceholderId(id, OPERATOR_AFTER) : markup;
            var replacement = replacementProducer(placeholder, replacementMarkup);
            configuredTemplate = configuredTemplate.replace(placeholder, replacement);
        };
        var createPlaceholderReplacementOperation = (operator, replacementProducer) => {
            replacementProducer = replacementProducer || ((p, m) => m + p);

            return placeholderId => {
                var placeholder = resolvePlaceholderId(placeholderId, operator);

                return {
                    insert: (idOrMarkup, markup) => {
                        var id = markup ? idOrMarkup : null;
                        markup = markup ? markup : idOrMarkup;
                        replacePlaceholder(placeholder, markup ? id : null, markup, replacementProducer);
                    }
                };
            };
        };

        this.into = createPlaceholderReplacementOperation(OPERATOR_INTO);
        this.before = createPlaceholderReplacementOperation(OPERATOR_BEFORE);
        this.after = createPlaceholderReplacementOperation(OPERATOR_AFTER, (p, m) => p + m);
        this.replace = placeholderId => {
            return {
                with: createPlaceholderReplacementOperation(OPERATOR_REPLACE, (p, m) => m)(placeholderId).insert
            };
        };
        this.to = placeholderId => {
            return {
                append: createPlaceholderReplacementOperation(OPERATOR_TO_APPEND)(placeholderId).insert,
                prepend: createPlaceholderReplacementOperation(OPERATOR_TO_PREPEND, (p, m) => p + m)(placeholderId).insert
            };
        };
        this.build = () => configuredTemplate.replace(PLACEHOLDER_MARKUP_PATTERN, '');
    }

    return GridTemplate;
});
