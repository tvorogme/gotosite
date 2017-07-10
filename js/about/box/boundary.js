function Boundary(x, y, w, h, a, fixed, styles) {

    var options;

    if (fixed) {
        options = {
            friction: 0,
            restitution: 0.95,
            angle: a,
            isStatic: fixed
        }
    } else {
        options = {
            friction: 0,
            restitution: 0.5,
            angle: a,
            isStatic: fixed
        }
    }

    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        // rotate(angle);
        // rectMode(CENTER);
        // strokeWeight(1);
        // noStroke();
        // fill(styles['color']);
        // rect(0, 0, this.w, this.h);

        textSize(32);
        text("word", 0, 0);
        fill(0, 102, 153);


        pop();
    }

}