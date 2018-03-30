class Bullet extends Entity {
    constructor(x, y, angle, speed, fromPlayer) {
        super(x, y);

        // Display
        this.model = MODEL.bullet.basic;

        // Misc
        this.fromPlayer = Boolean(fromPlayer);
        this.maxAge = -1;
        this.type = 'bullet';

        // Physics
        this.acc = 0;
        this.angVel = 0;
        this.grav = createVector();
        this.maxSpeed = 10;
        this.r = 5;
        this.vel = p5.Vector.fromAngle(radians(angle), speed);
    }

    // All operations to do per tick
    act() {
        super.act();
        if (isRunning()) this.collideShips();
    }

    // Check for collision with player or enemy ships
    collideShips() {
        if (this.fromPlayer) {
            // Try to hit boss first
            if (boss && boss.dead && this.tryHit(boss)) return;

            // If that fails, try to hit enemies
            for (let i = 0; i < enemies.length; i++) {
                if (this.tryHit(enemies[i])) return;
            }
        } else {
            // Try to hit player
            this.tryHit(pl);
        }
    }

    // Update all cooldowns
    cooldown() {
        super.cooldown();
        if (this.maxAge !== -1 && this.age >= this.maxAge) {
            this.dead = true;
            this.onOldAge();
        }
    }

    // Display on the canvas
    display() {
        this.model();
        
        // Display hitbox
        if (debugMode) {
            fill(255, 63);
            stroke(255);
            ellipse(this.pos.x, this.pos.y, this.r, this.r);
        }
    }

    // Events
    onHit(e) {}
    onOldAge() {}

    // Attempt to hit an entity
    tryHit(e) {
        if (this.collide(e)) {
            this.dead = true;
            e.damage();
            this.onHit(e);
            return true;
        }
    }

    // Update physics
    update() {
        this.vel.add(this.grav);
        this.vel.rotate(this.angVel);
        let speed = constrain(this.vel.mag() + this.acc, -this.maxSpeed, this.maxSpeed);
        this.vel.setMag(speed);
        this.pos.add(this.vel);
    }
}
