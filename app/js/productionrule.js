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

        /**
         * Verifica se a regra de produção obedece todas as restrições necessárias para pertencer a uma gramática do
         * tipo sensível ao contexto. Para isso, a regra deve obedecer a duas restrições:
         *
         *     * O lado esquerdo deve conter pelo menos um símbolo não terminal.
         *     * O lado direito não aceita a sentença vazia e seu comprimento deve ser maior ou igual ao lado esquerdo.
         *
         * @returns {Boolean} Se a regra obedece a todas as restrições do tipo sensível ao contexto.
         */
        isContextSensitive: function() {
            var left  = this.leftSide();
            var right = this.rightSide();
            var nt    = this.grammar.nonTerminalSymbols();

            // Lado esquerdo deve conter pelo menos um não terminal
            var found = false;
            for (var i = 0, l = nt.length; i < l; ++i) {
                if (left.indexOf(nt[i]) !== -1) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                return false;
            }

            // Lado direito não pode conter a sentença vazia e o comprimento deve ser maior ou igual ao lado esquerdo
            for (var i = 0, l = right.length; i < l; ++i) {
                if (right[i] === EPSILON || right[i].length < left.length) {
                    return false;
                }
            }

            return true;
        },

        /**
         * Verifica se a regra de produção obedece todas as restrições necessárias para pertencer a uma gramática do
         * tipo livre de contexto. Para isso, a regra deve obedecer a duas restrições:
         *
         *     * O lado esquerdo deve ser um e apenas um símbolo não terminal.
         *     * O lado direito não aceita a sentença vazia, mas aceita qualquer outro símbolo.
         *
         * @returns {Boolean} Se a regra obedece a todas as restrições do tipo livre de contexto.
         */
        isContextFree: function() {
            // Lado esquerdo deve ser um e apenas um não terminal
            if (this.grammar.nonTerminalSymbols().indexOf(this.leftSide()) === -1) {
                return false;
            }

            // Lado direito não pode conter a sentença vazia
            var right = this.rightSide();
            for (var i = 0, l = right.length; i < l; ++i) {
                if (right[i] === EPSILON) {
                    return false;
                }
            }

            return true;
        },

        /**
         * Verifica se a regra de produção obedece todas as restrições necessárias para pertencer a uma gramática do
         * tipo regular. Para isso, a regra deve obedecer a duas restrições:
         *
         *     * O lado esquerdo deve ser um e apenas um símbolo não terminal.
         *     * O lado direito pode ser apenas:
         *         * Um símbolo terminal
         *         * Um símbolo terminal seguido de um símbolo não terminal
         *         * Sentença vazia
         *
         * @returns {Boolean} Se a regra obedece a todas as restrições do tipo regular.
         */
        isRegular: function() {
            var right = this.rightSide();
            var nt    = this.grammar.nonTerminalSymbols();
            var t     = this.grammar.terminalSymbols();

            // Conjunto de todas as combinações de terminal + não terminal
            var tnt = [];
            for (var i = 0, lt = t.length; i < lt; ++i) {
                for (var j = 0, lnt = nt.length; j < lnt; ++j) {
                    tnt.push(t[i] + nt[j]);
                }
            }

            // Lado esquerdo deve ser um e apenas um não terminal
            if (nt.indexOf(this.leftSide()) === -1) {
                return false;
            }

            // Lado direito pode ser um terminal ou um terminal seguido de um não terminal
            for (var i = 0, l = right.length; i < l; ++i) {
                if (t.indexOf(right[i]) === -1 && tnt.indexOf(right[i]) === -1) {
                    return false;
                }
            }

            return true;
        }

    };

    return ProductionRule;
});
