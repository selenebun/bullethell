class Player extends Ship {
    constructor(x, y) {
        super(x, y);

        // Cooldowns
        this.invulnTime = 0;

        // Display
        this.color = '#19B5FE';

        // Misc
        this.type = 'player';

        // Physics
        this.r = PLAYER_RADIUS;

        // Stats
        this.hp = PLAYER_HP;
        this.moveSpeed = PLAYER_SPEED;
        this.score = 0;
    }

    // All operations to do per tick
    act() {
        if (isRunning()) this.controls();
        super.act();
    }

    // Check for keypresses
    // TODO firing weapon and powerups
    controls() {
        let diag = this.moveSpeed / sqrt(2);
        if (keyIsDown(RIGHT_ARROW)) {
            if (keyIsDown(UP_ARROW)) {
                this.vel = createVector(diag, -diag);
            } else if (keyIsDown(DOWN_ARROW)) {
                this.vel = createVector(diag, diag);
            } else {
                this.vel = createVector(diag, 0);
            }
        } else if (keyIsDown(LEFT_ARROW)) {
            if (keyIsDown(UP_ARROW)) {
                this.vel = createVector(-diag, -diag);
            } else if (keyIsDown(DOWN_ARROW)) {
                this.vel = createVector(-diag, diag);
            } else {
                this.vel = createVector(-diag, 0);
            }
        } else if (keyIsDown(DOWN_ARROW)) {
            this.vel = createVector(0, diag);
        } else if (keyIsDown(UP_ARROW)) {
            this.vel = createVector(0, -diag);
        } else {
            this.vel.mult(0);
        }
    }

    // Update all cooldowns
    cooldown() {
        super.cooldown();
        if (this.invulnTime > 0) this.invulnTime--;
    }

    // Deal damage
    damage() {
        if (this.invulnTime > 0) return;
        this.invulnTime = INVULN_TIME;
        super.damage();
    }

    // Display on the canvas
    display() {
        this.model(true);
        
        // Display hitbox
        if (debugMode) {
            fill(255, 63);
            stroke(255);
            ellipse(this.pos.x, this.pos.y, this.r, this.r);
        }
    }

    // Events
    onHitBottom() {
        this.pos.y = height - this.r * 2;
    }
    onHitLeft() {
        this.pos.x = this.r * 2;
    }
    onHitRight() {
        this.pos.x = width - this.r * 2;
    }
    onHitTop() {
        this.pos.y = this.r * 2;
    }
}
