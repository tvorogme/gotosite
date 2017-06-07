/**
 * Created by tvorogme on 6/7/17.
 */


function save() {
    // Get name input value
    var name_value = $('#name').val().split(" ");

    if (name_value.length !== 2) {
        alert('Не правильно указана имя и фамилия');
        return false
    }

    var first_name = name_value[0];
    var second_name = name_value[1];

    var request_data = {
        'first_name': first_name,
        'last_name': second_name
    };


    // email = db.Column(db.String(40), unique = True)
    // password = db.Column(db.String(255))
    // active = db.Column(db.Boolean())
    // confirmed_at = db.Column(db.DateTime())
    // roles = db.relationship('Role', secondary = roles_users,
    //     backref = db.backref('users', lazy = 'dynamic'))
    //
    // surname = db.Column(db.String(40))
    // about = db.Column(db.Text())
    // organization = db.Column(db.String(40))
    // email_verified = db.Column(db.Boolean())
    //
    // city = db.Column(db.String(40))
    //
    // birthday = db.Column(db.String(10))
    // phone_number = db.Column(db.String(12))
    // parent_phone_number = db.Column(db.String(12))
    //
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
        data: request_data
    });
}


$(document).ready(function () {
    var displaied = false;

    $('input').click(function () {
        if (!displaied) {
            $("#save_ico").toggle();
            displaied = true;
        }
    });
});
