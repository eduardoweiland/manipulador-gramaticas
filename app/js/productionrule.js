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
         */
        init: function() {
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
        }

    };

    return ProductionRule;
});
