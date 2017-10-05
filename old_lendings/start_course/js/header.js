/**
 * Created by xenx on 1/29/17.
 */

function initialize() {
    var mapProp = {
        center: new google.maps.LatLng(55.7671006,37.6096778),
        zoom: 16,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapProp);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(55.7671006,37.6096778),
        map: map
    });
    var iw1 = new google.maps.InfoWindow({
        content: "<p id='map_text'> <a id='map_a' href='http://yellowdoor.ru/'>Yellow Door</a> <br> Страстной бульвар, 12/1</p>"
    });

    iw1.open(map, marker);
    google.maps.event.addListener(marker, "click", function (e) {
        iw1.open(map, this);
    });
}
$(document).ready(function () {
    google.maps.event.addDomListener(window, 'load', initialize);
});


$(document).ready(function () {
    $("#tspan3855").css("display", "none");
    $("body").css("overflow-y", "visible");
    $("#logo").css("display", "block");

    setTimeout(function () {
        if ($("body").width() != 1050) {
            var l = $("#logo").offset().left;


            $("#logo").css("position", "absolute").css("right", l);
            $("#logo").animate({
                right: ($("body").width() / 2 + 30),
                height: "27vh"
            }, 1000);
        } else {
            $("#logo").animate({
                height: "22vh"
            }, 1000);

            $("#header_logo_wrapper").animate({
                top: "10vh"
            }, 1000)
        }


        setTimeout(function () {

            $("#tspan3855").css("display", "block");
            $(".after_drawing").css("display", "block");


            $("body").css("overflow-y", "auto");


            if ($("body").width() != 1050) {
                var k = $("#logo").offset().top + $("#logo").height() + 60;

                $("#text_near_logo").css("top", ($("#logo").offset().top + ($("#logo").height() / 100) * 10));
                $("#text_near_logo h2").css("font-size", "40px");
                $(".take_part_wrapper").css("top", k);

            }


            $("#in_helper").click(function () {
                $('html, body').animate({scrollTop: $('#if_you').offset().top}, 'slow');
            });


            $(window).resize(function () {
                if ($("body").width() != 1050) {
                    var l = $("#logo").offset().left;


                    $("#logo").css("position", "absolute").css("right", l);
                    $("#logo").css({
                        right: ($("body").width() / 2),
                        height: "27vh"
                    }, 1000);
                } else {
                    $("#logo").css({
                        height: "22vh"
                    }, 1000);

                    $("#header_logo_wrapper").css({
                        top: "10vh"
                    }, 1000)
                }

                if ($("body").width() != 1050) {
                    var k = $("#logo").offset().top + $("#logo").height() + 40;

                    $("#text_near_logo").css("top", ($("#logo").offset().top + ($("#logo").height() / 100) * 10));
                    $("#text_near_logo h2").css("font-size", ($("#logo").height() / 3 - 24));
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
