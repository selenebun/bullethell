const PARTICLE = {};
const PS = {};


// Particles

PARTICLE.confetti = {
    // Display
    model: MODEL.particle.square,
    // Physics
    gravY: 0.01,
    // Methods
    init() {
        this.color = [random(255), random(255), random(255)];
        this.decay = random(this.decayMin, this.decayMax);
        this.grav = createVector(this.gravX, this.gravY);
        this.r = random(this.rMin, this.rMax);
    }
};

PARTICLE.fire = {
    // Display
    model: MODEL.particle.square,
    // Misc
    decayMax: 8,
    decayMin: 4,
    // Methods
    init() {
        this.angVel = random(-90, 90);
        this.color = [random(200, 255), random(127), random(31)];
        this.decay = random(this.decayMin, this.decayMax);
        this.grav = createVector(this.gravX, this.gravY);
        this.r = random(this.rMin, this.rMax);
    }
};


// Particle systems

PS.explosion = {
    // Misc
    particleTemplate: PARTICLE.fire,
};

PS.confetti = {
    // Misc
    particleTemplate: PARTICLE.confetti
};
