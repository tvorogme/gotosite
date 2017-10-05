/**
 * Created by xenx on 1/28/17.
 */

var first_clock, second_clock, third_clock, x1, x2, x3, y;
var paper, line, line2, has_lines, f1_na, f2_na, f3_na = false;


function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}


function main_clocks() {
    paper = Snap("#clocks_svg");


    var w = $("#clocks_svg").width();
    var h = $("#clocks_svg").height();

    first_clock = paper.select("#clock1_pic");
    second_clock = paper.select("#clock2_pic");
    third_clock = paper.select("#clock3_pic");

    x1 = $("#first_clock_title").offset().left;
    x2 = $("#second_clock_title").offset().left + $("#second_clock_title").outerWidth(true) / 2;
    x3 = $("#third_clock_title").offset().left + $("#third_clock_title").outerWidth(true) / 2;
    var third_position = ($("#second_clock_title").width() * 2) + ($("#second_clock_title").width() / 2 - 100);
    var second_position = $("#first_clock_title").width() + ($("#second_clock_title").width() / 2 - 100);
    var first_position = $("#first_clock_title").width() / 2 - 100;


    // if ($("body").width() > 1000) {
    if (has_lines) {
        line.remove();
        line2.remove();
        has_lines = false;
    }
    third_position = "t " + third_position + " -407";
    second_position = "t " + second_position + " -407";
    first_position = "t " + first_position + " -332";

    third_clock.transform(third_position);
    second_clock.transform(second_position);
    first_clock.transform(first_position);

    var v1 = h / 3 + 40;
    var t1 = $(".clock").width() - 60;
    var t2 = $(".clock").width() + 60;
    line = paper.path("M " + t1 + " " + v1 + " , " + t2 + " " + v1);
    line.attr({
        stroke: "#ec8b6d",
        strokeWidth: 4
    });


    var t3 = $(".clock").width() * 2 - 60;
    var t4 = $(".clock").width() * 2 + 60;
    line2 = paper.path("M " + t3 + " " + v1 + " , " + t4 + " " + v1);
    line2.attr({
        stroke: "#ec8b6d",
        strokeWidth: 4
    });
    has_lines = true;
    // } else {
    //     // if (has_lines) {
    //     //     line.remove();
    //     //     line2.remove();
    //     //     has_lines = false;
    //     // }
    //     //
    //     // var xx = $("body").width() / 2 - 90;
    //     // third_position = "t " + xx + " " + ((-1* $("#third_clock_title").position().top -150) + $(".clock").height() * 2);
    //     // second_position = "t " + xx + " " + ((-1 * $("#second_clock_title").position().top -150)  + $(".clock").height());
    //     // first_position = "t " + xx + " " + ((-1 * $("#first_clock_title").position().top) -75);
    //     // third_clock.transform(third_position);
    //     // second_clock.transform(second_position);
    //     // first_clock.transform(first_position);
    // }

    function animate_third_circle(time, mobile) {
        var add = "";
        if (mobile) {
            add = "m"
        }
        var tmp = "m 100.14309,524.03491 97.43504,-0.0505 -3.0317,-23.07096 z";
        time = time / 9;
        function l1() {
            function l2() {
                function l3() {
                    function l4() {
                        function l5() {
                            function l6() {
                                function l7() {
                                    function l8() {
                                        setTimeout(function () {
                                            $("#path4582" + add).css("stroke-width", "1px");
                                            tmp = "M 100.04913,524.18352 66.162847,432.48497 52.856232,439.35674 Z";
                                            Snap("#path4582" + add).animate({d: tmp}, time, mina.linear);
                                        }, time);

                                    }

                                    setTimeout(function () {
                                        $("#path4580" + add).css("stroke-width", "1px");
                                        tmp = "M 100.05078,524.1875 92.000001,426.5 66.162847,432.48497 Z";
                                        Snap("#path4580" + add).animate({d: tmp}, time, mina.linear, l8());
                                    }, time);

                                }

                                setTimeout(function () {
                                    $("#path4578" + add).css("stroke-width", "1px");
                                    tmp = "M 100.14309,524.03491 116.5,427.875 92.000001,426.5 Z";
                                    Snap("#path4578" + add).animate({d: tmp}, time, mina.linear, l7());
                                }, time);

                            }

                            setTimeout(function () {
                                $("#path4576" + add).css("stroke-width", "1px");
                                tmp = "M 100.14309,524.03491 139.65359,434.58377 116.5,427.875 Z";
                                Snap("#path4576" + add).animate({d: tmp}, time, mina.linear, l6());
                            }, time);

                        }

                        setTimeout(function () {
                            $("#path4574" + add).css("stroke-width", "1px");
                            tmp = "m 100.14309,524.03491 59.2211,-78.46889 -19.7106,-10.98225 z";
                            Snap("#path4574" + add).animate({d: tmp}, time, mina.linear, l5());
                        }, time);

                    }

                    setTimeout(function () {
                        $("#path4572" + add).css("stroke-width", "1px");
                        tmp = "M 100.14309,524.03491 175,461 159.36419,445.56602 Z";
                        Snap("#path4572" + add).animate({d: tmp}, time, mina.linear, l4());
                    }, time);

                }

                setTimeout(function () {
                    $("#path4570" + add).css("stroke-width", "1px");
                    tmp = "M 100.14309,524.03491 187.5,480.25 175,461 Z";
                    Snap("#path4570" + add).animate({d: tmp}, time, mina.linear, l3());

                }, time);

            }

            setTimeout(function () {
                $("#path4568" + add).css("stroke-width", "1px");
                tmp = "M 100.14309,524.03491 194.54643,500.91345 187.5,480.25 Z";
                Snap("#path4568" + add).animate({d: tmp}, time, mina.linear, l2());
            }, time);

        }

        $("#path4566" + add).css("stroke-width", "1px");
        Snap("#path4566" + add).animate({d: tmp}, time, mina.linear, l1());
    }

    function animate_second_circle(time, mobile) {
        var add = "";
        if (mobile) {
            add = "m"
        }
        var tmp = "m 99.615387,527.26383 -79.885053,58.15882 31.405082,26.63677 z";
        time = time / 8;
        function one_love() {

            var tmp = "M 100.05569,100.24915 51.135416,185.05942 77.96302,196.47757 Z";


            function l1() {
                function l2() {
                    function l3() {
                        function l4() {

                            setTimeout(function () {
                                $("#path5168" + add).css("stroke-width", "1px");
                                tmp = "m 100.05569,100.24915 74.72921,64.76941 6.31616,-10.48099 z";
                                Snap("#path5168" + add).animate({d: tmp}, time, mina.linear);
                            }, time);

                        }

                        setTimeout(function () {
                            $("#path5166" + add).css("stroke-width", "1px");
                            tmp = "m 100.05569,100.24915 45.42048,87.7159 29.30873,-22.94649 z";
                            Snap("#path5166" + add).animate({d: tmp}, time, mina.linear, l4());
                        }, time);

                    }

                    setTimeout(function () {
                        $("#path5164" + add).css("stroke-width", "1px");
                        tmp = "m 100.05569,100.24915 10.63999,98.30566 34.25213,-10.35494 z";
                        Snap("#path5164" + add).animate({d: tmp}, time, mina.linear, l3());
                    }, time);

                }

                setTimeout(function () {
                    $("#path5162" + add).css("stroke-width", "1px");
                    tmp = "m 100.05569,100.24915 -22.09267,96.22842 32.73266,2.07724 z";
                    Snap("#path5162" + add).animate({d: tmp}, time, mina.linear, l2());
                }, time);

            }

            $("#path5160" + add).css("stroke-width", "1px");
            Snap("#path5160" + add).animate({d: tmp}, time, mina.linear, l1());
        }

        $("#patho" + add).css("stroke-width", "1px");
        Snap("#patho" + add).animate({d: tmp}, time, mina.linear, one_love());
    }

    function animate_first_circle(time, mobile) {
        var tmp = "M 99.409921,101.19658 2.0466102,99.643007 9.3559324,136.92055 Z";
        time = time / 3;
        var add = "";
        if (mobile) {
            add = "m"
        }
        function l1() {
            function l2() {
                setTimeout(function () {
                    $("#path5230" + add).css("stroke-width", "1px");
                    tmp = "m 99.409921,101.19658 -72.047237,65.41123 24.428606,19.0539 z";
                    Snap("#path5230" + add).animate({d: tmp}, time, mina.linear);
                }, time);
            }

            setTimeout(function () {
                $("#path5228" + add).css("stroke-width", "1px");
                tmp = "M 99.409921,101.19658 9.3559324,136.92055 27.362684,166.60781 Z";
                Snap("#path5228" + add).animate({d: tmp}, time, mina.linear, l2());
            }, time);
        }

        $("#path5226" + add).css("stroke-width", "1px");
        Snap("#path5226" + add).animate({d: tmp}, time, mina.linear, l1());
    }

    var drawed = false;
    $(document).scroll(function () {
        if ($("body").width() != 1050) {
            if (!already_drawed) {
                if (isScrolledIntoView("#croto")) {
                    if (!drawed) {
                        drawed = true;
                        animate_third_circle(1000, false);
                        animate_second_circle(1000, false);
                        animate_first_circle(1000, false);
                    }
                }
            }
        }
    });

    $(document).ready(function () {
            if ($("body").width() == 1050) {
                animate_first_circle(10, true);
                animate_second_circle(10, true);
                animate_third_circle(10, true);
            }
        }
    )

}

$(document).ready(main_clocks);
$(window).resize(main_clocks);