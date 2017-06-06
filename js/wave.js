/**
 * Created by xenx on 1/28/17.
 */
var cursorX = 0;
var cursorY = 0;
var now_delta = 0;

var position = true;
document.onmousemove = function getMousePos(e) {
    var rect = document.getElementById("wave_canvas").getBoundingClientRect();
    cursorX = e.clientX - rect.left;
    cursorY = e.clientY - rect.top;
};

var now_animation = false;
$(document).ready(function () {
    $(".right").css("height", $(".left").height());
    $("#wave_canvas").css("width", $("#if_you").width());

    var c_wave = document.getElementById("wave_canvas");
    c_wave.width = $("#if_you").width();
    c_wave.height = 430;
    var ctx_wave = c_wave.getContext("2d");
    ctx_wave.fillStyle = "#ec8b6d";
    ctx_wave.lineWidth = 1;
    var default_x = c_wave.width / 2;
    var default_y = c_wave.height / 2;

    $(window).resize(function () {
        $("#wave_canvas").css("width", $("#if_you").width());
        $("#wave_canvas").css("height", '430px');
        c_wave.width = $("#if_you").width();
        c_wave.height = 430;
        default_x = c_wave.width / 2;
        default_y = c_wave.height / 2;
    });

    position = {
        "x": default_x,
        "y": default_y
    };

    setInterval(function () {
        ctx_wave.clearRect(0, 0, c_wave.width, c_wave.height);

        ctx_wave.beginPath();
        ctx_wave.rect(0, 0, $("#if_you").width(), 430);
        ctx_wave.fillStyle = "rgb(67, 180, 152)";
        ctx_wave.fill();
        ctx_wave.closePath();

        ctx_wave.beginPath();
        now_delta = default_x - cursorX;
        if ($("#if_you").is(":hover") && now_delta < 200 && now_delta > -200) {
            if (now_animation) {
                now_animation.kill();
            }

            now_animation = TweenLite.to(position, 1, {
                "x": cursorX,
                "y": cursorY,
                ease: SlowMo.ease.config(0.7, 0.7, false)
            });
            ctx_wave.bezierCurveTo(c_wave.width / 2, 0, position["x"], position["y"], c_wave.width / 2, c_wave.height);

        } else {
            now_animation = TweenLite.to(position, 1, {
                "x": default_x,
                "y": default_y,
                ease: SlowMo.ease.config(0.7, 0.7, false)
            });
            ctx_wave.bezierCurveTo(c_wave.width / 2, 0, position["x"], position["y"], c_wave.width / 2, c_wave.height);
        }


        ctx_wave.lineTo(c_wave.width, c_wave.height);
        ctx_wave.lineTo(c_wave.width, 0);
        ctx_wave.lineTo(c_wave.width / 2, 0);
        ctx_wave.closePath();

        ctx_wave.lineWidth = 5;
        ctx_wave.fillStyle = '#ec8b6d';
        ctx_wave.fill();
        ctx_wave.strokeStyle = '#ec8b6d';
        ctx_wave.stroke();

    }, 50);
});



