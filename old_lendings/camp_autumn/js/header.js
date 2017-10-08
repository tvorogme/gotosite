/**
 * Created by xenx on 1/29/17.
 */

$(document).ready(function () {
    $(".golovinka-special").css("height", $('#normal').height());
    $("#tspan3855").css("display", "none");
    $("body").css("overflow-y", "visible");
    $("#logo").css("display", "block");

    setTimeout(function () {
        if ($("body").width() > 1050) {
            var l = $("#logo").offset().left;


            $("#logo").css("position", "absolute").css("right", l);
            $("#logo").animate({
                right: ($("body").width() / 2 + 30),
                height: "27vh"
            }, 1000);
        } else {
            $("#logo").animate({
                height: "27vh"
            }, 1000);

            $("#header_logo_wrapper").animate({
                top: "10vh"
            }, 1000)
        }


        setTimeout(function () {

            $("#tspan3855").css("display", "block");
            $(".after_drawing").css("display", "block");


            if ($("body").width() > 1050) {
                var k = $("#logo").offset().top + $("#logo").height() + 60;
                $("#text_near_logo").css("top", ($("#logo").offset().top + ($("#logo").height() / 100) * 10) - 5);
                $("#text_near_logo h2").css("font-size", "40px");
                $(".take_part_wrapper").css("top", k);
            }


            $("#in_helper").click(function () {
                $('html, body').animate({scrollTop: $('#features').offset().top}, 'slow');
            });


            $(window).resize(function () {
                $(".golovinka-special").css("height", $('#normal').height());

                if ($("body").width() > 1050) {
                    var l = $("#logo").offset().left;


                    $("#logo").css("position", "absolute").css("right", l);
                    $("#logo").css({
                        right: ($("body").width() / 2),
                        height: "27vh"
                    }, 1000);

                    $("#header_logo_wrapper").css({
                        top: "30vh"
                    }, 1000)
                } else {
                    $("#logo").css({
                        height: "27vh"
                    }, 1000);

                    $("#header_logo_wrapper").css({
                        top: "10vh"
                    }, 1000)
                }

                if ($("body").width() > 1050) {
                    var k = $("#logo").offset().top + $("#logo").height() + 60;

                    $("#text_near_logo").css("top", ($("#logo").offset().top + ($("#logo").height() / 100) * 10) - 5);
                    $("#text_near_logo h2").css("font-size", "40px");
                    $(".take_part_wrapper").css("top", k);

                } else {
                    var k = $("#logo").offset().top + ($("#logo").height() + 40);
                    var l = k + $("#text_near_logo").height();

                    $("#text_near_logo").css("top", k);
                    $(".take_part_wrapper").css("top", l);
                }


            });
        }, 1000);
    }, 2500);


});