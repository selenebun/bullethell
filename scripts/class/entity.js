class Entity {
    constructor(x, y) {
        // Display
        this.color = '#ECF0F1';
        
        // Map boundaries
        this.edgeRadius = 1;
        this.mapBottom = height;
        this.mapLeft = 0;
        this.mapRight = width;
        this.mapTop = 0;

        // Misc
        this.age = 0;
        this.dead = false;
        this.type = 'entity';

        // Physics
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.r = 0;
    }

    // All operations to do per tick
    act() {
        if (isRunning()) {
            this.cooldown();
            this.update();
            this.borders();
        }
        this.display();
    }

    // Border behavior
    borders() {
        // Kill if outside map
        if (this.outsideMap()) {
            this.dead = true;
            return;
        }

        // Behavior when hitting walls
        let x = this.pos.x;
        let y = this.pos.y;
        let r = this.r * this.edgeRadius;
        if (x - r < this.mapLeft) this.onHitLeft();
        if (x + r > this.mapRight) this.onHitRight();
        if (y - r < this.mapTop) this.onHitTop();
        if (y + r > this.mapBottom) this.onHitBottom();
    }

    // Check for hitbox collision with another entity
    collide(e) {
        return this.pos.dist(e.pos) < this.r + e.r;
    }

    // Update cooldowns
    cooldown() {
        this.age++;
    }

    // Display on the canvas
    display() {}

    // Any dynamic initialization to do
    init() {}

    // Drawing function
    model() {}

    // Events
    onDeath() {}
    onHitBottom() {}
    onHitLeft() {}
    onHitRight() {}
    onHitTop() {}

    // Check if entity is outside map
    outsideMap() {
        let x = this.pos.x;
        let y = this.pos.y;
        let r = this.r * 2;
        return (x + r < this.mapLeft || x - r > this.mapRight || y + r < this.mapTop || y - r > this.mapBottom);
    }

    // Update physics
    update() {
        this.pos.add(this.vel);
    }
}
