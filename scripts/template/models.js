const MODEL = {};
MODEL.bullet = {};
MODEL.item = {};
MODEL.particle = {};
MODEL.ship = {};


// Bullet models

MODEL.bullet.basic = function() {
    fill(this.color);
    stroke(0, MODEL_LINE_ALPHA);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
};

MODEL.bullet.egg = function() {
    fill(this.color);
    stroke(0, MODEL_LINE_ALPHA);
    ellipse(this.pos.x, this.pos.y, this.r, this.r * 4/3);
};

MODEL.bullet.needle = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);

    fill(this.color);
    stroke(0, MODEL_LINE_ALPHA);
    let back = -this.r * 3/2;
    let front = this.r * 4;
    let side = this.r * 3/2;
    triangle(back, side, back, -side, front, 0);

    pop();
};


// Item models

MODEL.item.health = function() {
    // Draw base
    fill(this.color);
    stroke(0, MODEL_LINE_ALPHA);
    ellipse(this.pos.x, this.pos.y, 12, 12);

    // Draw cross
    fill('#ECF0F1');
    noStroke();
    rectMode(RADIUS);
    rect(this.pos.x, this.pos.y, 8, 3);
    rect(this.pos.x, this.pos.y, 3, 8);
};

MODEL.item.square = function() {
    fill(this.color);
    stroke(0, MODEL_LINE_ALPHA);
    rectMode(RADIUS);
    rect(this.pos.x - 0.5, this.pos.y - 0.5, this.r/2, this.r/2);
};


// Particle models

MODEL.particle.square = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);

    fill(this.color.concat(this.lifespan));
    stroke(0, this.lifespan * MODEL_LINE_ALPHA/255);
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
    let xOff = 0;
    let yOff = 0;
    if (isPlayer) {
        if (this.vel.x > 0) {
            xOff = -2;
        } else if (this.vel.x < 0) {
            xOff = 2;
        }
        if (this.vel.y > 0) {
            yOff = -4;
        } else if (this.vel.y < 0) {
            yOff = 4;
        }
    }
    fill('#E74C3C');
    noStroke();
    triangle(-3, 14, 3, 14, random(-2, 2) + xOff, random(20, 24) + yOff);

    // Thruster
    fill('#7C8A99');
    stroke(0, MODEL_LINE_ALPHA);
    strokeWeight(2);
    rectMode(RADIUS);
    rect(-0, 3, 6, 10);

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
    stroke(0, MODEL_LINE_ALPHA);
    strokeWeight(2);
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

MODEL.ship.ricochet = function(isPlayer) {
    push();
    translate(this.pos.x, this.pos.y);
    if (!isPlayer) rotate(180);

    // Exhaust
    fill('#E74C3C');
    noStroke();
    triangle(-6, 22, 6, 22, random(-2, 2), random(28, 32));
    triangle(-26.5, 14, -14.5, 14, random(-18.5, -22.5), random(20, 24));
    triangle(26.5, 14, 14.5, 14, random(18.5, 22.5), random(20, 24));

    // Thrusters
    fill('#657576');
    stroke(0, MODEL_LINE_ALPHA);
    strokeWeight(2);
    rectMode(CENTER);
    rect(0, 15.5, 14, 16);
    rect(-20.5, 12.5, 14, 8);
    rect(20.5, 12.5, 14, 8);

    // Wings
    fill('#7F8C8D');
    beginShape();
    vertex(-2, 8);
    vertex(-2, -12);
    vertex(-28, -2);
    vertex(-38, 14);
    endShape(CLOSE);
    beginShape();
    vertex(2, 8);
    vertex(2, -12);
    vertex(28, -2);
    vertex(38, 14);
    endShape(CLOSE);

    // Frame
    fill('#ACBAC9');
    arc(-1.5, 0, 13, 19, 90, 270, CHORD);
    arc(1.5, 0, 13, 19, 270, 450, CHORD);

    // Canopy
    fill(this.color);
    ellipse(0, 1, 6, 8);

    pop();
};

MODEL.ship.shotgunner = function(isPlayer) {
    push();
    translate(this.pos.x, this.pos.y);
    if (!isPlayer) rotate(180);

    // Exhaust
    fill('#E74C3C');
    noStroke();
    triangle(-3, 14, 3, 14, random(-2, 2), random(20, 26));

    // Thruster
    fill('#7C8A99');
    stroke(0, MODEL_LINE_ALPHA);
    strokeWeight(2);
    rectMode(RADIUS);
    rect(0, 8, 6, 6);

    // Rear wings
    fill('#657576');
    triangle(0, 8, 14, -6, 20, 14);
    triangle(0, 8, -14, -6, -20, 14);

    // Front wings
    fill('#7F8C8D');
    triangle(0, 3, 10, -6, 30, 10);
    triangle(0, 3, -10, -6, -30, 10);

    // Frame
    fill('#ACBAC9');
    arc(0, 7, 24, 24, 200, 340, CHORD);

    // Canopy
    fill(this.color);
    ellipse(0, 0, 6, 8);

    pop();
};

MODEL.ship.splitter = function(isPlayer) {
    push();
    translate(this.pos.x, this.pos.y);
    if (!isPlayer) rotate(180);

    // Exhaust
    fill('#E74C3C');
    noStroke();
    triangle(-3, 20, 3, 20, random(-2, 2), random(26, 30));

    // Thruster
    fill('#7C8A99');
    stroke(0, MODEL_LINE_ALPHA);
    strokeWeight(2);
    rectMode(RADIUS);
    rect(0, 10, 6, 10);

    // Rear wings
    fill('#657576');
    triangle(8, -14, 0, 0, 34, 20);
    triangle(-8, -14, 0, 0, -34, 20);

    // Front wings
    fill('#7F8C8D');
    triangle(0, -16, 0, 0, 34, 0);
    triangle(0, -16, 0, 0, -34, 0);

    // Frame
    fill('#ACBAC9');
    ellipse(0, 0, 12, 16);

    // Canopy
    fill(this.color);
    ellipse(0, -2, 7, 9);

    pop();
};

MODEL.ship.turret = function(isPlayer) {
    push();
    translate(this.pos.x, this.pos.y);
    if (!isPlayer) rotate(180);


    // Exhaust
    fill('#E74C3C');
    noStroke();
    triangle(-5, -17, 5, -17, random(-2, 2), random(-23, -29));

    stroke(0, MODEL_LINE_ALPHA);
    strokeWeight(2);
    rectMode(RADIUS);
    

    // Turret barrel
    push();
    let a = this.angleTo(pl);
    if (a > -180 && a < 0) {
        rotate(a);
    } else if (a >= 90) {
        rotate(180);
    }

    // Barrel
    fill('#ACBAC9');
    rect(-26, 0, 10, 4);

    // Connector
    fill('#657576');
    rect(-16, 0, 4, 7);

    // Nozzle
    fill('#657576');
    rect(-36, 0, 3, 6);

    pop();


    // Turret body
    fill('#7F8C8D');
    ellipse(0, 0, 16, 16);

    // Thruster
    fill('#7C8A99');
    rect(0, -12, 10, 5);

    // Frame
    fill('#ACBAC9');
    beginShape();
    vertex(-19, -3);
    vertex(19, -3);
    vertex(16, -12);
    vertex(-16, -12);
    endShape(CLOSE);

    // Border
    fill('#657576');
    rect(0, 0, 21, 3);

    // Canopy
    fill(this.color);
    ellipse(0, 0, 6, 8);

    pop();
};


// Boss models

MODEL.ship.boss1 = function(isPlayer) {
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
    stroke(0, MODEL_LINE_ALPHA);
    strokeWeight(2);
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

MODEL.ship.heavyBomber = function(isPlayer) {
    push();
    translate(this.pos.x, this.pos.y);
    if (!isPlayer) rotate(180);

    // Exhaust
    fill('#E74C3C');
    noStroke();
    triangle(8, 48, -8, 48, random(-4, 4), random(52, 56));
    triangle(40, 52, 24, 52, random(28, 36), random(56, 60));
    triangle(-40, 52, -24, 52, -random(28, 36), random(56, 60));

    // Thrusters
    fill('#7C8A99');
    stroke(0, MODEL_LINE_ALPHA);
    strokeWeight(2);
    rectMode(RADIUS);
    rect(0, 42, 12, 6);
    rect(32, 44, 12, 8);
    rect(-32, 44, 12, 8);

    // Front wings
    fill('#7F8C8D');
    triangle(0, -10, 10, 40, 80, -40);
    triangle(0, -10, -10, 40, -80, -40);

    // Rear wings
    fill('#657576');
    triangle(6, -50, 6, 30, 70, 60);
    triangle(-6, -50, -6, 30, -70, 60);

    // Frame
    fill('#95A5A6');
    arc(0, -22, 64, 64, 20, 160, CHORD);

    // Canopy
    fill(this.color);
    ellipse(0, 4, 20, 26);

    pop();
};
