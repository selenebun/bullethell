const ITEM = {};

ITEM.bomb = {
    // Display
    color: '#007C21',
    // Methods
    onPickup() {
        bombs++;
    }
};

ITEM.dualFire = {
    // Display
    color: '#F1C40F',
    // Methods
    onPickup() {
        pl.attack = function() {
            emitBullets(this.pos.x - 5, this.pos.y, -90, [0], 5, 5, BULLET.small, true);
            emitBullets(this.pos.x + 5, this.pos.y, -90, [0], 5, 5, BULLET.small, true);
        }
    }
};

ITEM.health = {
    // Display
    color: '#D73C2C',
    // Methods
    onPickup() {
        pl.heal();
    }
};

ITEM.points = {
    // Display
    color: '#22A7F0',
    // Methods
    onPickup() {
        pl.score += 100;
    }
};

ITEM.points2x = {
    // Display
    color: '#FF6CA8',
    // Methods
    onPickup() {
        pl.score += 200;
    }
};
