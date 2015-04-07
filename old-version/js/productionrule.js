(function($) {
    'use strict';

    function addEmptySentence() {
        
    }

    function removeRule(e) {
        $(e.target).closest('.production-rule').remove();
    }

    function ruleButtons() {
        var $group = $('<span/>').addClass('input-group-btn');

        $('<button/>')
            .addClass('btn btn-info')
            .attr('title', 'Sentença vazia')
            .html('<strong>&epsilon;</strong>')
            .click(addEmptySentence)
            .appendTo($group);

        $('<button/>')
            .addClass('btn btn-danger')
            .attr('title', 'Remover')
            .html('<i class="fa fa-remove"></i>')
            .click(removeRule)
            .appendTo($group);

        return $group;
    }

    function create() {
        var $div = $('<div/>').addClass('production-rule');
        $div.append('<input class="form-control left" type="text" name="production_set[][left]" />');
        $div.append('<div class="arrow text-center"><i class="fa fa-arrow-right"></i></div>');

        $('<div class="input-group right pull-right">')
            .append('<input class="form-control" type="text" name="production_set[][right]" />')
            .append(ruleButtons)
            .appendTo($div);

        return $div;
    }

})(jQuery);
