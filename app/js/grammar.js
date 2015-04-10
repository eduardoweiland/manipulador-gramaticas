define(['knockout'], function(ko) {
    'use strict';

    var GRAMMAR_SYMBOL = 'G';

    /**
     * @class Grammar
     */
    function Grammar() {
        this.init.apply(this, arguments);
    }

    /**
     * Retorna a intersecção entre os arrays `a` e `b`.
     *
     * @param {array} a
     * @param {array} b
     * @private
     */
    function arrayIntersection(a, b) {
        return a.filter(function(i) {
            return b.indexOf(i) > -1;
        });
    }

    Grammar.prototype = {

        /**
         * @constructor
         */
        init: function() {
            this.nonTerminalSymbols    = ko.observableArray([]);
            this.terminalSymbols       = ko.observableArray([]);
            this.productionSetSymbol   = ko.observable('');
            this.productionStartSymbol = ko.observable('');

            this.validationErrors = ko.pureComputed(this.validate, this);
            this.formalism = ko.pureComputed(this.toFormalismString, this);
        },

        /**
         * Verifica se a gramática é válida.
         *
         * @return {boolean} Se a gramática é válida ou não.
         */
        validate: function() {
            var err = [],
                nt  = this.nonTerminalSymbols(),
                t   = this.terminalSymbols(),
                p   = this.productionSetSymbol(),
                s   = this.productionStartSymbol();

            // 1. Símbolos terminais e não terminais precisam ser diferentes
            var intersect = arrayIntersection(nt, t);
            if (intersect.length > 0) {
                err.push('Existem símbolos não terminais repetidos entre os '
                        + 'símbolos terminais (' + intersect.join(', ') + ').');
            }

            // 2.1. Símbolo de início de produção deve ser não terminal
            if (nt.indexOf(s) === -1) {
                err.push('O símbolo de início de produção não está '
                        + 'entre os símbolos não terminais.');
            }

            // 2.2. Símbolo de início de produção NÃO deve ser terminal
            if (t.indexOf(s) > -1) {
                err.push('O símbolo de início de produção não pode '
                        + 'estar entre os símbolos terminais.');
            }

            // 3. Deve haver uma produção para o símbolo de início de produção
            // TODO

            // 4. Não deve existir mais de uma produção para o mesmo símbolo
            // TODO

            // Retorna a lista de erros de validação.
            return err;
        },

        /**
         * Monta a string que representa o formalismo da gramática, sem incluir
         * o conjunto de regras de produção.
         *
         * @return {string} A representação formal da gramática.
         * @notes Esse método assume que a gramática é válida.
         */
        toFormalismString: function() {
            var nt = this.nonTerminalSymbols().join(', '),
                t  = this.terminalSymbols()   .join(', '),
                p  = this.productionSetSymbol(),
                s  = this.productionStartSymbol();

            if (nt && t && p && s) {
                return GRAMMAR_SYMBOL + '({' + nt + '}, {' + t + '}, ' + p + ', ' + s + ')';
            }

            return '';
        }

    };    

    return Grammar;
});
