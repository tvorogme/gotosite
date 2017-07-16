var width = $(window).width();
var height = $(window).height();

var popup = false;

var maxRadius = 120;
var minRadius = 40;

var right_border = width - maxRadius;
var left_border = maxRadius;

var top_border = maxRadius;
var bottom_border = height - maxRadius;

if (height < 900) {
    height = 900;
}

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);


function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

var photo_urls = ["https://goto.msk.ru/camp_summer/images/comments/nast.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/maxim.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/gridasov.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/zajceva.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/andreeva.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/dimaantonov.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/kabo.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/tsiplenkov.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/sere.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/popkova.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/svatoslav.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/gleb.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/kurilev.jpg"];

var nodes = d3.range(12).map(function (i) {
    return {radius: getRandom(minRadius, maxRadius), id: i, url: photo_urls[i], padding: 50};
});


var alpha = .1;

function packup() {
    var pack = d3.layout.pack()
        .sort(null)
        .size([width, height])
        .padding(0)
        .value(function (d) {
            return d.radius;
        });

    svg.selectAll(".node").data(pack.nodes({"children": nodes})
        .filter(function (d) {
            return !d.children;
        })).enter().append('defs')
        .append('pattern')
        .attr('id', function (d) {
            return (d.id + "-icon");
        })
        .attr('width', 1)
        .attr('height', 1)
        .attr('patternContentUnits', 'objectBoundingBox')
        .append("svg:image")
        .attr("xlink:xlink:href", function (d) {
            return (d.url);
        })
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "xMinYMin slice");

    svg.selectAll(".node")
        .data(pack.nodes({"children": nodes})
            .filter(function (d) {
                return !d.children;
            }))
        .enter().append("circle")
        .attr("r", function (d) {
            return d.radius;
        }).attr("class", "my_bubble_circle")
        .on("mouseover", function (d) {
            force.resume();
            d.radius += 20;
            d.padding -= 20;
            d.r = d.radius;
            d3.select(this).attr("r", d.radius);
        }).on("mouseout", function (d) {
        force.resume();
        d.radius -= 20;
        d.padding += 20;
        d.r = d.radius;
        d3.select(this).attr("r", d.radius)
    }).style("fill", function (d) {
        return ("url(#" + d.id + "-icon)")
    });
}

function border_check(a, b) {
    if (b) {
        if (a > right_border) {
            a = right_border;
        } else if (a < left_border) {
            a = left_border;
        }
        return a
    } else {
        if (a < top_border) {
            a = top_border;
        } else if (a > bottom_border) {
            a = bottom_border;
        }
        return a
    }
}


var force;

function forceup() {
    force = d3.layout.force()
        .nodes(nodes)
        .gravity(0.01)
        .charge(-30)
        .theta(0.8)
        .alpha(0.1)
        .size([width, height])
        .start();

    var drag = force.drag();

    force.on("tick", function () {
        var q = d3.geom.quadtree(nodes);
        var i = 0;
        var n = nodes.length;

        while (++i < n) {
            function set_collide(d) {
                var r = d.radius + maxRadius + d.padding,
                    nx1 = d.x - r,
                    nx2 = d.x + r,
                    ny1 = d.y - r,
                    ny2 = d.y + r;

                return function (quad, x1, y1, x2, y2) {
                    if (quad.point && (quad.point !== d)) {
                        var x = d.x - quad.point.x,
                            y = d.y - quad.point.y,
                            l = Math.sqrt(x * x + y * y),
                            r = d.radius + quad.point.radius + d.padding;
                        if (l < r) {
                            l = (l - r) / l * alpha;
                            d.x -= x *= l;
                            d.y -= y *= l;
                            quad.point.x += x;
                            quad.point.y += y;
                        }
                    }
                    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                }
            }

            q.visit(set_collide(nodes[i]));
        }

        svg.selectAll(".my_bubble_circle")
            .attr("cx", function (d) {
                d.x = border_check(d.x, true);
                return d.x;
            })
            .attr("cy", function (d) {
                d.y = border_check(d.y, false);
                return d.y;
            });

    });

    d3.selectAll(".my_bubble_circle").call(drag);
}

packup();
forceup();

function toggle_popup() {
    var ten_by_ten;

    var interval_count = 0;
    var interval_times = 20;

    if (popup) {
        force.resume();
        right_border = width - maxRadius;

        ten_by_ten = setInterval(function () {
            interval_count += 1;

            if (interval_count > interval_times) {
                clearInterval(ten_by_ten);
            } else {
                svg.selectAll(".my_bubble_circle").attr("x", function (d) {
                    d.x += 5;
                    d.x = border_check(d.x, true);
                    return d.x;
                })
            }
        }, 50);

        setTimeout(function () {
            svg.selectAll(".my_bubble_circle").attr("x", function (d) {
                d.x = border_check(d.x, true);
                return d.x;
            });

            popup = false;
        }, interval_times * 50);

    } else {
        force.resume();
        
        ten_by_ten = setInterval(function () {
            interval_count -= 1;

            if (interval_count > interval_times) {
                clearInterval(ten_by_ten);
            } else {
                svg.selectAll(".my_bubble_circle").attr("x", function (d) {
                    if (d.x > width * 0.5 - maxRadius) {
                        d.x -= 5;
                    }
                    d.x = border_check(d.x, true);
                    return d.x;
                })
            }
        }, 50);

        setTimeout(function () {
            svg.selectAll(".my_bubble_circle").attr("x", function (d) {
                d.x = border_check(d.x, true);
                return d.x;
            });


            right_border = width * 0.6 - maxRadius;
            popup = true;
        }, interval_times * 50);
    }
}