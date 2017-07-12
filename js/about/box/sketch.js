// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint;

var engine;
var world;
var particles = [];
var boundaries = [];
var colors = ["rgb(255, 140, 102)", "rgb(81, 13, 129)", "rgb(67, 180, 152)", "rgb(238, 229, 58)"];


Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
};

var ground;

var mConstraint;

var viewHeight = $(window).height();
var viewWidth = $(window).width();
function setup() {
    var canvas = createCanvas(viewWidth, viewHeight);
    canvas.parent('myworld');
    engine = Engine.create();
    world = engine.world;


    boundaries.push(new Boundary(viewWidth / 2, viewHeight + 250, viewWidth, 500, 0, true, {color: 0}));
    boundaries.push(new Boundary(viewWidth / 2, -250, viewWidth, 500, 0, true, {color: 0}));
    boundaries.push(new Boundary(-250, viewHeight / 2, 500, viewHeight, 0, true, {color: 0}));
    boundaries.push(new Boundary(viewWidth + 250, viewHeight / 2, 500, viewHeight, 0, true, {color: 0}));

    var canvasmouse = Mouse.create(canvas.elt);
    canvasmouse.pixelRatio = pixelDensity();

    for (var i = 0; i < 3; i++) {
        var p = new Particle(viewWidth / 2, viewHeight / 2, viewWidth / Common.random(8, 11), false, {
            color: colors.random(),
            text: "100 участников"
        });
        particles.push(p);

        var storona_kvadrata = viewWidth / Common.random(8, 11);
        boundaries.push(new Boundary(viewWidth / 2, viewHeight / 2, storona_kvadrata, storona_kvadrata, 0, false, {
            color: colors.random(),
            text: "100 участников"
        }));
    }


    var options = {
        mouse: canvasmouse
    };

    canvasmouse.element.removeEventListener("mousewheel", canvasmouse.mousewheel);
    canvasmouse.element.removeEventListener("DOMMouseScroll", canvasmouse.mousewheel);

    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
    console.log(mConstraint);
}


function draw() {
    background(255);
    Engine.update(engine);
    for (var i = 0; i < boundaries.length; i++) {
        boundaries[i].show();
    }

    for (var i = 0; i < particles.length; i++) {
        particles[i].show();
    }
}