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
    var phone_number = $('#phone').val();
    var parent_phone_number = $('#parent_phone').val();
    var birthday = $('#birthday').val();

    // Dict for request
    var request_data = {
        'first_name': first_name,
        'last_name': second_name,
        'surname': surname,
        'email': email,
        'phone_number': phone_number,
        'parent_phone_number': parent_phone_number,
        'birthday': birthday
    };

    $.ajax({
        type: "POST",
        url: '/profile/edit/',
        data: request_data,
        dataType: 'json'
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
    var displaied = false;

    autosize(document.getElementsByClassName("description"));

    $('input, textarea').click(function () {
        if (!displaied) {
            $("#save_ico").toggle();
            displaied = true;
        }
    });

});
