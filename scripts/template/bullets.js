const BULLET = {};

BULLET.basic = {};

BULLET.bomb = {
    // Display
    color: '#E67E22',
    model: MODEL.bullet.egg,
    // Physics
    gravY: 0.1,
    r: 6,
    // Methods
    onHitBottom() {
        this.dead = true;
        emitBullets(this.pos.x, this.pos.y, 0, [-45, -90, -135], 5, 5, BULLET.basic, this.fromPlayer);
        addParticleSystem(this.pos.x, this.pos.y, 0, 3, 32, PS.explosion);
    },
    onHitLeft() {
        this.pos.x = this.mapLeft + this.r * this.edgeRadius;
        this.angle = 180 - this.angle;
    },
    onHitRight() {
        this.pos.x = this.mapRight - this.r * this.edgeRadius;
        this.angle = 180 - this.angle;
    },
    onHit() {
        addParticleSystem(this.pos.x, this.pos.y, 0, 3, 32, PS.explosion);
    }
};

BULLET.large = {
    // Physics
    r: 16,
    // Methods
    init() {
        this.grav = createVector(this.gravX, this.gravY);
        this.maxAge = randInt(60, 80);
    },
    onOldAge() {
        emitBullets(this.pos.x, this.pos.y, this.angle, [0, 60, 120, 180, 240, 300], 5, 5, BULLET.basic, this.fromPlayer);
    }
};

BULLET.largeBomb = {
    // Display
    color: '#E67E22',
    model: MODEL.bullet.egg,
    // Physics
    gravY: 0.1,
    r: 10,
    // Methods
    onHitBottom() {
        this.dead = true;
        emitBullets(this.pos.x, this.pos.y, 0, [-45, -90, -135], 3, 5, BULLET.bomb, this.fromPlayer);
        addParticleSystem(this.pos.x, this.pos.y, 0, 5, 64, PS.explosion);
    },
    onHitLeft() {
        this.pos.x = this.mapLeft + this.r * this.edgeRadius;
        this.angle = 180 - this.angle;
    },
    onHitRight() {
        this.pos.x = this.mapRight - this.r * this.edgeRadius;
        this.angle = 180 - this.angle;
    },
    onHit() {
        addParticleSystem(this.pos.x, this.pos.y, 0, 5, 64, PS.explosion);
    }
};

BULLET.needle = {
    // Display
    model: MODEL.bullet.needle,
    // Physics
    r: 2
};

BULLET.ricochet = {
    // Display
    color: '#2ECC71',
    // Physics
    r: 8,
    // Methods
    cooldown() {
        this.age += dt();
        if (this.maxAge !== -1 && this.age >= this.maxAge) {
            this.dead = true;
            this.onOldAge();
        }
    },
    init() {
        this.bounces = 1;
        this.grav = createVector(this.gravX, this.gravY);
    },
    onHitBottom() {
        if (this.bounces === 0) return;
        this.pos.y = this.mapBottom - this.r * this.edgeRadius;
        this.angle = -this.angle;
        this.bounces--;
    },
    onHitLeft() {
        if (this.bounces === 0) return;
        this.pos.x = this.mapLeft + this.r * this.edgeRadius;
        this.angle = 180 - this.angle;
        this.bounces--;
    },
    onHitRight() {
        if (this.bounces === 0) return;
        this.pos.x = this.mapRight - this.r * this.edgeRadius;
        this.angle = 180 - this.angle;
        this.bounces--;
    },
    onHitTop() {
        if (this.bounces === 0) return;
        this.pos.y = this.mapTop + this.r * this.edgeRadius;
        this.angle = -this.angle;
        this.bounces--;
    }
};

BULLET.ricochet2 = {
    // Display
    color: '#2ECC71',
    // Physics
    r: 8,
    // Methods
    cooldown() {
        this.age += dt();
        if (this.maxAge !== -1 && this.age >= this.maxAge) {
            this.dead = true;
            this.onOldAge();
        }
    },
    init() {
        this.bounces = 2;
        this.grav = createVector(this.gravX, this.gravY);
    },
    onHitBottom() {
        if (this.bounces === 0) return;
        this.pos.y = this.mapBottom - this.r * this.edgeRadius;
        this.angle = -this.angle;
        this.bounces--;
    },
    onHitLeft() {
        if (this.bounces === 0) return;
        this.pos.x = this.mapLeft + this.r * this.edgeRadius;
        this.angle = 180 - this.angle;
        this.bounces--;
    },
    onHitRight() {
        if (this.bounces === 0) return;
        this.pos.x = this.mapRight - this.r * this.edgeRadius;
        this.angle = 180 - this.angle;
        this.bounces--;
    },
    onHitTop() {
        if (this.bounces === 0) return;
        this.pos.y = this.mapTop + this.r * this.edgeRadius;
        this.angle = -this.angle;
        this.bounces--;
    }
};

BULLET.twoStage = {
    // Display
    color: '#EA4C88',
    // Misc
    maxAge: 60,
    // Physics
    r: 12,
    // Methods
    onOldAge() {
        emitBullets(this.pos.x, this.pos.y, this.angle, [60, 150, 180, 210, 300], 3, 4, BULLET.needle, this.fromPlayer);
    }
};

BULLET.splitter = {
    // Display
    color: '#29C5FF',
    // Physics
    r: 8,
    // Methods
    init() {
        this.grav = createVector(this.gravX, this.gravY);
        this.maxAge = randInt(60, 80);
    },
    onOldAge() {
        emitBullets(this.pos.x, this.pos.y, this.angle, [-30, 0, 30], 3, 4, BULLET.basic, this.fromPlayer);
    }
};

BULLET.small = {
    // Physics
    r: 2
};
