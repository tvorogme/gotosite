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