/**
 * Created by xenx on 1/27/17.
 */

function circlePath(cx, cy, r) {
    return 'M ' + cx + ' ' + cy + ' m -' + r + ', 0 a ' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0 a ' + r + ',' + r + ' 0 1,0 -' + (r * 2) + ',0 z';
}


var d1 = 400;
var s = Snap("#proto");
var all_coordinates = [];
var x, y, r = true;
var mobile = false;
var already_drawed = false;

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

$(document).ready(function () {
    d1 = 400;
    r = 100;
    s = Snap("#proto");

    if ($("body").width() != 1050) {
        $("#proto").css("width", $(".how-to-take_part").width());
        $(".texts p ").css("width", ($("body").width() / 4));
    } else {
        $("#proto").css("height", $(".how-to-take_part").height())
    }
    $(".texts p").each(function () {
        if ($("body").width() == 1050) {
            x = $(this).position().left + $(this).outerWidth(true) / 2;
            y = $(this).position().top + $(this).outerHeight() / 2 - 250;
            r = 270;
            mobile = true;
        } else {
            $("#proto").css("height", $(".how-to-take_part").height());
            r = 120;
            x = $(this).position().left + $(this).outerWidth() / 2;
            y = $(this).position().top + $(this).outerHeight() / 2;
            mobile = false;
        }

        all_coordinates.push([x, y]);
    });

    function draw_circles() {
        function circle1() {
            var loop = circlePath(all_coordinates[0][0], all_coordinates[0][1], r);
            var loopLength = Snap.path.getTotalLength(loop);
            circleOutline = s.path({
                path: Snap.path.getSubpath(loop, 0, 0),
                stroke: "#373a3c",
                id: "clicker",
                fill: "white",
                strokeWidth: 0,
                strokeLinecap: "round"
            });
            Snap.animate(0, loopLength,
                function (step) {
                    circleOutline.attr({
                        path: Snap.path.getSubpath(loop, 0, step),
                        strokeWidth: 2
                    });
                }, d1, mina.easein, line1()
            );

            $("#clicker").hover(function () {
                $(this).attr("fill", "#ec8b6d");
                $(this).attr("stroke", "#ec8b6d");
                $("#first_step").css("color", "white");
            }, function () {
                $(this).attr("fill", "white");
                $(this).attr("stroke", "#373a3c");
                $("#first_step").css("color", "#373a3c");
            });

            $("#first_step").hover(function () {
                $("#clicker").attr("fill", "#ec8b6d").attr("stroke", "#ec8b6d");
                $("#first_step").css("color", "white");
            }, function () {
                $("#clicker").attr("fill", "white").attr("stroke", "#373a3c");
                $("#first_step").css("color", "#373a3c");
            });

            $("#clicker").click(function () {
                window.location = "https://docs.google.com/forms/d/e/1FAIpQLSf-srXAd7yaBcTET4dpLgLsKmNp-P5TH1HyLq02EfSBa9qBqA/viewform"
            });

            $("#first_step").click(function () {
                window.location = "https://docs.google.com/forms/d/e/1FAIpQLSf-srXAd7yaBcTET4dpLgLsKmNp-P5TH1HyLq02EfSBa9qBqA/viewform"
            });
        }

        function circle2() {
            $("#second_step").css("color", "#373a3c");
            var loop = circlePath(all_coordinates[1][0], all_coordinates[1][1], r);
            var loopLength = Snap.path.getTotalLength(loop);
            circleOutline = s.path({
                path: Snap.path.getSubpath(loop, 0, 0),
                stroke: "#373a3c",
                fillOpacity: 0,
                strokeWidth: 0,
                strokeLinecap: "round"
            });
            Snap.animate(0, loopLength,
                function (step) {
                    circleOutline.attr({
                        path: Snap.path.getSubpath(loop, 0, step),
                        strokeWidth: 2
                    });
                }, d1, mina.easein, line2()
            );
        }

        function circle3() {
            $("#third_step").css("color", "#373a3c");
            var loop = circlePath(all_coordinates[2][0], all_coordinates[2][1], r);
            var loopLength = Snap.path.getTotalLength(loop);
            circleOutline = s.path({
                path: Snap.path.getSubpath(loop, 0, 0),
                stroke: "#373a3c",
                fillOpacity: 0,
                strokeWidth: 0,
                strokeLinecap: "round"
            });
            Snap.animate(0, loopLength,
                function (step) {
                    circleOutline.attr({
                        path: Snap.path.getSubpath(loop, 0, step),
                        strokeWidth: 2
                    });
                }, d1, mina.easein, line3()
            );
        }

        function circle4() {
            $("#fourth_step").css("color", "#373a3c");
            var loop = circlePath(all_coordinates[3][0], all_coordinates[3][1], r);
            var loopLength = Snap.path.getTotalLength(loop);
            circleOutline = s.path({
                path: Snap.path.getSubpath(loop, 0, 0),
                stroke: "#373a3c",
                fillOpacity: 0,
                strokeWidth: 0,
                strokeLinecap: "round"
            });
            Snap.animate(0, loopLength,
                function (step) {
                    circleOutline.attr({
                        path: Snap.path.getSubpath(loop, 0, step),
                        strokeWidth: 2
                    });
                }, d1, mina.easeInOut
            );
        }

        function line3() {
            setTimeout(function () {
                var linePath = true;
                if (!mobile) {
                    linePath = "M " + (all_coordinates[2][0] + r) + ", " + all_coordinates[2][1] + ", " + (all_coordinates[3][0] - r) + ", " + all_coordinates[3][1];
                } else {
                    linePath = "M " + (all_coordinates[2][0]) + ", " + (all_coordinates[2][1] + r) + ", " + (all_coordinates[3][0]) + ", " + (all_coordinates[3][1] - r);

                }
                var lineLength = Snap.path.getTotalLength(linePath);
                var lineDraw = s.path(linePath);
                lineDraw.attr({
                    fill: 'none',
                    stroke: '#373a3c',
                    'stroke-dasharray': lineLength + ' ' + lineLength,
                    'stroke-dashoffset': lineLength,
                    'stroke-width': 2,
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-miterlimit': 10
                });
                lineDraw.animate({
                    strokeDashoffset: 0
                }, d1, mina.easein, circle4)
            }, d1);
        }

        function line2() {
            setTimeout(function () {
                var linePath = true;
                if (!mobile) {
                    linePath = "M " + (all_coordinates[1][0] + r) + ", " + all_coordinates[1][1] + ", " + (all_coordinates[2][0] - r) + ", " + all_coordinates[2][1];
                } else {
                    linePath = "M " + (all_coordinates[1][0]) + ", " + (all_coordinates[1][1] + r) + ", " + (all_coordinates[2][0]) + ", " + (all_coordinates[2][1] - r);

                }
                var lineLength = Snap.path.getTotalLength(linePath);
                var lineDraw = s.path(linePath);
                lineDraw.attr({
                    fill: 'none',
                    stroke: '#373a3c',
                    'stroke-dasharray': lineLength + ' ' + lineLength,
                    'stroke-dashoffset': lineLength,
                    'stroke-width': 2,
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-miterlimit': 10
                });
                lineDraw.animate({
                    strokeDashoffset: 0
                }, d1, mina.easein, circle3);
            }, d1);

        }


        function line1() {
            setTimeout(function () {
                var linePath = true;
                if (!mobile) {
                    linePath = "M " + (all_coordinates[0][0] + r) + ", " + all_coordinates[0][1] + ", " + (all_coordinates[1][0] - r) + ", " + all_coordinates[1][1];
                } else {
                    linePath = "M " + (all_coordinates[0][0]) + ", " + (all_coordinates[0][1] + r) + ", " + (all_coordinates[1][0]) + ", " + (all_coordinates[1][1] - r);
                }
                var lineLength = Snap.path.getTotalLength(linePath);
                var lineDraw = s.path(linePath);
                lineDraw.attr({
                    fill: 'none',
                    stroke: '#373a3c',
                    'stroke-dasharray': lineLength + ' ' + lineLength,
                    'stroke-dashoffset': lineLength,
                    'stroke-width': 2,
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-miterlimit': 10
                });
                lineDraw.animate({
                    strokeDashoffset: 0
                }, d1, mina.easein, circle2)
            }, d1);

        }

        circle1();
        already_drawed = true;
    }

    $(window).resize(function () {
        d1 = 10;
        s.clear();
        all_coordinates = [];

   if ($("body").width() > 1050) {
        $("#proto").css("width", $(".how-to-take_part").width());
        $(".texts p ").css("width", ($("body").width() / 4));
    } else {
        $("#proto").css("height", $(".how-to-take_part").height())
    }
    $(".texts p").each(function () {
        if ($("body").width() < 1050) {
            x = $(this).position().left + $(this).outerWidth(true) / 2;
            y = $(this).position().top + $(this).outerHeight() / 2 - 250;
            r = 270;
            mobile = true;
        } else {
            $("#proto").css("height", $(".how-to-take_part").height());
            r = 120;
            x = $(this).position().left + $(this).outerWidth() / 2;
            y = $(this).position().top + $(this).outerHeight() / 2;
            mobile = false;
        }

        all_coordinates.push([x, y]);
    });

        if (already_drawed) {
            draw_circles();
        }
    });
    $(document).scroll(function () {
        if (!already_drawed) {
            if (isScrolledIntoView("#first_step")) {
                draw_circles();
                already_drawed = true;
            }
        }
    });
});
