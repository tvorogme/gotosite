var renderer;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


Physics(function (world) {

    var viewWidth = $(window).width();
    var viewHeight = $(window).height();


    var renderer = Physics.renderer('pixi', {
        el: 'myworld',
        width: viewWidth,
        height: viewHeight
    });

    world.add(renderer);

    world.subscribe('step', function () {
        world.render();
    });


    var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

    world.add(Physics.behavior('edge-collision-detection', {
        aabb: viewportBounds,
        restitution: 0.3
    }));

    var x_pos = [viewWidth / 2, viewWidth / 5, viewWidth];

    var texts = ['20 школ', '3000 участников', '2 хакатона', '100 городов', '600 экспертов'];
    var k = 0;
    for (var i = 0; i < 3; i++) {

        var a = viewWidth / getRandomInt(5, 8);
        var body = Physics.body('convex-polygon', {
            x: x_pos[i],
            y: -100,
            vx: 0,
            vy: 0,
            angle: Math.random(),
            vertices: [{x: 0, y: 0}, {x: a, y: 0}, {x: a, y: a}, {x: 0, y: a}],
            text: {
                text: texts[k], style: {
                    fontFamily: 'Ubuntu',
                    fontSize: 13,
                    fill: '#ffffff',
                    strokeThickness: 0,
                    wordWrap: true,
                    wordWrapWidth: j,
                    align: 'center'
                }
            }
        });

        world.add(body);

        k += 1;

        var j = viewWidth / getRandomInt(8, 11);
        var myWheel = Physics.body('circle', {
            x: x_pos[i],
            y: -100,
            radius: j,
            text: {
                text: texts[k], style: {
                    fontFamily: 'Ubuntu',
                    fontSize: 13,
                    fill: '#ffffff',
                    strokeThickness: 0,
                    wordWrap: true,
                    wordWrapWidth: j,
                    align: 'center'
                }
            }
        });

        world.add(myWheel);


    }

    for (i = 0; i < 10; i++) {

        a = viewWidth / getRandomInt(10, 30);

        var body = Physics.body('convex-polygon', {
            x: x_pos.random(),
            y: -100,
            vx: 0,
            vy: 0,
            angle: Math.random(),
            vertices: [{x: 0, y: 0}, {x: a, y: 0}, {x: a, y: a}, {x: 0, y: a}],
        });


        world.add(body);


        myWheel = Physics.body('circle', {
            x: x_pos.random(),
            y: -100,
            radius: viewWidth / getRandomInt(30, 61)
        });

        world.add(myWheel);
    }

    world.add(Physics.behavior('body-collision-detection'));
    world.add(Physics.behavior('sweep-prune'));
    world.add(Physics.behavior('body-impulse-response'));
    world.add(Physics.behavior('constant-acceleration'));


    // subscribe to ticker to advance the simulation
    Physics.util.ticker.subscribe(function (time, dt) {
        world.step(time);
    });


    // start the ticker
    Physics.util.ticker.start();

    setTimeout(function () {
        Physics.util.ticker.stop();
    }, 5000);

});

function run_world() {
    Physics.util.ticker.start();
}