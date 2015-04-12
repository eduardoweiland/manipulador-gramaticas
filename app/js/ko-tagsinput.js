define(['knockout', 'jquery', 'bootstrap-tagsinput'], function(ko, $) {
    'use strict';

    ko.bindingHandlers.tagsinput = {
        init: function(element) {
            $(element).tagsinput({
                // TODO: binding para configurar isso
                confirmKeys: [13, 32, 44, 124]
            });
            $(element).next('.bootstrap-tagsinput').find('input')
                .focus(function() {
                    $(this).parent().addClass('focus');
                })
                .blur(function() {
                    $(this).parent().removeClass('focus');
                });
        },
        update: function(element, valueAccessor, allBindings) {
            var $el = $(element);
            if ($el.is('select')) {
                var opts = ko.unwrap(allBindings.get('selectedOptions'));
                $el.tagsinput('removeAll');

                for (var i = 0, l = opts.length; i < l; ++i) {
                    $el.tagsinput('add', opts[i]);
                }
            }
        }
    };    
});
