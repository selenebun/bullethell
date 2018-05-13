const WEAPON = {};

WEAPON.basic = function(pl) {
    emitBullets(pl.pos.x, pl.pos.y, -90, [0], 5, 5, BULLET.small, true);
};

WEAPON.dualFire = function(pl) {
    emitBullets(pl.pos.x - 5, pl.pos.y, -90, [0], 5, 5, BULLET.small, true);
    emitBullets(pl.pos.x + 5, pl.pos.y, -90, [0], 5, 5, BULLET.small, true);
};

WEAPON.tripleFire = function(pl) {
    emitBullets(pl.pos.x, pl.pos.y, -90, [-8, 0, 8], 5, 5, BULLET.small, true);
};
