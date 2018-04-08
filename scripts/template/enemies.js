const ENEMY = {};

ENEMY.aimer = {
    // Display
    boomSize: 64,
    boomSpeedMax: 5,
    color: '#F39C12',
    model: MODEL.ship.aimer,
    // Physics
    r: 18,
    // Stats
    hp: 1,
    fireRate: 20,
    maxSpeed: 2,
    minSpeed: 1,
    points: 150,
    // Methods
    ai() {
        if (random() < 0.009) this.fire();
    },
    attack() {
        let a = this.angleTo(pl);
        emitBullets(this.pos.x, this.pos.y, a, [0], 3, 4, BULLET.shrapnel);
    },
    onKilled() {
        addScore(this.points);
        emitBullets(this.pos.x, this.pos.y, random(360), [0, 60, 120, 180, 240, 300], 4, 4, BULLET.basic);
        this.dropItem();
        this.explode();
    }
};

ENEMY.basic = {
    // Display
    color: '#E74C3C',
    // Stats
    maxSpeed: 2,
    minSpeed: 0.5,
    // Methods
    ai() {
        if (random() < 0.02) this.fire();
    },
    attack() {
        emitBullets(this.pos.x, this.pos.y, 90, [0], 4, 4, BULLET.basic);
    }
};

ENEMY.bomber = {
    // Display
    boomSize: 64,
    boomSpeedMax: 5,
    color: '#009C41',
    model: MODEL.ship.bomber,
    // Stats
    hp: 1,
    maxSpeed: 3,
    minSpeed: 1,
    points: 300,
    // Methods
    ai() {
        if (random() < 0.005) this.vel.x *= -1;
        if (random() < 0.007) this.fire();
    },
    attack() {
        emitBullets(this.pos.x, this.pos.y, -90, [0], 0, 0, BULLET.bomb);
    },
    init() {
        this.maxHp = this.hp;
        this.speed = random(this.minSpeed, this.maxSpeed);
        this.vel = createVector(this.speed * randSign(), this.speed/4);
    },
    onHitLeft() {
        this.pos.x = this.mapLeft + this.r * this.edgeRadius;
        this.vel.x *= -1;
    },
    onHitRight() {
        this.pos.x = this.mapRight - this.r * this.edgeRadius;
        this.vel.x *= -1;
    },
    onKilled() {
        addScore(this.points);
        emitBullets(this.pos.x, this.pos.y, random(360), [0, 60, 120, 180, 240, 300], 5, 5, BULLET.basic);
        this.dropItem();
        this.explode();
    }
};
