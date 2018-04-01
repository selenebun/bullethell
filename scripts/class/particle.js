class Particle extends Entity {
    constructor(x, y, minSpeed, maxSpeed) {
        super(x, y);

        // Display
        this.color = [236, 240, 241];

        // Misc
        this.decayMax = 4;
        this.decayMin = 2;
        this.lifespan = 255;
        this.type = 'particle';
        
        // Physics
        this.angle = random(360);
        this.angVel = 0;
        this.gravX = 0;
        this.gravY = 0;
        this.rMax = 6;
        this.rMin = 3;
        this.vel = p5.Vector.random2D().mult(random(minSpeed, maxSpeed));
    }

    // Update all cooldowns
    cooldown() {
        super.cooldown();
        if (this.lifespan > 0) {
            this.lifespan -= this.decay * dt();
        } else {
            this.dead = true;
        }
    }

    // Display on the canvas
    display() {
        this.model();
    }

    // Any dynamic initialization to do
    init() {
        this.decay = random(this.decayMin, this.decayMax);
        this.grav = createVector(this.gravX, this.gravY);
        this.r = random(this.rMin, this.rMax);
    }

    // Update physics
    update() {
        this.vel.add(p5.Vector.mult(this.grav, dt()));
        super.update();
        this.angle += this.angVel * dt();
    }
}
