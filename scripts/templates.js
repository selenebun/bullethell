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

MODEL.bombBullet = function() {
    fill('#E67E22');
    ellipse(this.pos.x, this.pos.y, 6, 8);
};

MODEL.bomber = function() {
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

MODEL.sqParticle = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);

    fill(this.color.concat(this.lifespan));
    stroke(0, this.lifespan);
    rect(0, 0, this.r, this.r);

    pop();
};


// AI

AI.basicEnemy = function() {
    this.pos.y += this.speed;
    if (random() < 0.03) this.fire();
};

AI.bomber = function() {
    this.pos.y += this.speed/4;
    this.pos.x += this.goLeft ? this.speed : -this.speed;
    if (random() < 0.005) this.goLeft = !this.goLeft;
    if (random() < 0.008) this.fire();
};

AI.player = function() {
    // Firing weapon (Z key)
    if (keyIsDown(90)) this.fire();
    
    // Movement
    let c = 1 / sqrt(2);
    if (keyIsDown(RIGHT_ARROW)) {
        if (keyIsDown(UP_ARROW)) {
            this.pos.x += this.speed * c;
            this.pos.y -= this.speed * c;
        } else if (keyIsDown(DOWN_ARROW)) {
            this.pos.x += this.speed * c;
            this.pos.y += this.speed * c;
        } else {
            this.pos.x += this.speed;
        }
    } else if (keyIsDown(LEFT_ARROW)) {
        if (keyIsDown(UP_ARROW)) {
            this.pos.x -= this.speed * c;
            this.pos.y -= this.speed * c;
        } else if (keyIsDown(DOWN_ARROW)) {
            this.pos.x -= this.speed * c;
            this.pos.y += this.speed * c;
        } else {
            this.pos.x -= this.speed;
        }
    } else if (keyIsDown(DOWN_ARROW)) {
        this.pos.y += this.speed;
    } else if (keyIsDown(UP_ARROW)) {
        this.pos.y -= this.speed;
    }
};


// Bullets

BULLET.basic = {
    // Display
    model: MODEL.basicBullet,
    // Physics
    r: 5
};

BULLET.bomb = {
    // Display
    model: MODEL.bombBullet,
    // Physics
    r: 6,
    // Methods
    ai: function() {
        this.vel.add(0, 0.1);
        if (this.pos.y + this.r > height) this.explode();
    },
    collideShips() {
        let targets = this.fromPlayer ? enemies : [pl];
        for (let i = 0; i < targets.length; i++) {
            let e = targets[i];
            if (this.collide(e)) {
                this.dead = true;
                ps.push(new ParticleSystem(this.pos.x, this.pos.y, PS.basicExplosion));
                e.damage(this.dmg);
                return;
            }
        }
    },
    explode() {
        this.dead = true;
        ps.push(new ParticleSystem(this.pos.x, this.pos.y, PS.basicExplosion));
        bullets.push(new Bullet(this.pos.x, this.pos.y, -PI/4, 5, BULLET.basic));
        bullets.push(new Bullet(this.pos.x, this.pos.y, -PI/2, 5, BULLET.basic));
        bullets.push(new Bullet(this.pos.x, this.pos.y, -3 * PI/4, 5, BULLET.basic));
    }
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

WEAPON.bomb = function() {
    bullets.push(new Bullet(this.pos.x, this.pos.y, PI/2, 0, BULLET.bomb, this.isPlayer));
};

WEAPON.shotgun = function() {
    let dir = this.isPlayer ? -1 : 1;
    bullets.push(new Bullet(this.pos.x, this.pos.y, dir * PI/4, 5, BULLET.basic, this.isPlayer));
    bullets.push(new Bullet(this.pos.x, this.pos.y, dir * PI/2, 5, BULLET.basic, this.isPlayer));
    bullets.push(new Bullet(this.pos.x, this.pos.y, dir * 3 * PI/4, 5, BULLET.basic, this.isPlayer));
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

SHIP.basic = {
    // AI
    ai: AI.basicEnemy,
    // Display
    model: MODEL.basicShip,
    // Physics
    r: 12,
    // Stats
    weapon: WEAPON.basic,
    // Methods
    init: function() {
        this.speed = random(0.5, 2);
    }
};

SHIP.bomber = {
    ai: AI.bomber,
    // Display
    color: '#009C41',
    model: MODEL.bomber,
    // Physics
    r: 12,
    // Stats
    hp: 2,
    weapon: WEAPON.bomb,
    // Methods
    borders() {
        let r = this.r * 2;
        if (this.pos.x - r < 0) {
            this.pos.x = r;
            this.goLeft = true;
        }
        if (this.pos.x + r > width) {
            this.pos.x = width - r;
            this.goLeft = false;
        }
        if (this.pos.y - r > height) this.dead = true;
    },
    init: function() {
        this.speed = random(1, 3);
        this.goLeft = random() < 0.5;
    }
};

SHIP.boss1 = {};

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
    speed: 4,
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
        bTime = bDuration;
    },
    onDeath: function() {
        loadLevel();
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
