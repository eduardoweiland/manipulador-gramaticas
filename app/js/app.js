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

        $('#clear').click(function() {
            window.location.reload(true);
        });

        $('#run').click(function() {
            var $run = $(this);
            $run.addClass('running').prop('disabled', true);

            // Começa a executar depois da animação do botão
            setTimeout(function() {
                setTimeout(function(){
                    /* aqui vai terminar de executar */
                    $run.removeClass('running').prop('disabled', false);
                }, 5000);
            }, 1000);
        });

        ko.applyBindings(new Grammar());

        setTimeout(function() {
            $('.overlay').fadeOut().then().remove();
        }, 1500);
    });
});

