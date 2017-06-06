var step = 0;
var cool_clas = new Object();
var draw_interval;
cool_clas['main_r'] = 130;

$('#component-2').mouseenter(function () {
    if (locked_f === false) {
        TweenLite.to(cool_clas, 2, {
            main_r: 150,
            ease: Power4.easeOut
        });
    }
});
$('#want').mouseenter(function () {
    if (locked_f === false) {
        TweenLite.to(cool_clas, 2, {
            main_r: 150,
            ease: Power4.easeOut
        });
    }
});
$('#component-2').mouseout(function () {
    if (locked_f === false) {
        TweenLite.to(cool_clas, 2, {
            main_r: 130,
            ease: Power4.easeOut
        });
    }
});

$("#shariki").width($(document).width);
var c = document.getElementById("shariki");
var ctx = c.getContext("2d");
var locker = false;

function reset_coor() {
    cool_clas["line_helper"] = 0;
    cool_clas["x1"] = left_position + width / 2;
    cool_clas["y1"] = top_position + height / 2;
    cool_clas["r1"] = 130;

    cool_clas["x2"] = left_position + width / 2;
    cool_clas["y2"] = top_position + height / 2;
    cool_clas["r2"] = 130;

    cool_clas["x3"] = left_position + width / 2;
    cool_clas["y3"] = top_position + height / 2;
    cool_clas["r3"] = 130;


    cool_clas["x4"] = left_position + width / 2;
    cool_clas["y4"] = top_position + height / 2;
    cool_clas["r4"] = 130;

    cool_clas["x5"] = left_position + width / 2;
    cool_clas["y5"] = top_position + height / 2;
    cool_clas["r5"] = 130;


    cool_clas["x6"] = left_position + width / 2;
    cool_clas["y6"] = top_position + height / 2;
    cool_clas["r6"] = 130;
}

function hide_buttons() {
    $("#but1").css('z-index', '-200');
    $("#but2").css('z-index', '-200');
    $("#but3").css('z-index', '-200');
    $("#but4").css('z-index', '-200');
    $("#but5").css('z-index', '-200');
    $("#but6").css('z-index', '-200');
}

function display_buttons() {
    $('#but1').css('z-index', '200');
    $('#but2').css('z-index', '200');
    $('#but3').css('z-index', '200');
    $('#but4').css('z-index', '200');
    $('#but5').css('z-index', '200');
    $('#but6').css('z-index', '200');
}

function reset_radius() {
    TweenLite.to(cool_clas, 2, {
        r1: 60,
        ease: Power4.easeOut
    });
    TweenLite.to(cool_clas, 2, {
        r2: 100,
        ease: Power4.easeOut
    });
    TweenLite.to(cool_clas, 2, {
        r3: 120,
        ease: Power4.easeOut
    });
    TweenLite.to(cool_clas, 2, {
        r4: 90,
        ease: Power4.easeOut
    });
    TweenLite.to(cool_clas, 2, {
        r5: 68,
        ease: Power4.easeOut
    });
    TweenLite.to(cool_clas, 2, {
        r6: 80,
        ease: Power4.easeOut
    });

    TweenLite.to(cool_clas, 2, {
        line_helper: 4,
        ease: Power4.easeOut
    });

}

function hide_radius(r3) {
    if (r3) {
        TweenLite.to(cool_clas, 2, {
            line_helper: 0,
            r4: 0,
            r5: 0,
            r6: 0,
            r2: 0,
            r1: 0,
            ease: Power4.easeOut
        });
    } else {
        TweenLite.to(cool_clas, 2, {
            line_helper: 0,
            r4: 0,
            r5: 0,
            r6: 0,
            r3: 0,
            r2: 0,
            r1: 0,
            ease: Power4.easeOut
        });
    }
}

function rad() {
    function rad1() {
        function rad2() {
            function rad3() {
                function rad4() {
                    function rad5() {
                        TweenLite.to(cool_clas, 2, {
                            r6: 80,
                            ease: Power4.easeOut
                        });
                    }

                    TweenLite.to(cool_clas, 2, {
                        r5: 68,
                        x6: $('#but6').position().left + 100, // новости
                        y6: $('#but6').position().top + 60,
                        ease: Power4.easeOut,
                        onCompleteParams: rad5()
                    });
                }

                TweenLite.to(cool_clas, 2, {
                    r4: 90,
                    x5: $('#but5').position().left + 85, // подробности о проекте
                    y5: $('#but5').position().top + 50,
                    ease: Power4.easeOut,
                    onCompleteParams: rad4()
                });
            }

            TweenLite.to(cool_clas, 2, {
                r3: 120,
                x4: $('#but4').position().left + 99, // преподавать
                y4: $('#but4').position().top + 43,
                ease: Power4.easeOut,
                onCompleteParams: rad3()
            });
        }

        TweenLite.to(cool_clas, 2, {
            r2: 100,
            x3: $('#but3').position().left + 138, //принять участие
            y3: $('#but3').position().top + 110,
            ease: Power4.easeOut,
            onCompleteParams: rad2()
        });
    }

    TweenLite.to(cool_clas, 2, {
        r1: 60,
        x2: $('#but2').position().left + 105, // партнёры
        y2: $('#but2').position().top + 60,
        ease: Power4.easeOut,
        onCompleteParams: rad1()
    });
}

$("#component-2").click(function () {
    locker = true;
    $("#component-2").toggle();
    $(".back-hochu").toggle();
    step = 1;
    TweenLite.to(cool_clas, 2, {
        x1: $('#but1').position().left + 90, // подписаться
        y1: $('#but1').position().top + 50,
        ease: Power4.easeOut,
        onCompleteParams: rad()
    });

    setTimeout(function () {
        display_buttons();
    }, 1200);
});

function start_shari() {
    hide_buttons();
    top_position = $(".table-shar button").position().top + 98;
    left_position = $(".table-shar button").position().left + 98;
    width = $(".table-shar button").width();
    height = $(".table-shar button").height();

    locked_f = false;
    lock_click = false;

    reset_coor();

    cool_clas["line_helper"] = 4;
    c.width = window.innerWidth;     // equals window dimension
    c.height = window.innerHeight;

    ctx.lineWidth = 4;

    function draw() {
        setInterval(function () {
            ctx.clearRect(0, 0, c.width, c.height);
            if (step === 0) {
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(left_position + width / 2, top_position + height / 2, cool_clas['main_r'], 0, 2 * Math.PI, false);
                ctx.strokeStyle = '#080808';
                ctx.stroke();
                ctx.closePath();
            } else if (step === 1) {
                ctx.lineWidth = cool_clas["line_helper"];
                ctx.beginPath();
                ctx.moveTo(cool_clas["x4"], cool_clas["y4"]);
                ctx.lineTo(cool_clas["x5"], cool_clas["y5"]);
                ctx.strokeStyle = 'rgba(97,97,97,0.5)';
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(cool_clas["x6"], cool_clas["y6"]);
                ctx.lineTo(cool_clas["x5"], cool_clas["y5"]);
                ctx.strokeStyle = 'rgba(97,97,97,0.5)';
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(cool_clas["x6"], cool_clas["y6"]);
                ctx.lineTo(cool_clas["x2"], cool_clas["y2"]);
                ctx.strokeStyle = 'rgba(97,97,97,0.5)';
                ctx.stroke();


                ctx.beginPath();
                ctx.moveTo(cool_clas["x1"], cool_clas["y1"]);
                ctx.lineTo(cool_clas["x3"], cool_clas["y3"]);
                ctx.strokeStyle = 'rgba(97,97,97,0.5)';
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(cool_clas["x3"], cool_clas["y3"]);
                ctx.lineTo(cool_clas["x2"], cool_clas["y2"]);
                ctx.strokeStyle = 'rgba(97,97,97,0.5)';
                ctx.stroke();


                ctx.beginPath();
                ctx.arc(cool_clas["x4"], cool_clas["y4"], cool_clas["r4"], 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgb(67, 180, 152)';
                ctx.fill();
                ctx.strokeStyle = 'rgb(67, 180, 152)';
                ctx.stroke();
                ctx.closePath();

                ctx.beginPath();
                ctx.arc(cool_clas["x5"], cool_clas["y5"], cool_clas["r5"], 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgb(255, 140, 102)';
                ctx.fill();
                ctx.strokeStyle = 'rgb(255, 140, 102)';
                ctx.stroke();
                ctx.closePath();

                ctx.beginPath();
                ctx.arc(cool_clas["x6"], cool_clas["y6"], cool_clas["r6"], 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgb(81, 13, 129)';
                ctx.fill();
                ctx.strokeStyle = 'rgb(81, 13, 129)';
                ctx.stroke();
                ctx.closePath();

                ctx.beginPath();
                ctx.arc(cool_clas["x3"], cool_clas["y3"], cool_clas["r3"], 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgb(255, 140, 102)';
                ctx.fill();
                ctx.strokeStyle = 'rgb(255, 140, 102)';
                ctx.stroke();
                ctx.closePath();

                ctx.beginPath();
                ctx.arc(cool_clas["x2"], cool_clas["y2"], cool_clas["r2"], 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgb(67, 180, 152)';
                ctx.fill();
                ctx.strokeStyle = 'rgb(67, 180, 152)';
                ctx.stroke();
                ctx.closePath();

                ctx.beginPath();
                ctx.arc(cool_clas["x1"], cool_clas["y1"], cool_clas["r1"], 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgb(81, 13, 129)';
                ctx.fill();
                ctx.strokeStyle = 'rgb(81, 13, 129)';
                ctx.stroke();
                ctx.closePath();
            } else if (step === 2) {
                ctx.lineWidth = cool_clas["line_helper"];
            } else if (step === 3) {
                ctx.lineWidth = cool_clas["line_helper"];
                ctx.beginPath();
                ctx.arc($('#but3').position().left + 138, $('#but3').position().top + 110, cool_clas["r3"], 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgb(255, 140, 102)';
                ctx.fill();
                ctx.strokeStyle = 'rgb(255, 140, 102)';
                ctx.stroke();
                ctx.closePath();

            } else if (step === 4) {
                ctx.lineWidth = cool_clas["line_helper"];

                $('.take_part_in').each(function () {
                    ctx.beginPath();
                    ctx.moveTo($('#but3').position().left + 138, $('#but3').position().top + 110);
                    ctx.lineTo(c.width / 2, $(this).position().top + 37);
                    ctx.strokeStyle = 'rgba(97,97,97,0.5)';
                    ctx.stroke();
                });


                ctx.beginPath();
                ctx.arc($('#but3').position().left + 138, $('#but3').position().top + 110, cool_clas["r3"], 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgb(255, 140, 102)';
                ctx.fill();
                ctx.strokeStyle = 'rgb(255, 140, 102)';
                ctx.stroke();
                ctx.closePath();
            } else if (step === 5) {

            }
        }, 10);
    }

    draw_interval = draw();


    $('#but1').mouseenter(function () {
        if (locked_f === false) {
            TweenLite.to(cool_clas, 2, {
                r1: 80,
                ease: Power4.easeOut
            });
        }
    });
    $('#but1').mouseout(function () {
        if (locked_f === false) {
            TweenLite.to(cool_clas, 2, {
                r1: 60,
                ease: Power4.easeOut
            });
        }
    });


    $('#but2').mouseenter(function () {
        if (locked_f === false) {
            TweenLite.to(cool_clas, 2, {
                r2: 120,
                ease: Power4.easeOut
            });
        }
    });
    $('#but2').mouseout(function () {
        if (locked_f === false) {
            TweenLite.to(cool_clas, 2, {
                r2: 100,
                ease: Power4.easeOut
            });
        }
    });


    $('#but3').mouseenter(function () {
        if (locked_f === false) {
            TweenLite.to(cool_clas, 2, {
                r3: 140,
                ease: Power4.easeOut
            });
        }
    });
    $('#but3').mouseout(function () {
        if (locked_f === false) {
            TweenLite.to(cool_clas, 2, {
                r3: 120,
                ease: Power4.easeOut
            });
        }
    });


    $('#but4').mouseenter(function () {
        if (locked_f === false) {
            TweenLite.to(cool_clas, 2, {
                r4: 110,
                ease: Power4.easeOut
            });
        }
    });
    $('#but4').mouseout(function () {
        if (locked_f === false) {
            TweenLite.to(cool_clas, 2, {
                r4: 90,
                ease: Power4.easeOut
            });
        }
    });


    $('#but5').mouseenter(function () {
        if (locked_f === false) {
            TweenLite.to(cool_clas, 2, {
                r5: 88,
                ease: Power4.easeOut
            });
        }
    });
    $('#but5').mouseout(function () {
        if (locked_f === false) {
            TweenLite.to(cool_clas, 2, {
                r5: 68,
                ease: Power4.easeOut
            });
        }
    });


    $('#but6').mouseenter(function () {
        if (locked_f === false) {
            TweenLite.to(cool_clas, 2, {
                r6: 90,
                ease: Power4.easeOut
            });
        }
    });
    $('#but6').mouseout(function () {
        if (locked_f === false) {
            TweenLite.to(cool_clas, 2, {
                r6: 80,
                ease: Power4.easeOut
            });
        }
    });

}

function come_to_us_brother() {
    locked_f = true;
    hide_radius(false);

    setTimeout(function () {
        step = 2;
        hide_buttons();
        locked_f = false;

        $('#come_to_us_brother').toggle();
    }, 1000);
}

var bask_locker = false;

$(".back-hochu").click(function () {
    if (!bask_locker) {
        bask_locker = true;
        cool_clas['line_helper'] = 0;
        if (step === 1) {
            hide_buttons();
            TweenLite.to(cool_clas, 2, {
                ease: Power4.easeOut,
                x1: left_position + width / 2,
                y1: top_position + height / 2,
                r1: 130,

                x2: left_position + width / 2,
                y2: top_position + height / 2,
                r2: 130,

                x3: left_position + width / 2,
                y3: top_position + height / 2,
                r3: 130,


                x4: left_position + width / 2,
                y4: top_position + height / 2,
                r4: 130,

                x5: left_position + width / 2,
                y5: top_position + height / 2,
                r5: 130,


                x6: left_position + width / 2,
                y6: top_position + height / 2,
                r6: 130
            });

            setTimeout(function () {
                $("#component-2").toggle();
                step = 0;


                window.clearInterval(draw_interval);
                draw_interval = null;
                $(".back-hochu").toggle();

                start_shari();
                bask_locker = false;
            }, 1200);

        }

        else if (step === 2) {
            $('#come_to_us_brother').toggle();
            step = 1;
            display_buttons();
            reset_radius();
            bask_locker = false;
        }

        else if (step === 4) {
            cool_clas["line_helper"] = 4;
            TweenLite.to(cool_clas, 2, {
                ease: Power4.easeOut,
                line_helper: 0
            });

            $('#but3').animate({
                top: cool_clas['old_x'],
                left: cool_clas['old_y']
            }, 1000);

            setTimeout(function () {
                $('#take-part').toggle();
                step = 1;
                reset_radius();
                display_buttons();
                lock_click = false;
                bask_locker = false;
            }, 1000);
        }

        else if (step === 5) {
            step = 1;
            display_buttons();
            reset_radius();
            bask_locker = false;
            $('#partners_grid').toggle();
        }
    }
});

function take_part() {
    if (lock_click === false) {
        locked_f = true;

        cool_clas['old_y'] = $('#but3').position().left;
        cool_clas['old_x'] = $('#but3').position().top;

        hide_radius(true);
        setTimeout(function () {
            hide_buttons();
            $('#but3').css('z-index', '200');

            locked_f = false;

            TweenLite.to(cool_clas, 2, {
                line_helper: 4,
                ease: Power4.easeOut
            });

            $('#take-part').toggle();
            var top_position = $('#middle_shar').position().top - 63;

            $('#but3').animate({
                top: top_position,
                left: "20vw"
            }, 1000);

            step = 4;

            lock_click = true;

        }, 1000);
    }
}

function partners_grid() {
    locked_f = true;
    hide_radius(false);

    setTimeout(function () {
        step = 5;
        hide_buttons();
        locked_f = false;

        $('#partners_grid').toggle();
    }, 1000);
}

$('.input').keypress(function (e) {
    if (e.which === 13 && step === 2) {
        alert($('#come_to_us_brother input').val());
        $('#come_to_us_brother input').val('');

        $('#come_to_us_brother').toggle();

        step = 0;
        $("#component-2").toggle();
        $("#want").toggle();
        $(".subscription_alert").toggle();


        reset_coor();

        cool_clas["line_helper"] = 4;
        step = 0;

        setTimeout(function () {
            $(".subscription_alert").toggle();
            $("#want").toggle();
            reset_coor();

            window.clearInterval(draw_interval);
            draw_interval = null;
            $(".back-hochu").toggle();

            start_shari();
        }, 1000);
    }
});

$(document).ready(function () {
    start_shari();
});