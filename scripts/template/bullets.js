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
    }
};

BULLET.small = {
    // Physics
    r: 2
};
