function save() {
    var success = false;

    // Get name input value
    var name_value = $('#name').val().split(" ");

    if (name_value.length !== 2) {
        if (name_value.length !== 3) {
            alert('Не правильно указана имя и фамилия');
            return false
        }
    }


    // Values
    var first_name = name_value[1];
    var second_name = name_value[0];
    var surname = name_value[2];
    var email = $('#email').val();
    var birthday = $('#birthday').val();
    var city = $('#city').val();
    var phone = $('#phone').val();
    var parent_phone = $('#parent-phone').val();


    // Skills

    var all_skills = [];

    $('.skill').each(function (el) {
        all_skills.push([$(this).attr('skill_id'), $(this).val()]);
    });


    // Dict for request
    var request_data = {
        'first_name': first_name,
        'last_name': second_name,
        'middle_name': surname,

        'email': email,
        'birthday': birthday,
        'city': city,

        'phone_number': phone,
        'parent_phone_number': parent_phone,

        'skills': all_skills.join(", "),

        "csrfmiddlewaretoken": $("#profile_page_csrf_token").val()
    };

    $.ajax({
        type: "POST",
        url: '/profile/edit/',
        data: request_data,
        dataType: 'json'
    }).done(function (data) {
        if (console && console.log) {
            console.log(data)
        }
    });

    window.location.reload()
}

var project_edit = -1;

function edit_project(project_id) {
    if (project_edit !== project_id) {
        $("#project_" + project_id + " .field").toggle();
        $("#project_" + project_id + " .value").toggle();
        project_edit = project_id
    }
}

$(document).ready(function () {
    var displaied = false;

    autosize(document.getElementsByClassName("description"));

    $('input, textarea').click(function () {
        if (!displaied) {
            $("#save_ico").toggle();
            displaied = true;
        }
    });

});

function del_social(social) {
    $.ajax({
        type: "POST",
        url: "/profile/edit/",
        data: {
            provider: social,
            csrfmiddlewaretoken: $("#profile_page_csrf_token").val()
        },
        dataType: 'json'
    });
    window.location.reload()
}

$(document).ready(function () {
    $("select").click(function () {
        $(this).css("opacity", "1").css("font-weight", "300")
    });

    $(".add_education_field_out_date").click(function () {
        $(this).css("opacity", "1").css("font-weight", "300")
    });
});

function show_education_fields(aval) {
    if (aval === "1") {
        $("#vishee_obrazovanie").css("display", "none");
        $("#srednee_obrazovanie").css("display", "block")
    }
    else {
        $("#srednee_obrazovanie").css("display", "none");
        $("#vishee_obrazovanie").css("display", "block")
    }
}

function add_education() {
    $("#add_education_button_add").toggle();
    $(".add_education").toggle();
    $("#add_education_field_city").focus();
}

function save_education() {
    var city = $("#add_education_field_city").val();
    var education_type = $("#get_education_type").val();

    if (education_type === "1") {
        var school_name = $("#add_education_school_name").val();
        var specialization = $("#add_education_school_specialization").val();
        var out_year = $("#education_field_school_out_year").val();

        console.log(city, education_type, school_name, specialization, out_year);
    }

    else if (education_type === "2") {
        var vuz_name = $("#add_education_vuz_name").val();
        var fac_name = $("#add_education_fac_name").val();
        var who_am_i = $("#add_education_vuz_type_pribivanie").text();
        var out_year = $("#add_education_vuz_year_out").val();

        console.log(city, education_type, vuz_name, fac_name, who_am_i, out_year);
    }
}