class Enemy extends Ship {
    constructor(x, y) {
        super(x, y);

        // Map boundaries
        this.mapTop = WORLD_CEILING;

        // Physics
        this.r = 14;

        // Stats
        this.maxSpeed = 3;
        this.minSpeed = 3;
        this.points = 100;
    }

    // All operations to do per tick
    act() {
        if (isRunning()) {
            this.ai();
            this.collidePlayer();
        }
        super.act();
    }

    // Dynamically update behavior
    ai() {}

    // Damage player if in contact
    collidePlayer() {
        if (this.collide(pl)) pl.damage();
    }

    // Any dynamic initializations to do
    init() {
        this.speed = random(this.minSpeed, this.maxSpeed);
    }

    // Events
    onKilled() {
        pl.score += this.points;
        ps.push(new ParticleSystem(this.pos.x, this.pos.y, PS.explosion));
    }
}
