class Entity {
    constructor(x, y, template) {
        // Misc
        this.age = 0;
        this.dead = false;

        // Physics
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.r = 0;

        // Substitute properties from template
        applyTemplate(this, template);

        // Set any additional properties
        this.init();
    }

    // Call all necessary methods each frame
    act() {
        if (!paused && (sTime === 0 || frameCount % 2)) this.update();
        this.borders();
        if (!this.dead) this.display();
    }

    // Border behavior
    borders() {}

    // Check for entity colliding with hitbox
    collide(e) {
        let d = this.pos.dist(e.pos);
        return d < this.r + e.r;
    }

    // Check if point is inside hitbox
    contains(x, y) {
        let d = dist(this.pos.x, this.pos.y, x, y);
        return d < this.r;
    }

    // Display entity, hitbox, etc.
    display() {
        this.model();

        // Display hitbox
        if (showHitbox) {
            fill(255, 63);
            stroke(255);
            ellipse(this.pos.x, this.pos.y, this.r, this.r);
        }
    }

    // Initialize anything else dynamically
    init() {}

    // Display entity
    model() {}

    // Do something when entity dies
    onDeath() {}

    // Update physics, age, etc.
    update() {
        this.pos.add(this.vel);
        this.age++;
    }
}
