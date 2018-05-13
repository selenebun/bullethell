const ITEM = {};

ITEM.bomb = {
    // Display
    color: '#007C21',
    // Methods
    onPickup(pl) {
        bombs++;
    }
};

ITEM.dualFire = {
    // Display
    color: '#F1C40F',
    // Methods
    canPickUp(pl) {
        return pl.weapon !== 'dualFire' && pl.weapon !== 'tripleFire';
    },
    onPickup(pl) {
        pl.fireRate = 10;
        pl.weapon = 'dualFire';
    }
};

ITEM.tripleFire = {
    // Display
    color: '#B71C0C',
    // Methods
    canPickUp(pl) {
        return pl.weapon !== 'tripleFire';
    },
    onPickup(pl) {
        pl.fireRate = 8;
        pl.weapon = 'tripleFire';
    }
};

ITEM.health = {
    // Display
    color: '#D73C2C',
    model: MODEL.item.health,
    // Physics
    r: 16,
    // Methods
    canPickUp(pl) {
        return pl.hp < pl.maxHp;
    },
    onPickup(pl) {
        pl.heal();
    }
};

ITEM.points = {
    // Display
    color: '#22A7F0',
    // Methods
    onPickup(pl) {
        addScore(100);
    }
};

ITEM.points2x = {
    // Display
    color: '#FF6CA8',
    // Methods
    onPickup(pl) {
        addScore(200);
    }
};
