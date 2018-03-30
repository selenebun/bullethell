class Ship extends Entity {
    constructor(x, y) {
        super(x, y);

        // Display
        this.model = MODEL.ship.basic;

        // Misc
        this.type = 'ship';

        // Stats
        this.hp = 0;
        this.moveSpeed = 3;
    }

    // Deal damage
    damage() {
        if (this.hp > 0) {
            this.hp--;
        } else {
            this.dead = true;
            this.onKilled();
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

    // Fire weapon
    fire() {}

    // Pretty print HP and max HP
    hpStr() {
        return '' + (this.hp + 1) + '/' + (this.maxHp + 1);
    }

    // Any dynamic initializations that need to be done
    init() {
        this.maxHp = this.hp;
    }

    // Events
    onKilled() {}
}
