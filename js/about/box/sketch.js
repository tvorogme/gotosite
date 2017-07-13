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

    var options = {
        mouse: canvasmouse
    };

    canvasmouse.element.removeEventListener("mousewheel", canvasmouse.mousewheel);
    canvasmouse.element.removeEventListener("DOMMouseScroll", canvasmouse.mousewheel);

    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);


    var max_big_shar = 11;
    var min_big_shar = 6;

    var max_little_shar = 30;
    var min_little_shar = 15;

    var max_big_boundary = 7;
    var min_big_boundary = 4;

    var max_little_boundary = 25;
    var min_little_boundary = 9;

    var max_r = viewWidth / Math.min(min_big_boundary, min_big_shar);

    var first_spawn_x = viewWidth - max_r / 2;
    var first_spawn_y = max_r / 2;

    var second_spawn_x = max_r / 2;
    var second_spawn_y = max_r / 2;


    var now_spawn_x, now_spawn_y;

    var i1 = 1;

    function myLoop1() {
        setTimeout(function () {
            if (i1 % 2 === 0) {
                now_spawn_x = first_spawn_x;
                now_spawn_y = first_spawn_y;
            } else {
                now_spawn_x = second_spawn_x;
                now_spawn_y = second_spawn_y;
            }

            particles.push(new Particle(now_spawn_x, now_spawn_y, viewWidth / Common.random(min_little_shar, max_little_shar), false, {
                color: colors.random()
            }));
            i1++;

            if (i1 < 4) {
                myLoop1();
            }
        }, 1000)
    }

    myLoop1();

    var i2 = 1;

    function myLoop2() {
        setTimeout(function () {

            if (i2 % 2 !== 0) {
                now_spawn_x = first_spawn_x;
                now_spawn_y = first_spawn_y;
            } else {
                now_spawn_x = second_spawn_x;
                now_spawn_y = second_spawn_y;
            }


            var storona_kvadrata = viewWidth / Common.random(min_little_boundary, max_little_boundary);
            boundaries.push(new Boundary(now_spawn_x, now_spawn_y, storona_kvadrata, storona_kvadrata, 0, false, {
                color: colors.random()
            }));

            i2++;
            if (i2 < 4) {
                myLoop2();
            }
        }, 1000)
    }

    myLoop2();


    var i3 = 1;

    function myLoop3() {
        setTimeout(function () {
            if (i3 % 2 === 0) {
                now_spawn_x = first_spawn_x;
                now_spawn_y = first_spawn_y;
            } else {
                now_spawn_x = second_spawn_x;
                now_spawn_y = second_spawn_y;
            }

            particles.push(new Particle(now_spawn_x, now_spawn_y, viewWidth / Common.random(min_big_shar, max_big_shar), false, {
                color: colors.random(),
                text: "100 участников"
            }));
            i3++;
            if (i3 < 2) {
                myLoop3();
            }
        }, 1000)
    }

    myLoop3();

    var i = 1;

    function myLoop() {
        setTimeout(function () {

            if (i % 2 !== 0) {
                now_spawn_x = first_spawn_x;
                now_spawn_y = first_spawn_y;
            } else {
                now_spawn_x = second_spawn_x;
                now_spawn_y = second_spawn_y;
            }

            var storona_kvadrata = viewWidth / Common.random(min_big_boundary, max_big_boundary);
            boundaries.push(new Boundary(now_spawn_x, now_spawn_y, storona_kvadrata, storona_kvadrata, 0, false, {
                color: colors.random(),
                text: "100 участников"
            }));

            i++;
            if (i < 3) {
                myLoop();
            }
        }, 1000)
    }

    myLoop();
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