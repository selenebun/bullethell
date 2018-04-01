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
        this.fireRate = PLAYER_FIRE_RATE;
        this.hp = PLAYER_HP;
        this.speed = PLAYER_SPEED;
        this.score = 0;
    }

    // All operations to do per tick
    act() {
        if (!paused) this.controls();
        super.act();
    }

    // The attack being used when firing
    attack() {
        emitBullets(this.pos.x, this.pos.y, -90, [0], 5, 5, BULLET.small, true);
    }

    // Check for keypresses
    controls() {
        // Fire weapon (Z key)
        if (keyIsDown(90)) this.fire();
        
        // Movement (arrow keys)
        let diag = this.speed / sqrt(2);
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
        if (this.invulnTime > 0) this.invulnTime -= dt();
        if (this.invulnTime < 0) this.invulnTime = 0;
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
        if (showHitboxes) {
            fill(255, 63);
            stroke(255);
            ellipse(this.pos.x, this.pos.y, this.r, this.r);
        }
    }

    // Heal HP up to max
    heal(amt) {
        if (typeof amt === 'undefined') amt = 1;
        if (this.hp < this.maxHp) this.hp += amt;
        if (this.hp > this.maxHp) this.hp = this.maxHp;
    }

    // Events
    onDeath() {
        reloadLevel();
    }
    onHitBottom() {
        this.pos.y = this.mapBottom - this.r * this.edgeRadius;
    }
    onHitTop() {
        this.pos.y = this.mapTop + this.r * this.edgeRadius;
    }
}
