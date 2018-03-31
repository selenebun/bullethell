class ParticleSystem extends Entity {
    constructor(x, y, minSpeed, maxSpeed, num, template) {
        super(x, y);

        // Misc
        this.particles = [];
        this.particleTemplate = {};
        this.type = 'particleSystem';

        // Physics
        this.maxSpeed = minSpeed;
        this.minSpeed = maxSpeed;

        applyTemplate(this, template);
        this.init();
        this.addParticle(num);
    }

    // All operations to do per tick
    act() {
        this.cooldown();
        loopOver(this.particles);
    }

    // Spawn a number of particles
    addParticle(num) {
        num = typeof num === 'undefined' ? 1 : num;
        for (let i = 0; i < num; i++) {
            let p = new Particle(this.pos.x, this.pos.y, this.minSpeed, this.maxSpeed);
            applyTemplate(p, this.particleTemplate);
            p.init();
            this.particles.push(p);
        }
    }

    // Update all cooldowns
    cooldown() {
        super.cooldown();
        if (this.particles.length === 0) this.dead = true;
    }
}
