define(['knockout', 'productionrule'], function(ko, ProductionRule) {
    'use strict';

    /**
     * Símbolo utilizado para representar a gramática no formalismo.
     *
     * @const
     */
    var GRAMMAR_SYMBOL = 'G';

    /**
     * Indentação utilizada para as regras de produção dentro do conjunto, na
     * representação do formalismo da gramática.
     *
     * @const
     */
    var INDENT = '    ';

    /**
     * Representação de uma gramática regular ou livre de contexto.
     *
     * @class
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
         * @constructs
         */
        init: function() {
            this.nonTerminalSymbols    = ko.observableArray([]);
            this.terminalSymbols       = ko.observableArray([]);
            this.productionSetSymbol   = ko.observable('');
            this.productionStartSymbol = ko.observable('');
            this.productionRules       = ko.observableArray([new ProductionRule()]);

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
            if (s && nt.indexOf(s) === -1) {
                err.push('O símbolo de início de produção não está '
                        + 'entre os símbolos não terminais.');
            }

            // 2.2. Símbolo de início de produção NÃO deve ser terminal
            if (s && t.indexOf(s) > -1) {
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
         * Monta a string que representa o formalismo da gramática, incluindo
         * o conjunto de regras de produção.
         *
         * @return {string} A representação formal da gramática.
         */
        toFormalismString: function() {
            var nt = this.nonTerminalSymbols().join(', '),
                t  = this.terminalSymbols()   .join(', '),
                p  = this.productionSetSymbol(),
                s  = this.productionStartSymbol(),
                pr = [];

            var rules = this.productionRules(), f;
            for (var i = 0, l = rules.length; i < l; ++i) {
                f = rules[i].toFormalismString();
                if (f) {
                    pr.push(INDENT + f);
                }
            }

            if (nt && t && p && s && pr.length) {
                return GRAMMAR_SYMBOL + ' = ({' + nt + '}, {' + t + '}, ' + p + ', ' + s + ')\n'
                        + 'P = {\n' + pr.join(',\n') + '\n}';
            }

            return '';
        },

        /**
         * Adiciona uma nova regra de produção à gramática.
         */
        addProductionRule: function() {
            this.productionRules.push(new ProductionRule());
        },

        /**
         * Remove uma regra anteriormente adicionada à gramática.
         *
         * @param {ProductionRule} rule Regra de produção para ser removida.
         */
        removeRule: function(rule) {
            var rules = this.productionRules();
            for (var i = 0, l = rules.length; i < l; ++i) {
                if (rule === rules[i]) {
                    this.productionRules.splice(i, 1);
                    break;
                }
            }
        }

    };    

    return Grammar;
});
