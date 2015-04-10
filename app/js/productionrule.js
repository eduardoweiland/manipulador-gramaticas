define(['knockout'], function(ko) {
    'use strict';

    function ProductionRule() {
        this.init.apply(this, arguments);
    }

    ProductionRule.prototype = {

        init: function() {
            this.leftSide  = ko.observable('');
            this.rightSide = ko.observableArray([]);
        },

        addEmptySentence: function() {
            this.rightSide.push('&epsilon;');
        }

    };

    return ProductionRule;
});
