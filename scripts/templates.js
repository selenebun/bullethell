const AI = {};
const BULLET = {};
const MODEL = {};
const POWERUP = {};
const SHIP = {};
const WEAPON = {};


// Models

MODEL.basicBullet = function() {
    fill('#ECF0F1');
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
};

MODEL.player = function() {
    push();
    translate(this.pos.x, this.pos.y);

    // Exhaust
    fill('#E74C3C');
    noStroke();
    triangle(-3, 14, 3, 14, random(-2, 2), random(20, 24));

    // Thruster
    fill('#7C8A99');
    stroke(0);
    rectMode(RADIUS);
    rect(-0.5, 4, 6, 10);

    // Rear fins
    fill('#ACBAC9');
    triangle(3, 2, 3, 10, 22, 16);
    triangle(-3, 2, -3, 10, -22, 16);

    // Wings
    fill('#BDC3C7');
    triangle(1, 3, 1, -24, 12, 6);
    triangle(-1, 3, -1, -24, -12, 6);

    // Canopy
    fill('#19B5FE');
    ellipse(0, 1, 6, 8);

    pop();
};


// AI

AI.player = function() {
    if (keyIsDown(RIGHT_ARROW)) this.pos.x += plSpeed;
    if (keyIsDown(LEFT_ARROW)) this.pos.x -= plSpeed;
    if (keyIsDown(DOWN_ARROW)) this.pos.y += plSpeed;
    if (keyIsDown(UP_ARROW)) this.pos.y -= plSpeed;
};


// Bullets

BULLET.basic = {
    // Display
    model: MODEL.basicBullet,
    // Physics
    r: 4
};


// Powerups


// Ships

SHIP.player = {
    // AI
    ai: AI.player,
    // Display
    model: MODEL.player,
    // Physics
    r: 10,
    // Stats
    hp: 3,
    // Methods
    damage: function(amt) {
        if (bTime > 0) return;
        if (typeof amt === 'undefined') amt = 1;
        this.hp > 0 ? this.hp -= amt : this.dead = true;
    }
};


// Weapons
