const MODEL = {};
MODEL.bullet = {};
MODEL.ship = {};


// Bullet models

MODEL.bullet.basic = function() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
};

MODEL.bullet.egg = function() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r, this.r * 4/3);
}


// Ship models

MODEL.ship.basic = function(isPlayer) {
    push();
    translate(this.pos.x, this.pos.y);
    if (!isPlayer) rotate(180);

    // Exhaust
    fill('#E74C3C');
    noStroke();
    triangle(-3, 14, 3, 14, random(-2, 2), random(20, 24));

    // Thruster
    fill('#7C8A99');
    stroke(0);
    rectMode(RADIUS);
    rect(-0.5, 3.5, 6, 10);

    // Rear fins
    fill('#ACBAC9');
    triangle(3, 2, 3, 10, 22, 16);
    triangle(-3, 2, -3, 10, -22, 16);

    // Wings
    fill('#BDC3C7');
    triangle(1, 3, 1, -24, 12, 6);
    triangle(-1, 3, -1, -24, -12, 6);

    // Canopy
    fill(this.color);
    ellipse(0, 1, 6, 8);

    pop();
};

MODEL.ship.bomber = function(isPlayer) {
    push();
    translate(this.pos.x, this.pos.y);
    if (!this.isPlayer) rotate(180);

    // Exhaust
    fill('#E74C3C');
    noStroke();
    triangle(-3, 14, 3, 14, random(-2, 2), random(20, 24));

    // Thruster
    fill('#7C8A99');
    stroke(0);
    rect(-0.5, 3.5, 6, 10);

    // Front fins
    fill('#BDC3C7');
    triangle(2, 4, 2, -4, 20, -8);
    triangle(-2, 4, -2, -4, -20, -8);

    // Rear fins
    fill('#ACBAC9');
    triangle(2, -2, 2, 11, 24, 16);
    triangle(-2, -2, -2, 11, -24, 16);

    // Canopy
    fill(this.color);
    ellipse(0, 0, 6, 8);

    pop();
};
