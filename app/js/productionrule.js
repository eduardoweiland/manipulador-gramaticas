define(['knockout'], function(ko) {
    'use strict';

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
            this.rightSide.push('&epsilon;');
        }

    };

    return ProductionRule;
});
