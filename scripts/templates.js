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
    fill(this.color);
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

MODEL.eggBullet = function() {
    fill(this.color);
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

MODEL.boss1 = function() {
    push();
    translate(this.pos.x, this.pos.y);
    if (!this.isPlayer) rotate(PI);

    // Exhaust
    fill('#E74C3C');
    noStroke();
    triangle(9, 26, 23, 26, random(14, 18), random(32, 36));
    triangle(-9, 26, -23, 26, random(-14, -18), random(32, 36));

    // Thrusters
    fill('#7C8A99');
    stroke(0);
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

AI.boss1 = function() {
    if (this.state === 'nav') {
        this.pos.y += this.speed;
        pl.pos.y = lerp(pl.pos.y, 3 * height/4, 0.05);
        if (this.pos.y >= height/8) {
            this.pos.y = height/8;
            this.state = 'sideways';
            this.goLeft = random() < 0.5;
            this.timeLeft = 720;
        }
    } else if (this.state === 'sideways') {
        this.speed = lerp(this.speed, 3, 0.05);
        this.pos.x += this.goLeft ? this.speed : -this.speed;

        // Lightning wall
        if (pl.pos.y - pl.r < height/4) pl.pos.y = height/4 + pl.r;
        noFill();
        stroke('#F9B32F');
        strokeWeight(4);
        beginShape();
        for (let i = 0; i < 21; i++) {
            vertex(width/20 * i, height/4 + random(-10, 10));
        }
        endShape();
        strokeWeight(1);
        
        // Destroy player bullets
        for (let i = 0; i < bullets.length; i++) {
            let b = bullets[i];
            if (b.fromPlayer && b.pos.y < height/4) b.dead = true;
        }

        this.fire();

        if (this.timeLeft > 0) {
            this.timeLeft--;
        } else {
            this.state = 'wait';
            this.timeLeft = 120;
        }
    } else if (this.state === 'wait') {
        this.pos.x = lerp(this.pos.x, width/2, 0.05);
        if (this.timeLeft > 0) {
            this.timeLeft--;
        } else {
            this.state = 'center';
        }
    } else if (this.state === 'center') {
        this.pos.y += this.speed;
        if (this.pos.y >= height/2) {
            this.pos.y = height/2;
            this.state = 'spiral';
            this.fireCool = 40;
            this.a = random(TWO_PI);
            this.timeLeft = 1200;
        }
    } else if (this.state === 'spiral') {
        this.fire();
        
        if (this.timeLeft > 0) {
            this.timeLeft--;
        } else {
            this.state = 'up';
        }
    } else if (this.state === 'up') {
        this.pos.y -= this.speed/4;
        if (this.pos.y <= height/8) {
            this.pos.y = height/8;
            this.state = 'clear';
            this.timeLeft = 60;
        }
    } else if (this.state === 'clear') {
        pl.pos.y = lerp(pl.pos.y, 3 * height/4, 0.05);
        if (this.timeLeft > 0) {
            this.timeLeft--;
        } else {
            this.state = 'sideways';
            this.goLeft = random() < 0.5;
            this.timeLeft = 720;
            this.fireCool = 35;
        }
    }
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
    color: '#E67E22',
    model: MODEL.eggBullet,
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

BULLET.ricochet = {
    // Display
    color: '#2ECC71',
    model: MODEL.basicBullet,
    // Physics
    r: 8,
    // Methods
    borders: function() {
        if (this.bounces < 0) {
            this.dead = true;
            return;
        }
        if (this.pos.x - this.r < 0) {
            this.pos.x = this.r;
            this.vel.x *= -1;
            this.bounces--;
        }
        if (this.pos.x + this.r > width) {
            this.pos.x = width - this.r;
            this.vel.x *= -1;
            this.bounces--;
        }
        if (this.pos.y - this.r < 0) {
            this.pos.y = this.r;
            this.vel.y *= -1;
            this.bounces--;
        }
        if (this.pos.y + this.r > height) {
            this.pos.y = height - this.r;
            this.vel.y *= -1;
            this.bounces--;
        }
    },
    init: function() {
        this.bounces = 1;
    }
}

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
    bullets.push(new Bullet(this.pos.x, this.pos.y, 0, 0, BULLET.bomb, this.isPlayer));
};

WEAPON.boss1 = function() {
    if (this.state === 'sideways') {
        let angs = [PI/4, PI/2, 3*PI/4];
        for (let i = 0; i < angs.length; i++) {
            bullets.push(new Bullet(this.pos.x, this.pos.y, angs[i], 5, BULLET.ricochet));
        }

        if (random() < 0.15) bullets.push(new Bullet(this.pos.x, this.pos.y, 0, 0, BULLET.bomb));
    } else if (this.state === 'spiral') {
        for (let i = 0; i < 6; i++) {
            a = this.a + PI/3 * i;
            bullets.push(new Bullet(this.pos.x - 200, this.pos.y, a, 1, BULLET.basic));
            for (let j = 0; j < 3; j++) {
                bullets.push(new Bullet(this.pos.x + 200, this.pos.y, -a + PI/12 * j, 2, BULLET.basic));
            }
        }
        this.a += radians(10);
    }
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
    r: 14,
    // Stats
    points: 100,
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
    r: 14,
    // Stats
    hp: 1,
    points: 300,
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
    },
    onDeath: function() {
        let a = random(TWO_PI);
        for (let i = 0; i < 6; i++) {
            bullets.push(new Bullet(this.pos.x, this.pos.y, a + PI/3*i, 5, BULLET.basic));
        }
    }
};

SHIP.boss1 = {
    // AI
    ai: AI.boss1,
    // Display
    color: '#009B90',
    model: MODEL.boss1,
    // Physics
    r: 28,
    // Stats
    fireCool: 35,
    hp: 280,
    points: 2000,
    speed: 1,
    weapon: WEAPON.boss1,
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
    },
    init: function() {
        this.state = 'nav';
    }
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
    hp: 7,
    speed: 5,
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
