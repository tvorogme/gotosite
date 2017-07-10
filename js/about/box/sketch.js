// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var engine;
var world;
var particles = [];
var boundaries = [];

var ground;

var mConstraint;

var viewHeight = $(window).height();
var viewWidth = $(window).width();
function setup() {
    var canvas = createCanvas(viewWidth, viewHeight);
    canvas.parent('myworld');
    engine = Engine.create();
    world = engine.world;


    boundaries.push(new Boundary(viewWidth / 2, viewHeight + 250, viewWidth, 500, 0));
    boundaries.push(new Boundary(viewWidth / 2, -250, viewWidth, 500, 0));
    boundaries.push(new Boundary(-250, viewHeight / 2, 500, viewHeight, 0));
    boundaries.push(new Boundary(viewWidth + 250, viewHeight / 2, 500, viewHeight, 0));

    var canvasmouse = Mouse.create(canvas.elt);
    canvasmouse.pixelRatio = pixelDensity();

    var p = new Particle(viewWidth / 2, viewHeight / 2, 100, false);
    particles.push(p);

    var options = {
        mouse: canvasmouse
    }

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

    if (mConstraint.body) {
        var pos = mConstraint.body.position;
        var offset = mConstraint.constraint.pointB;
        var m = mConstraint.mouse.position;

        stroke(0, 255, 0);
        line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
    }
}