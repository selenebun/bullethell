class Enemy extends Ship {
    constructor(x, y) {
        super(x, y);

        // Physics
        this.r = 14;

        // Stats
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

    // Events
    // TODO explosion effect
    onKilled() {
        pl.score += this.points;
    }
}
