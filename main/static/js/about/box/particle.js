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

    this.show = function (p_five_obj) {
        var pos = this.body.position;
        var angle = this.body.angle;
        p_five_obj.push();
        p_five_obj.translate(pos.x, pos.y);
        p_five_obj.rotate(angle);
        p_five_obj.rectMode(p_five_obj.CENTER);
        p_five_obj.strokeWeight(1);
        p_five_obj.noStroke();
        p_five_obj.fill(styles['color']);
        p_five_obj.ellipse(0, 0, this.r * 2);
        p_five_obj.fill(255, 255, 255);

        if (styles["text"]) {
            p_five_obj.textAlign(p_five_obj.CENTER, p_five_obj.CENTER);
            p_five_obj.textSize(20);
            p_five_obj.text(styles["text"], 0, 0, this.r * 2, this.r * 2);
        }
        p_five_obj.pop();
    }

}