define(['knockout'], function(ko) {
    'use strict';

    /**
     * Símbolo utilizado para representar a sentença vazia.
     * @const
     */
    var EPSILON = String.fromCharCode(0x3B5);

    /**
     * Símbolo para separar o lado esquerdo do lado direito no formalismo.
     * @const
     */
    var ARROW = String.fromCharCode(0x279C);

    /**
     * Representação de uma única regra de produção dentro de uma gramática.
     *
     * @class
     */
    function ProductionRule() {
        this.init.apply(this, arguments);
    }

    ProductionRule.prototype = {

        /**
         * @constructs
         *
         * @param {Grammar} grammar Gramática à qual a regra de produção pertence.
         */
        init: function(grammar) {
            this.grammar = grammar;

            this.leftSide  = ko.observable('');
            this.rightSide = ko.observableArray([]);
        },

        /**
         * Adiciona a sentenca vazia na lista de possíveis produções da regra.
         */
        addEmptySentence: function() {
            this.rightSide.push(EPSILON);
        },

        /**
         * Gera a representação do formalismo desta regra.
         */
        toFormalismString: function() {
            var l = this.leftSide(),
                r = this.rightSide().join(' | ');

            if (l && r) {
                return l + ' ' + ARROW + ' ' + r;
            }

            return '';
        },

        /**
         * Verifica se a definição da regra de produção está completa (todas as informações inseridas).
         *
         * @return boolean Se a regra de produção está completamente definida.
         */
        isCompleted: function() {
            return ((this.leftSide().length > 0) && (this.rightSide().length > 0));
        },

        // TODO: doc
        isUnrestricted: function() {
            // TODO
        },

        // TODO: doc
        isContextSensitive: function() {
            // TODO
        },

        // TODO: doc
        isContextFree: function() {
            // TODO
        },

        // TODO: doc
        isRegular: function() {
            // Lado esquerdo deve ser um e apenas um não terminal
            if (this.grammar.nonTerminalSymbols().indexOf(this.leftSide()) === -1) {
                return false;
            }

            // Lado direito pode ser um terminal ou um terminal seguido de um não terminal
            var right = this.rightSide();
            for (var i = 0, l = right.length; i < l; ++i) {
                if (this.grammar.terminalSymbols().indexOf(right[i]) === -1) {
                    // TODO: verificar se pode ser um terminal seguido de não terminal
                    return false;
                }
            }

            return true;
        }

    };

    return ProductionRule;
});
