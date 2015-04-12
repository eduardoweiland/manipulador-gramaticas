require(['knockout', 'jquery', 'grammar', 'ko-tagsinput', 'bootstrap-tagsinput'], function(ko, $, Grammar) {
    'use strict';

    $(function() {
        ko.applyBindings(new Grammar());

        $('.overlay').fadeOut();
    });
});
