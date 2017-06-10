function save() {
    var success = false;

    // Get name input value
    var name_value = $('#name').val().split(" ");

    if (name_value.length !== 2) {
        alert('Не правильно указана имя и фамилия');
        return false
    }


    // Values
    var first_name = name_value[0];
    var second_name = name_value[1];
    var email = $('#email').val();
    var phone_number = $('#phone').val();
    var parent_phone_number = $('#parent_phone').val();

    // Dict for request
    var request_data = {
        'first_name': first_name,
        'last_name': second_name,
        'email': email,
        'phone_number': phone_number,
        'parent_phone_number': parent_phone_number
    };


    // password = db.Column(db.String(255))
    // active = db.Column(db.Boolean())
    // confirmed_at = db.Column(db.DateTime())
    // roles = db.relationship('Role', secondary = roles_users,
    //     backref = db.backref('users', lazy = 'dynamic'))
    //
    // surname = db.Column(db.String(40))
    // organization = db.Column(db.String(40))
    // email_verified = db.Column(db.Boolean())
    //
    // city = db.Column(db.String(40))
    //
    // birthday = db.Column(db.String(10))
    // health_issues = db.Column(db.Text())
    //
    // programming_languages = db.Column(db.Text())
    // experience = db.Column(db.Text())
    //
    // education_name = db.Column(db.String(40))
    // education_years = db.Column(db.Integer())
    // subscribed_to_email = db.Column(db.Boolean())
    // position = db.String(70)


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
