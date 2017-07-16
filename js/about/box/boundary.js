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
        p_five_obj.rect(0, 0, this.w, this.h);
        p_five_obj.fill(255, 255, 255);

        if (styles["text"]) {
            p_five_obj.textAlign(p_five_obj.CENTER, p_five_obj.CENTER);
            p_five_obj.textSize(20);
            p_five_obj.text(styles["text"], 0, 0, this.w, this.h);
        }
        p_five_obj.pop();
    }

}