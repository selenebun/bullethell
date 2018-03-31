const MODEL = {};
MODEL.bullet = {};
MODEL.item = {};
MODEL.particle = {};
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
};


// Item models

MODEL.item.basic = function() {
    fill(this.color);
    stroke(0);
    rectMode(RADIUS);
    rect(this.pos.x - 0.5, this.pos.y - 0.5, this.r/2, this.r/2);
}


// Particle models

MODEL.particle.square = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);

    fill(this.color.concat(this.lifespan));
    stroke(0, this.lifespan);
    rectMode(RADIUS);
    rect(0, 0, this.r, this.r);

    pop();
};


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


// Boss models

MODEL.ship.boss0 = function(isPlayer) {
    push();
    translate(this.pos.x, this.pos.y);
    if (!isPlayer) rotate(180);

    // Exhaust
    fill('#E74C3C');
    noStroke();
    triangle(9, 26, 23, 26, random(14, 18), random(32, 36));
    triangle(-9, 26, -23, 26, random(-14, -18), random(32, 36));

    // Thrusters
    fill('#7C8A99');
    stroke(0);
    rectMode(RADIUS);
    rect(15.5, 26, 8, 3);
    rect(-16.5, 26, 8, 3);

    // Front fins
    fill('#7F8C8D');
    triangle(4, 0, 4, -38, 24, 0);
    triangle(-4, 0, -4, -38, -24, 0);

    // Wings
    fill('#BDC3C7');
    triangle(0, 4, 10, 24, 36, -16);
    triangle(0, 4, -10, 24, -36, -16);

    // Rear fin
    fill('#95A5A6');
    beginShape();
    vertex(0, 0);
    vertex(30, 16);
    vertex(30, 26);
    vertex(-30, 26);
    vertex(-30, 16);
    endShape(CLOSE);

    // Canopy
    fill(this.color);
    ellipse(0, 4, 15, 17);

    pop();
};
