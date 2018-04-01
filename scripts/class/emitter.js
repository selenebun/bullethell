class Emitter extends Entity {
    constructor(x, y, relativeTo) {
        super(x, y);

        // Misc
        this.bulletTemplate = BULLET.basic;
        this.fireRate = 4;
        this.rel = relativeTo;
        this.spinReversal = true;
        this.type = 'emitter';

        // Physics
        this.angle = random(360);
        this.angles = [0];
        this.angVel = 0;
        this.angAcc = 0;
        this.maxAngVel = 30;
        this.maxSpeed = 0;
        this.minSpeed = 0;
    }

    // Border behavior
    borders() {
        // Kill if outside map
        if (this.outsideMap()) {
            this.dead = true;
            return;
        }

        // Behavior when hitting walls
        let x = this.pos.x;
        let y = this.pos.y;
        if (this.rel) {
            x += this.rel.pos.x;
            y += this.rel.pos.y;
        }
        let r = this.r * this.edgeRadius;
        if (x - r < this.mapLeft) this.onHitLeft();
        if (x + r > this.mapRight) this.onHitRight();
        if (y - r < this.mapTop) this.onHitTop();
        if (y + r > this.mapBottom) this.onHitBottom();
    }

    // Update all cooldowns
    cooldown() {
        super.cooldown();
        if (this.fireTime > 0) this.fireTime -= dt();
        if (this.fireTime < 0) this.fireTime = 0;
    }

    // Emit bullets
    emit() {
        if (this.rel) {
            emitBullets(this.rel.pos.x + this.pos.x, this.rel.pos.y + this.pos.y, this.angle, this.angles, this.minSpeed, this.maxSpeed, this.bulletTemplate);
        } else {
            emitBullets(this.pos.x, this.pos.y, this.angle, this.angles, this.minSpeed, this.maxSpeed, this.bulletTemplate);
        }
    }

    // Fire bullets if possible
    fire() {
        this.cooldown();
        if (this.fireTime > 0) return;
        this.fireTime = this.fireRate;
        this.emit();
        this.update();
    }

    // Check if entity is outside map
    outsideMap() {
        let x = this.pos.x;
        let y = this.pos.y;
        if (this.rel) {
            x += this.rel.pos.x;
            y += this.rel.pos.y;
        }
        let r = this.r * 2;
        return (x + r < this.mapLeft || x - r > this.mapRight || y + r < this.mapTop || y - r > this.mapBottom);
    }

    // Update physics
    update() {
        super.update();
        if (this.spinReversal && (abs(this.angVel + this.angAcc) * dt()) >= this.maxAngVel) {
            this.angAcc *= -1;
        }
        this.angVel += this.angAcc * dt();
        this.angle += this.angVel * dt();
    }
}
