class Item extends Entity {
    constructor(x, y, template) {
        super(x, y);

        // Display
        this.model = MODEL.item.basic;
        this.type = 'item';

        // Physics
        this.fallSpeed = 2;
        this.r = 6;

        applyTemplate(this, template);
        this.init();
    }

    // All operations to do per tick
    act() {
        if (isRunning()) this.collidePlayer();
        super.act();
    }

    // Check for collision with player
    collidePlayer() {
        if (this.collide(pl)) {
            this.dead = true;
            this.onPickup();
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

    // Any dynamic initialization to do
    init() {
        this.vel = createVector(0, this.fallSpeed);
    }

    // Events
    onPickup(e) {}
}
