const ENEMY = {};

ENEMY.basic = {
    // Display
    color: '#E74C3C',
    // Stats
    maxSpeed: 2,
    minSpeed: 0.5,
    // Methods
    ai: function() {
        if (random() < 0.02) this.fire();
    },
    attack: function() {
        emitBullets(this.pos.x, this.pos.y, 90, [0], 4, 4, BULLET.basic);
    },
    init: function() {
        this.maxHp = this.hp;
        this.speed = random(this.minSpeed, this.maxSpeed);
        this.vel = createVector(0, this.speed);
    }
};

ENEMY.bomber = {
    // Display
    color: '#009C41',
    model: MODEL.ship.bomber,
    // Stats
    hp: 1,
    maxSpeed: 3,
    minSpeed: 1,
    points: 300,
    // Methods
    ai: function() {
        if (random() < 0.005) this.vel.x *= -1;
        if (random() < 0.007) this.fire();
    },
    attack: function() {
        emitBullets(this.pos.x, this.pos.y, -90, [0], 0, 0, BULLET.bomb);
    },
    init: function() {
        this.maxHp = this.hp;
        this.speed = random(this.minSpeed, this.maxSpeed);
        this.vel = createVector(this.speed * randSign(), this.speed/4);
    },
    onHitLeft: function() {
        this.pos.x = this.mapLeft + this.r * this.edgeRadius;
        this.vel.x *= -1;
    },
    onHitRight: function() {
        this.pos.x = this.mapRight - this.r * this.edgeRadius;
        this.vel.x *= -1;
    },
    onKilled: function() {
        emitBullets(this.pos.x, this.pos.y, random(360), [0, 60, 120, 180, 240, 300], 5, 5, BULLET.basic);
    }
};
