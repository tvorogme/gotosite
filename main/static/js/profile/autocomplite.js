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
                    $.getJSON("../api/get_needed_skills", {
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
                $.getJSON("../api/get_needed_skills", {
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

function add_autocomplite_city(field) {
    field.on("keydown", function (event) {
        if (event.keyCode === $.ui.keyCode.TAB &&
            $(this).autocomplete("instance").menu.active) {
            event.preventDefault();
        }
    }).autocomplete({
        source: function (request, response) {
            $.getJSON("../api/get_needed_cities", {
                city: request.term
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

add_autocomplite_city($('#city'));
add_autocomplite_city($('#add_education_field_city'));

function add_autocomplite_education_name(field, type) {
    field.on("keydown", function (event) {
        if (event.keyCode === $.ui.keyCode.TAB &&
            $(this).autocomplete("instance").menu.active) {
            event.preventDefault();
        }
    }).autocomplete({
        source: function (request, response) {
            $.getJSON("../api/get_needed_schools_names", {
                education_name: request.term,
                education_type: type
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

add_autocomplite_education_name($('#add_education_school_name'), 1);
add_autocomplite_education_name($('#add_education_vuz_name'), 0);

var current_input_field_number = 0;

function add_input_field() {
    var html = function (_id) {
        return '<div id="skill_wrapper" class="col-3"><input class="after_name skill" id="new_skill_' + _id + '" placeholder="Навык" type="text"></div>'
    };

    current_input_field_number += 1;

    $("#add_wrapper").before(html(current_input_field_number));
    update_autocomplete("#new_skill_" + current_input_field_number);

    $("#new_skill_" + current_input_field_number).focus();
    $("#save_ico").css('display', 'block');
}

$(update_autocomplete());