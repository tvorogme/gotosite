var login_placeholder_state = false;

function toggle_login_placeholder() {
    if (login_placeholder_state) {
        $(".bt-menu.bt-menu-open").animate({"background-color": "rgba(0, 0, 0, 0.3)"})
    } else {
        $(".bt-menu.bt-menu-open").animate({"background-color": "rgba(0, 0, 0, 0.9)"})
    }
    $("#login_placeholder_table").toggle();
    login_placeholder_state = !login_placeholder_state
}

function display_login_placeholder(n) {
    if (n === 2) {
        $("#login_placeholder_first_page").css('display', 'none');
        $("#login_placeholder_third_page").css('display', 'none');
        $("#login_placeholder_second_page").css('display', 'block');
    } else if (n === 1) {
        $("#login_placeholder_first_page").css('display', 'block');
        $("#login_placeholder_second_page").css('display', 'none');
        $("#login_placeholder_third_page").css('display', 'none');
    } else if (n === 3) {
        $("#login_placeholder_first_page").css('display', 'none');
        $("#login_placeholder_second_page").css('display', 'none');
        $("#login_placeholder_third_page").css('display', 'block');
    }
}

$("#login_placeholder_login_button").click(function () {
    var email = $("#login_placeholder_username").val();
    var password = $("#login_placeholder_password").val();
    var crf = $("#login_placeholder_crf").val();

    $.post("login/", {
        username: email,
        password: password,
        csrfmiddlewaretoken: crf
    }).done(function (data) {
        console.log(data);
        if (data === "ok") {
            location.reload();
        } else {
            $("#login_placeholder_error").html("Неверная почта или пароль.")
        }
    });
});