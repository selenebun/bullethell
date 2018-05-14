class Ship extends Entity {
    constructor(x, y) {
        super(x, y);

        // Cooldowns
        this.fireTime = 10;

        // Display
        this.boomSize = 32;
        this.boomSpeedMax = 3;
        this.boomSpeedMin = 0;
        this.boomType = PS.explosion;
        this.model = MODEL.ship.basic;

        // Map boundaries
        this.edgeRadius = 2;

        // Misc
        this.type = 'ship';

        // Stats
        this.fireRate = 10;
        this.hp = 0;
        this.speed = 3;
    }

    // The attack being used when firing
    attack() {}

    // Update all cooldowns
    cooldown() {
        super.cooldown();
        if (this.fireTime > 0) this.fireTime -= dt();
        if (this.fireTime < 0) this.fireTime = 0;
    }

    // Deal damage
    damage() {
        if (this.hp > 0) {
            this.hp--;
        } else if (!this.dead) {
            this.dead = true;
            this.onKilled();
        }
    }

    // Display on the canvas
    display() {
        this.model();
        
        // Display hitbox
        if (showHitboxes) {
            fill(255, 63);
            stroke(255);
            ellipse(this.pos.x, this.pos.y, this.r, this.r);
        }
    }

    // Create explosion particle effect
    explode() {
        addParticleSystem(this.pos.x, this.pos.y, this.boomSpeedMin, this.boomSpeedMax, this.boomSize, this.boomType);
    }

    // Fire weapon
    fire() {
        if (this.fireTime > 0) return;
        this.fireTime = this.fireRate;
        this.attack();
    }

    // Any dynamic initializations that need to be done
    init() {
        this.maxHp = this.hp;
    }

    // Events
    onKilled() {}
    onHitLeft() {
        this.pos.x = this.mapLeft + this.r * this.edgeRadius;
    }
    onHitRight() {
        this.pos.x = this.mapRight - this.r * this.edgeRadius;
    }
}
