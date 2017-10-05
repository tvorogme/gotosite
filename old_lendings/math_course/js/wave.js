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
    $(".right").css("height",$(".left").height());
    $("#wave_canvas").css("width", $("#if_you").width());
    $("#wave_canvas").css("height", $("#if_you").height());

    var c = document.getElementById("wave_canvas");
    c.width = $("#if_you").width();
    c.height = $("#if_you").height();
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#ec8b6d";
    ctx.lineWidth = 1;
    var default_x = c.width / 2;
    var default_y = c.height / 2;

    $(window).resize(function () {
        $("#wave_canvas").css("width", $("#if_you").width());
        $("#wave_canvas").css("height", $("#if_you").height());
        c.width = $("#if_you").width();
        c.height = $("#if_you").height();
        default_x = c.width / 2;
        default_y = c.height / 2;
    });

    position = {
        "x": default_x,
        "y": default_y
    };

    setInterval(function () {

        if ($("body").width() != 1050) {
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.beginPath();
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
                ctx.bezierCurveTo(c.width / 2, 0, position["x"], position["y"], c.width / 2, c.height);

            } else {
                now_animation = TweenLite.to(position, 1, {
                    "x": default_x,
                    "y": default_y,
                    ease: SlowMo.ease.config(0.7, 0.7, false)
                });
                ctx.bezierCurveTo(c.width / 2, 0, position["x"], position["y"], c.width / 2, c.height);
            }


            ctx.lineTo(c.width, c.height);
            ctx.lineTo(c.width, 0);
            ctx.lineTo(c.width / 2, 0);
            ctx.closePath();

            ctx.lineWidth = 5;
            ctx.fillStyle = '#ec8b6d';
            ctx.fill();
            ctx.strokeStyle = '#ec8b6d';
            ctx.stroke();
        }
        // else {
        //     ctx.clearRect(0, 0, c.width, c.height);
        //     ctx.beginPath();
        //     now_delta = default_y - cursorY;
        //     if ($("#if_you").is(":hover") && now_delta < 200 && now_delta > -200) {
        //         if (now_animation) {
        //             now_animation.kill();
        //         }
        //         now_animation = TweenLite.to(position, 1, {
        //             "x": cursorX,
        //             "y": cursorY,
        //             ease: SlowMo.ease.config(0.7, 0.7, false)
        //         });
        //         ctx.bezierCurveTo(0, c.height / 2, position["x"], position["y"], c.width, c.height / 2);
        //
        //     } else {
        //         now_animation = TweenLite.to(position, 1, {
        //             "x": default_x,
        //             "y": default_y,
        //             ease: SlowMo.ease.config(0.7, 0.7, false)
        //         });
        //         ctx.bezierCurveTo(0, c.height / 2, position["x"], position["y"], c.width, c.height / 2);
        //     }
        //
        //
        //     ctx.lineTo(c.width, c.height);
        //     ctx.lineTo(0, c.height);
        //     ctx.lineTo(0, c.height / 2);
        //     ctx.closePath();
        //
        //     ctx.lineWidth = 5;
        //     ctx.fillStyle = '#ec8b6d';
        //     ctx.fill();
        //     ctx.strokeStyle = '#ec8b6d';
        //     ctx.stroke();
        // }
    }, 50);
});



