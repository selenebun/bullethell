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
    onHitBottom: function() {
        this.dead = true;
        emitBullets(this.pos.x, this.pos.y, 0, [-45, -90, -135], 5, 5, BULLET.basic, this.fromPlayer);
        ps.push(new ParticleSystem(this.pos.x, this.pos.y, PS.explosion));
    },
    onHit: function() {
        ps.push(new ParticleSystem(this.pos.x, this.pos.y, PS.explosion));
    }
};

BULLET.ricochet = {
    // Display
    color: '#2ECC71',
    // Physics
    r: 8,
    // Methods
    cooldown: function() {
        this.age++;
        if (this.maxAge !== -1 && this.age >= this.maxAge) {
            this.dead = true;
            this.onOldAge();
        }
        if (this.bounces < 0) this.dead = true;
    },
    init: function() {
        this.bounces = 1;
        this.grav = createVector(this.gravX, this.gravY);
    },
    onHitBottom: function() {
        this.pos.y = this.mapBottom - this.r * this.edgeRadius;
        this.angle = -this.angle;
        this.bounces--;
    },
    onHitLeft: function() {
        this.pos.x = this.mapLeft + this.r * this.edgeRadius;
        this.angle = 180 - this.angle;
        this.bounces--;
    },
    onHitRight: function() {
        this.pos.x = this.mapRight - this.r * this.edgeRadius;
        this.angle = 180 - this.angle;
        this.bounces--;
    },
    onHitTop: function() {
        this.pos.y = this.mapTop + this.r * this.edgeRadius;
        this.angle = -this.angle;
        this.bounces--;
    }
};

BULLET.small = {
    // Physics
    r: 2
};
