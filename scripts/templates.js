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
    let c = 1 / sqrt(2);
    if (keyIsDown(RIGHT_ARROW)) {
        if (keyIsDown(UP_ARROW)) {
            this.pos.x += plSpeed * c;
            this.pos.y -= plSpeed * c;
        } else if (keyIsDown(DOWN_ARROW)) {
            this.pos.x += plSpeed * c;
            this.pos.y += plSpeed * c;
        } else {
            this.pos.x += plSpeed;
        }
    } else if (keyIsDown(LEFT_ARROW)) {
        if (keyIsDown(UP_ARROW)) {
            this.pos.x -= plSpeed * c;
            this.pos.y -= plSpeed * c;
        } else if (keyIsDown(DOWN_ARROW)) {
            this.pos.x -= plSpeed * c;
            this.pos.y += plSpeed * c;
        } else {
            this.pos.x -= plSpeed;
        }
    } else if (keyIsDown(DOWN_ARROW)) {
        this.pos.y += plSpeed;
    } else if (keyIsDown(UP_ARROW)) {
        this.pos.y -= plSpeed;
    }
};


// Bullets

BULLET.basic = {
    // Display
    model: MODEL.basicBullet,
    // Physics
    r: 5
};

BULLET.small = {
    // Display
    model: MODEL.basicBullet,
    // Physics
    r: 2,
};


// Weapons

WEAPON.smallBasic = function() {
    let dir = this.isPlayer ? -1 : 1;
    bullets.push(new Bullet(this.pos.x, this.pos.y, dir * PI/2, 5, BULLET.small, this.isPlayer));
};

WEAPON.smallDual = function() {
    let dir = this.isPlayer ? -1 : 1;
    bullets.push(new Bullet(this.pos.x + 5, this.pos.y, dir * PI/2, 5, BULLET.small, this.isPlayer));
    bullets.push(new Bullet(this.pos.x - 5, this.pos.y, dir * PI/2, 5, BULLET.small, this.isPlayer));
};

WEAPON.smallShotgun = function() {
    let dir = this.isPlayer ? -1 : 1;
    bullets.push(new Bullet(this.pos.x, this.pos.y, dir * PI/4, 5, BULLET.small, this.isPlayer));
    bullets.push(new Bullet(this.pos.x, this.pos.y, dir * PI/2, 5, BULLET.small, this.isPlayer));
    bullets.push(new Bullet(this.pos.x, this.pos.y, dir * 3 * PI/4, 5, BULLET.small, this.isPlayer));
};

WEAPON.basic = function() {
    let dir = this.isPlayer ? -1 : 1;
    bullets.push(new Bullet(this.pos.x, this.pos.y, dir * PI/2, 5, BULLET.basic, this.isPlayer));
};


// Powerups


// Ships

SHIP.player = {
    // AI
    ai: AI.player,
    // Display
    model: MODEL.player,
    // Misc
    isPlayer: true,
    // Physics
    r: 8,
    // Stats
    hp: 3,
    weapon: WEAPON.smallBasic,
    // Methods
    borders: function() {
        let r = this.r * 2;
        if (this.pos.x - r < 0) this.pos.x = r;
        if (this.pos.x + r > width) this.pos.x = width - r;
        if (this.pos.y - r < 0) this.pos.y = r;
        if (this.pos.y + r > height) this.pos.y = height - r;
    },
    damage: function(amt) {
        if (bTime > 0) return;
        if (typeof amt === 'undefined') amt = 1;
        this.hp > 0 ? this.hp -= amt : this.dead = true;
    }
};
