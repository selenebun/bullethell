class Bullet extends Entity {
    constructor(x, y, angle, speed, template, fromPlayer) {
        super(x, y);

        // Misc
        this.fromPlayer = fromPlayer;

        // Physics
        this.speed = speed;

        // Stats
        this.dmg = 1;

        // Substitute properties from template
        applyTemplate(this, template);

        // Set velocity
        this.vel = p5.Vector.fromAngle(angle).mult(this.speed);

        // Set any additional properties
        this.init();
    }

    // Dynamically update behavior
    ai() {}

    // Call all necessary methods each frame
    act() {
        this.ai();
        super.act();
        this.collideShips();
    }

    // Check for collision with player or enemy ships
    collideShips() {
        let targets = this.fromPlayer ? enemies : [pl];
        for (let i = 0; i < targets.length; i++) {
            let e = targets[i];
            if (this.collide(e)) {
                e.damage(this.dmg);
                this.dead = true;
                return;
            }
        }
    }
}
