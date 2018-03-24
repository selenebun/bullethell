class Particle extends Entity {
    constructor(x, y, speed, template) {
        super(x, y);

        // Display
        this.color = [0, 0, 0];
        this.decay = 2;
        this.lifespan = 255;

        // Physics
        this.vel = p5.Vector.random2D().mult(random(speed));
        this.angle = 0;
        this.angVel = 0;

        // Substitute properties from template
        applyTemplate(this, template);

        // Set any additional properties
        this.init();
    }

    // Update physics, age, etc.
    update() {
        super.update();
        this.angle += this.angVel;
        if (this.lifespan > 0) this.lifespan -= this.decay;
    }
}
