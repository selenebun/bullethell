const AI = {};
const BULLET = {};
const MODEL = {};
const PARTICLE = {};
const POWERUP = {};
const PS = {};
const SHIP = {};
const WEAPON = {};


// Models

MODEL.basicBullet = function() {
    fill('#ECF0F1');
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
};

MODEL.basicShip = function() {
    push();
    translate(this.pos.x, this.pos.y);
    if (!this.isPlayer) rotate(PI);

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
    fill(this.color);
    ellipse(0, 1, 6, 8);

    pop();
};

MODEL.sqParticle = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);

    fill(this.color.concat(this.lifespan));
    stroke(0, this.lifespan);
    rect(0, 0, this.r, this.r);

    pop();
}


// AI

AI.basicEnemy = function() {
    if (random() < 0.05) this.fire();
};

AI.player = function() {
    // Firing weapon (Z key)
    if (keyIsDown(90)) this.fire();
    
    // Movement
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

WEAPON.basic = function() {
    let dir = this.isPlayer ? -1 : 1;
    bullets.push(new Bullet(this.pos.x, this.pos.y, dir * PI/2, 4, BULLET.basic, this.isPlayer));
};

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


// Powerups


// Ships

SHIP.basicEnemy = {
    // AI
    ai: AI.basicEnemy,
    // Display
    model: MODEL.basicShip,
    // Physics
    r: 12,
    // Stats
    weapon: WEAPON.basic
};

SHIP.player = {
    // AI
    ai: AI.player,
    // Display
    color: '#19B5FE',
    model: MODEL.basicShip,
    // Misc
    isPlayer: true,
    // Physics
    r: 8,
    // Stats
    fireCool: 8,
    hp: 2,
    weapon: WEAPON.smallBasic,
    // Methods
    damage: function(amt) {
        if (bTime > 0) return;
        if (typeof amt === 'undefined') amt = 1;
        this.hp > 0 ? this.hp -= amt : this.dead = true;
        bTime = bDuration;
    }
};


// Particles

PARTICLE.fire = {
    // Display
    model: MODEL.sqParticle,
    // Methods
    init: function() {
        // Display
        this.color = [200 + random(55), random(127), random(31)];

        // Misc
        this.decay = random(4, 8);

        // Physics
        this.angle = random(TWO_PI);
        this.angVel = random(-2, 2);
        this.r = random(3, 6);
    }
};


// Particle systems

PS.basicExplosion = {
    num: 32,
    pTemp: PARTICLE.fire,
    speed: 3
};
