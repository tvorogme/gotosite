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