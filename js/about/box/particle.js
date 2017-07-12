function Particle(x, y, r, fixed, styles) {
    var options = {
        friction: 0,
        restitution: 0.95,
        isStatic: fixed
    };

    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);

    this.isOffScreen = function () {
        var pos = this.body.position;
        return (pos.y > height + 100);
    }

    this.removeFromWorld = function () {
        World.remove(world, this.body);
    }

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        noStroke();
        fill(styles['color']);
        ellipse(0, 0, this.r * 2);
        fill(255, 255, 255);

        if (styles["text"]) {
            textAlign(CENTER, CENTER);
            textSize(20);
            text(styles["text"], 0, 0, this.r * 2, this.r * 2);
        }
        pop();
    }

}