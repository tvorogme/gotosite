/**
 * Created by tvorogme on 6/10/17.
 */

function update_autocomplete(needed) {
    if (needed) {
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
    } else {
        $(needed).on("keydown", function (event) {
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
    }

}

var current_input_field_number = 0;

function add_input_field() {
    var html = function (_id) {
        // FIXME: Find batter way to do it
        return '<div id="skill_wrapper" class="col-3"><input class="after_name skill" id="new_skill_' + _id + '" placeholder="Скилл" type="text"></div>'
    };

    current_input_field_number += 1;

    $("#add_wrapper").before(html(current_input_field_number));
    update_autocomplete("#new_skill_" + current_input_field_number);
    console.log(html(current_input_field_number));
}

$(update_autocomplete());