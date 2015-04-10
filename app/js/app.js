require(['knockout', 'jquery', 'grammar', 'bootstrap-tagsinput'], function(ko, $, Grammar) {
    'use strict';

    $(function() {
        $('.tags').tagsinput({
            confirmKeys: [13, 32, 44]
        });

        $('.bootstrap-tagsinput input')
            .focus(function() {
                $(this).parent().addClass('focus');
            })
            .blur(function() {
                $(this).parent().removeClass('focus');
            });

        ko.applyBindings(new Grammar());

        $('.overlay').fadeOut();
    });
});
