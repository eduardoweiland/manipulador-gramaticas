require(['knockout', 'jquery', 'grammar', 'ko-tagsinput', 'bootstrap-tagsinput'], function(ko, $, Grammar) {
    'use strict';

    // Carrega os plugins JavaScript do Bootstrap (usado para as abas)
    require(['../bower_components/bootstrap/dist/js/bootstrap.min.js']);

    $(function() {
        ko.applyBindings(new Grammar());

        $('.overlay').fadeOut();
    });
});
