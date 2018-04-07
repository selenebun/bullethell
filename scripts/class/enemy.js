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
        this.points = 50;
    }

    // All operations to do per tick
    act() {
        if (!paused) {
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

    // Try to drop an item
    dropItem() {
        if (random() < curLevel.dropChance) spawnItem(this.pos.x, this.pos.y);
    }

    // Any dynamic initializations to do
    init() {
        this.speed = random(this.minSpeed, this.maxSpeed);
    }

    // Events
    onKilled() {
        addScore(this.points);
        this.dropItem();
        this.explode();
    }
}
