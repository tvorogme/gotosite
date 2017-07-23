var up = 0;
var down = 0;
var slide = 0;

var slide_speed = 600;

var lock = false;
var boom_timer;

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

var isSafari = /constructor/i.test(window.HTMLElement);
var isFF = !!navigator.userAgent.match(/firefox/i);

if (isSafari) {
    document.getElementsByTagName('html')[0].classList.add('safari');
}

// Remove click on button for demo purpose
Array.prototype.slice.call(document.querySelectorAll('.button'), 0).forEach(function (bt) {
    bt.addEventListener('click', function (e) {
        e.preventDefault();
    });
});

function next_down() {
    if (slide != 5) {
        slide += 1;
    }
}

function next_up() {
    if (slide != 0) {
        slide -= 1;
    }
}

function set_position() {

}
function get_slide(n) {
    if (lock == false) {
        if (n == 0) {
            lock = true;
            $('#logo').animate({'width': '479px'}, slide_speed);
            $('.text').animate({top: '100vh'}, slide_speed);

            setTimeout(function () {
                lock = false;
            }, slide_speed + 200);
        }

        else if (n == 1) {
            $(".dotstyle li:eq(0)").click();
            $("#demo-canvas").css('display', 'block');
            $("#in_helper").css('display', 'block');

            lock = true;
            if ($('#logo').width() != 300) {
                $('#logo').animate({'width': '300px'}, slide_speed);
                $('.text').animate({top: $('#logo').position().top + 260 + 'px'}, slide_speed);

                setTimeout(function () {
                    lock = false;
                }, slide_speed + 200);
            }
            else {
                $('.first-slide').animate({
                    top: 0
                }, slide_speed);

                $('.tetris').animate({
                    top: '100vh'
                }, slide_speed);

                setTimeout(function () {
                    lock = false;
                }, slide_speed + 200);
            }

        }

        else if (n == 2) {
            $(".dotstyle li:eq(1)").click();
            lock = true;

            if ($('.krutyashki').position().top != 0) {
                $('.first-slide').animate({
                    top: '-100vh'
                }, slide_speed);

                $('.tetris').animate({
                    top: '0'
                }, slide_speed);

                setTimeout(function () {
                    lock = false;
                }, slide_speed + 200);

            }
            else {
                $('.krutyashki').animate({
                    top: '100vh'
                }, slide_speed);

                $('.tetris').animate({
                    top: '0'
                }, slide_speed);

                setTimeout(function () {
                    lock = false;
                }, slide_speed + 200);
            }
        }

        else if (n == 3) {
            window.clearTimeout(boom_timer);
            $(".dotstyle li:eq(2)").click();
            lock = true;

            if ($('.button-big-picture').position().top != 0) {
                $('.tetris').animate({
                    top: '-100vh'
                }, slide_speed);

                $('.krutyashki').animate({
                    top: '0'
                }, slide_speed);

                setTimeout(function () {
                    lock = false;
                }, slide_speed + 200);
            }
            else {
                $('.button-big-picture').animate({
                    top: '100vh'
                }, slide_speed);

                $('.krutyashki').animate({
                    top: '0'
                }, slide_speed);

                setTimeout(function () {
                    lock = false;
                }, slide_speed + 200);
            }
        }
        else if (n == 4) {
            $(".dotstyle li:eq(3)").click();
            // $(".dotstyle li a").animate({
            //     backgroundColor: '#080808'
            // }, 100);

            // $(".dotstyle-hop li a::after").animate({
            //     backgroundColor: '#080808'
            // }, 100);

            $(".dotstyle-hop li a").animate({
                borderColor: '#080808'
            }, 100);

            lock = true;

            boom_timer = setTimeout(function () {
                if (!locker) {
                    $("#component-2").click();
                }
            }, 5000);


            if ($('#partners').position().top != 0) {
                $('.krutyashki').animate({
                    top: '-100vh'
                }, slide_speed);

                $('.button-big-picture').animate({
                    top: '0'
                }, slide_speed);
            } else {
                $('.button-big-picture').animate({
                    top: '0'
                }, slide_speed);
                $('#partners').animate({
                    top: '100vh'
                }, slide_speed);
            }


            setTimeout(function () {
                lock = false;
            }, slide_speed + 200);
        }
        else if (n == 5) {
            window.clearTimeout(boom_timer);
            $(".dotstyle li a").animate({
                backgroundColor: 'white'
            }, 200);

            $(".dotstyle-hop li a").animate({
                borderColor: 'white'
            }, 200);

            lock = true;

            $(".dotstyle li:eq(4)").click();
            lock = true;

            $('.button-big-picture').animate({
                top: '-100vh'
            }, slide_speed);

            $('#partners').animate({
                top: '0'
            }, slide_speed);

            setTimeout(function () {
                lock = false;
            }, slide_speed + 200);

        }
    }
    else {
        return 0;
    }
}
var elem = window;
if (elem.addEventListener) {
    if ('onwheel' in document) {
        // IE9+, FF17+, Ch31+
        elem.addEventListener("wheel", onWheel);
    } else if ('onmousewheel' in document) {
        // устаревший вариант события
        elem.addEventListener("mousewheel", onWheel);
    } else {
        // Firefox < 17
        elem.addEventListener("MozMousePixelScroll", onWheel);
    }
} else { // IE8-
    elem.attachEvent("onmousewheel", onWheel);
}

function onWheel(e) {
    e = e || window.event;
    var delta = e.deltaY || e.detail || e.wheelDelta;

    if (delta > 0) {
        down += 1;
        if (down > 2) {
            down = 0;
            if (get_slide(slide + 1) != 0) {
                next_down();
            }
        }
    }
    else {
        up += 1;
        if (up > 2) {
            up = 0;
            if (get_slide(slide - 1) != 0) {
                next_up();
            }
        }
    }
}

$(document).ready(function (ev) {
    $("#question-footer-question").css('width', $('question-footer-email').width());
    set_position();
    var toggle = $('#ss_toggle');
    var menu = $('#ss_menu');
    var rot;

    $('#ss_toggle').on('click', function (ev) {
        rot = parseInt($(this).data('rot')) - 180;
        menu.css('transform', 'rotate(' + rot + 'deg)');
        menu.css('webkitTransform', 'rotate(' + rot + 'deg)');
        if ((rot / 180) % 2 == 0) {
            //Moving in
            toggle.parent().addClass('ss_active');
            toggle.addClass('close');
        } else {
            //Moving Out
            toggle.parent().removeClass('ss_active');
            toggle.removeClass('close');
        }
        $(this).data('rot', rot);
    });

    menu.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
        if ((rot / 180) % 2 == 0) {
            $('#ss_menu div i').addClass('ss_animate');
        } else {
            $('#ss_menu div i').removeClass('ss_animate');
        }
    });

});

function cool(i) {
    $('.opisanie').css('display', 'block').css('bottom', '0').css('height', '320');

    if (i == 0) {
        $('.opisanie').css('background-color', 'rgb(81, 13, 129)');
        $('.programm-text').css('display', 'none');
        $('.ad-text').css('display', 'none');
        $('.bio-text').css('display', 'none');
        $('.robot-text').css('display', 'block');
    }
    if (i == 1) {
        $('.opisanie').css('background-color', 'rgb(67, 180, 152)');
        $('.robot-text').css('display', 'none');
        $('.ad-text').css('display', 'none');
        $('.bio-text').css('display', 'none');
        $('.programm-text').css('display', 'block');
    }
}

function ntcool(i) {
    $('.opisanie').css('display', 'block');

    if (i == 2) {
        $('.opisanie').css('background-color', 'rgb(238, 229, 58)');
        $('.programm-text').css('display', 'none');
        $('.ad-text').css('display', 'block');
        $('.bio-text').css('display', 'none');
        $('.robot-text').css('display', 'none');
    }
    if (i == 3) {
        $('.opisanie').css('background-color', 'rgb(255, 140, 102)');
        $('.robot-text').css('display', 'none');
        $('.ad-text').css('display', 'none');
        $('.bio-text').css('display', 'block');
        $('.programm-text').css('display', 'none');
    }
}

function awesome() {
    $('.opisanie').toggle().css('bottom', '').css('height', '320');
    $('.robot-text').css('display', 'none');
    $('.programm-text').css('display', 'none');
    $('.ad-text').css('display', 'none');
    $('.bio-text').css('display', 'none');
}

$(document).resize(function () {
    set_position();
});

setTimeout(function () {
    if (slide == 0) {
        get_slide(1);
        next_down();
    }
}, 3000);

$('#question-footer-question ').click(function () {
    $(this).animate({
        height: "100px"
    }, 300);

    $("#pseudo-helper-kostil").animate({
        height: "0px"
    }, 300);
});
