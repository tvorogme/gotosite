var width = $(window).width();
var height = 1600;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);


function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

var photo_urls = ["https://goto.msk.ru/camp_summer/images/comments/nast.jpg", "https://goto.msk.ru/camp_summer/images/comments/maxim.jpg"];

var nodes = d3.range(2).map(function (i) {
    return {radius: getRandom(100, 200), id: i, url: photo_urls[i]};
});
var nodesCopy = $.extend(true, [], nodes);
function collide(node) {
    var r = node.radius + 160;
    var nx1 = node.x - r;
    var nx2 = node.x + r;
    var ny1 = node.y - r;
    var ny2 = node.y + r;
    return function (quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
            var x = node.x - quad.point.x;
            var y = node.y - quad.point.y;
            var l = Math.sqrt(x * x + y * y);
            var npr = node.radius + quad.point.radius;
            if (l < npr) {
                l = (l - npr) / l * 0.5;
                x *= l;
                node.x -= x;
                y *= l;
                node.y -= y;
                quad.point.x += x;
                quad.point.y += y;
            }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    };
}

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
        })).enter();

    svg.selectAll(".node").data(pack.nodes({"children": nodes})
        .filter(function (d) {
            return !d.children;
        })).enter().append('defs')
        .append('pattern')
        .attr('id', function (d) {
            return (d.id + "-icon");
        }) // just create a unique id (id comes from the json)
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
        })
        .attr("cx", function (d) {
            return d.x;
        })
        .attr("cy", function (d) {
            return d.y;
        }).on("mouseover", function (d) {
        d.radius += 10;
        d3.select(this).attr("r", d.radius)
    }).on("mouseout", function (d) {
        d.radius -= 10;
        d3.select(this).attr("r", d.radius)
    }).style("fill", function (d) {
        return ("url(#" + d.id + "-icon-img)");
    })

}

function forceup() {
    var force = d3.layout.force()
        .nodes(nodes)
        .gravity(0.1)
        .charge(0)
        .size([width, height])
        .start();

    var drag = force.drag();

    force.on("tick", function () {
        var q = d3.geom.quadtree(nodes);
        var i = 0;
        var n = nodes.length;

        while (++i < n) {
            q.visit(collide(nodes[i]));
        }

        svg.selectAll("circle")
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            });
    });

    d3.selectAll("circle").call(drag);
}

packup();
forceup();