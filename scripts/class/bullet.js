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
        this.angle = angle;
        this.angVel = 0;
        this.gravX = 0;
        this.gravY = 0;
        this.maxSpeed = 10;
        this.r = 5;
        this.speed = speed;
    }

    // All operations to do per tick
    act() {
        if (!paused) this.ai();
        super.act();
        if (!paused) this.collideShips();
    }

    // Dynamically update behavior
    ai() {}

    // Check for collision with player or enemy ships
    collideShips() {
        if (this.fromPlayer) {
            // Try to hit boss first
            if (boss && !boss.dead && this.tryHit(boss)) return;

            // If that fails, try to hit enemies
            for (let i = 0; i < enemies.length; i++) {
                if (!enemies[i].dead && this.tryHit(enemies[i])) return;
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
        if (showHitboxes) {
            fill(255, 63);
            stroke(255);
            ellipse(this.pos.x, this.pos.y, this.r, this.r);
        }
    }

    // Any dynamic initializations to do
    init() {
        this.grav = createVector(this.gravX, this.gravY);
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
        // Apply gravity
        this.vel.add(p5.Vector.mult(this.grav, dt()));

        // Apply angular velocity and linear acceleration
        this.angle += this.angVel * dt();
        this.speed += this.acc * dt();

        // Combine gravity velocity vector and other properties
        let v = p5.Vector.fromAngle(radians(this.angle), this.speed);
        v = v.add(this.vel);

        // Constrain to maxSpeed and apply to position
        v.setMag(constrain(v.mag(), -this.maxSpeed, this.maxSpeed) * dt());
        this.pos.add(v);
    }
}
