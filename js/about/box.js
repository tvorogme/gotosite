var renderer;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Physics(function (world) {

    var viewWidth = $(document).width();
    var viewHeight = $(document).height();

    // renderer = Physics.renderer('pixi', {
    //     el: 'myworld',
    //     width: viewWidth,
    //     height: viewHeight,
    //     meta: false
    //     // styles: {
    //     //     'circle': {
    //     //         strokeStyle: 'rgb(67, 180, 152)',
    //     //         lineWidth: 1,
    //     //         fillStyle: 'rgb(67, 180, 152)',
    //     //         angleIndicator: false
    //     //     },
    //     //     'convex-polygon': {
    //     //         strokeStyle: 'rgb(255, 140, 102)',
    //     //         lineWidth: 1,
    //     //         fillStyle: 'rgb(255, 140, 102)',
    //     //         angleIndicator: false
    //     //     }
    //     // }
    // });

    var renderer = Physics.renderer('pixi', {
        el: 'myworld',
        width: viewWidth,
        height: viewHeight,
        meta: false
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
    for (var i = 0; i < 3; i++) {

        var a = viewWidth / getRandomInt(4, 10);
        world.add(Physics.body('convex-polygon', {
            x: x_pos[i],
            y: -100,
            vx: 0,
            vy: 0,
            angle: 30 * Math.random(),
            vertices: [{x: 0, y: 0}, {x: a, y: 0}, {x: a, y: a}, {x: 0, y: a}]
        }));


        var myWheel = Physics.body('circle', {
            x: x_pos[i],
            y: -100,
            radius: viewWidth / 10 * Math.random(),
            mass: 0.1
        });
        world.add(myWheel);


    }

    for (i = 0; i < 15; i++) {

        a = viewWidth / 18 * Math.random();
        world.add(Physics.body('convex-polygon', {
            x: x_pos.random(),
            y: -100,
            vx: 0,
            vy: 0,
            angle: 30 * Math.random(),
            cof: 0,
            vertices: [{x: 0, y: 0}, {x: a, y: 0}, {x: a, y: a}, {x: 0, y: a}]
        }));


        myWheel = Physics.body('circle', {
            x: x_pos.random(),
            y: -100,
            radius: viewWidth / 30 * Math.random(),
            text: 'lol'
        });

        world.add(myWheel);
    }

    world.add(Physics.behavior('body-collision-detection'));
    world.add(Physics.behavior('sweep-prune'));

    // ensure objects bounce when edge collision is detected
    world.add(Physics.behavior('body-impulse-response'));

    // add some gravity
    world.add(Physics.behavior('constant-acceleration'));


    // subscribe to ticker to advance the simulation
    Physics.util.ticker.subscribe(function (time, dt) {
        world.step(time);
    });

    // start the ticker
    Physics.util.ticker.start();


});
