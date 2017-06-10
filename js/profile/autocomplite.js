/**
 * Created by tvorogme on 6/10/17.
 */

function update_autocomplete() {
    $('.skill').each(function (index) {
        var critbox = $(this).attr("id");


        $('#' + critbox).on("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
        }).autocomplete({
            source: function (request, response) {
                $.getJSON("/get_needed_skills", {
                    skill: request.term
                }, response);
            },
            focus: function () {
                return false;
            },
            select: function (event, ui) {
                this.value = ui.item.value;
                return false;
            }
        });
    });

}

var current_input_field_number = 0;

function add_input_field() {
    var html = function (_id) {
        return '<div id="skill_wrapper" class="col-3"><input class="after_name skill" id="new_skill_%s" placeholder="Скилл" type="text"></div>' % _id
    };

    current_input_field_number += 1;

    $("#add_wrapper").before(html(current_input_field_number));
}

$(update_autocomplete());