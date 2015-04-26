define(['knockout'], function(ko) {
    'use strict';

    function TransitionTable() {
        this.init.apply(this, arguments);
    }

    TransitionTable.prototype = {

        /**
         * @constructs
         */
        init: function() {
            this.symbols = ko.observableArray(['TEST1', 'TEST2', 'TEST3']);
            this.states  = ko.observableArray(['q0', 'q1']);
        },

        addState: function() {
            this.states.push('');
        },

        addSymbol: function() {
            this.symbols.push('');
        }

    };

    return TransitionTable;
});
