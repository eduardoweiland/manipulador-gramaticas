require(['knockout', 'jquery', 'grammar', 'transitiontable', 'ko-tagsinput', 'bootstrap-tagsinput'], function(ko, $, Grammar, TransitionTable) {
    'use strict';

    // Carrega os plugins JavaScript do Bootstrap (usado para as abas)
    require(['libs/bootstrap/dist/js/bootstrap.min.js']);

    $(function() {
        ko.applyBindings(new Grammar(),         $('#manipulator').get(0));
        ko.applyBindings(new TransitionTable(), $('#recognizer') .get(0));

        $('.overlay').removeClass('in');
        setTimeout(function() {
            $('.container').addClass('in');
            $('.overlay').remove();
        }, 150);
    });
});
