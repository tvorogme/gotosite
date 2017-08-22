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
        url: '../profile/edit/',
        data: request_data,
        dataType: 'json'
    }).done(function (data) {
        if (console && console.log) {
            console.log(data)
        }
    });

    window.location.reload();
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

    autosize(document.getElementsByClassName("description"));

    $('input, textarea').click(function () {
        $("#save_ico").css('display', 'block');
    });

});

function del_social(social) {
    $.ajax({
        type: "POST",
        url: "../profile/edit/",
        data: {
            provider: social,
            csrfmiddlewaretoken: $("#profile_page_csrf_token").val()
        },
        dataType: 'json'
    });
    window.location.reload();
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

    var request_data = {
        'education': {
            'city': city,
            'education_type': parseInt(education_type)
        },
        "csrfmiddlewaretoken": $("#profile_page_csrf_token").val()
    };

    if (education_type === "1") {
        var school_name = $("#add_education_school_name").val();
        var specialization = $("#add_education_school_specialization").val();
        var school_out_year = $("#education_field_school_out_year").val();

        request_data['education']['name'] = school_name;
        request_data['education']['specialization'] = specialization;
        request_data['education']['out_year'] = parseInt(school_out_year);
    }

    else if (education_type === "0") {
        var vuz_name = $("#add_education_vuz_name").val();
        var fac_name = $("#add_education_fac_name").val();
        var who_am_i = $("#add_education_vuz_type_pribivanie").val();
        var vuz_out_year = $("#add_education_vuz_year_out").val();

        request_data['education']['name'] = vuz_name;
        request_data['education']['faculty'] = fac_name;
        request_data['education']['role'] = who_am_i;
        request_data['education']['out_year'] = parseInt(vuz_out_year);
    }

    request_data['education'] = JSON.stringify(request_data['education']);

    $.ajax({
        type: "POST",
        url: '../profile/edit/',
        data: request_data,
        dataType: 'json'
    }).done(function (data) {
        if (console && console.log) {
            console.log(data)
        }
    });

    window.location.reload();
}

function remove_education(_id) {
    $.ajax({
        type: "POST",
        url: '../profile/remove_education/',
        data: {"education_id": _id, "csrfmiddlewaretoken": $("#profile_page_csrf_token").val()},
        dataType: 'json'
    });
    window.location.reload();
}

function add_achievement() {
    $("#add_achievement").css('display', 'block');
    $("#add_achievement_button").css('display', 'none')
}

function add_project() {
    $("#add_project").css('display', 'block');
    $("#add_projects_button").css('display', 'none')
}

function add_achievement_final_step() {
    var title = $("#add_achievement_title").val();
    var year = $("#add_achievement_date").val();
    var link = $("#add_achievement_url").val();
    var description = $("#add_achievement_description").val();

    var request_data = {
        'title': title,
        'year': year,
        'link': link,
        'description': description,
        "csrfmiddlewaretoken": $("#profile_page_csrf_token").val()
    };

    $.ajax({
        type: "POST",
        url: '../profile/add_achievement/',
        data: request_data,
        dataType: 'json'
    });
    window.location.reload();
}

function remove_achievement(_id) {
    $.ajax({
        type: "POST",
        url: '../profile/remove_achievement/',
        data: {"achievement_id": _id, "csrfmiddlewaretoken": $("#profile_page_csrf_token").val()},
        dataType: 'json'
    });
    window.location.reload();
}


function remove_project(_id) {
    $.ajax({
        type: "POST",
        url: '../profile/remove_project/',
        data: {"project_id": _id, "csrfmiddlewaretoken": $("#profile_page_csrf_token").val()},
        dataType: 'json'
    });
    window.location.reload();
}

function add_project_final_step() {
    var title = $("#add_project_title").val();
    var link = $("#add_project_url").val();
    var description = $("#add_project_description").val();

    var request_data = {
        'title': title,
        'link': link,
        'description': description,
        "csrfmiddlewaretoken": $("#profile_page_csrf_token").val()
    };

    $.ajax({
        type: "POST",
        url: '../profile/add_achievement/',
        data: request_data,
        dataType: 'json'
    });
    window.location.reload();
}