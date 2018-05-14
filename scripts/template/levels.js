const LEVEL = [];

LEVEL[0] = {
    // Background
    alpha: 127,
    bg: 0,
    color: 255,
    // Boss
    boss: null,
    // Enemies
    enemy: ['basic', 'splitter'],
    enemyWeight: [0.8, 0.2],
    spawnCount: 80,
    spawnTimeMax: 100,
    spawnTimeMin: 20,
    // Items
    dropChance: 0.3,
    item: ['points', 'points2x', 'dualFire', 'health', 'bomb'],
    itemWeight: [0.49, 0.29, 0.02, 0.18, 0.02]
};

LEVEL[1] = {
    // Background
    alpha: 127,
    bg: 0,
    color: 255,
    // Boss
    boss: 'boss1',
    // Enemies
    enemy: ['basic', 'bomber'],
    enemyWeight: [0.85, 0.15],
    spawnCount: 80,
    spawnTimeMax: 100,
    spawnTimeMin: 20,
    // Items
    dropChance: 0.3,
    item: ['points', 'points2x', 'dualFire', 'health', 'bomb'],
    itemWeight: [0.45, 0.25, 0.1, 0.18, 0.02]
};

LEVEL[2] = {
    // Background
    alpha: 127,
    bg: '#002000',
    color: '#00FF00',
    // Boss
    boss: null,
    // Enemies
    enemy: ['basic', 'bomber', 'shotgunner'],
    enemyWeight: [0.5, 0.2, 0.3],
    spawnCount: 80,
    spawnTimeMax: 100,
    spawnTimeMin: 20,
    // Items
    dropChance: 0.3,
    item: ['points', 'points2x', 'dualFire', 'health', 'bomb'],
    itemWeight: [0.45, 0.25, 0.1, 0.18, 0.02]
};

LEVEL[3] = {
    // Background
    alpha: 127,
    bg: '#002000',
    color: '#00FF00',
    // Boss
    boss: 'heavyBomber',
    // Enemies
    enemy: ['bomber', 'shotgunner', 'turret'],
    enemyWeight: [0.15, 0.55, 0.3],
    spawnCount: 80,
    spawnTimeMax: 100,
    spawnTimeMin: 20,
    // Items
    dropChance: 0.3,
    item: ['points', 'points2x', 'dualFire', 'tripleFire', 'health', 'bomb'],
    itemWeight: [0.45, 0.25, 0.09, 0.01, 0.18, 0.02]
};

LEVEL[4] = {
    // Background
    alpha: 127,
    bg: '#020E35',
    color: '#39D5FF',
    // Boss
    boss: null,
    // Enemies
    enemy: ['turret', 'splitter', 'ricochet'],
    enemyWeight: [0.4, 0.3, 0.3],
    spawnCount: 80,
    spawnTimeMax: 100,
    spawnTimeMin: 20,
    // Items
    dropChance: 0.3,
    item: ['points', 'points2x', 'tripleFire', 'health', 'bomb'],
    itemWeight: [0.45, 0.25, 0.1, 0.18, 0.02]
};

LEVEL[5] = {
    // Background
    alpha: 127,
    bg: '#020E35',
    color: '#39D5FF',
    // Boss
    boss: null,
    // Enemies
    enemy: ['turret', 'splitter', 'shotgunner', 'ricochet'],
    enemyWeight: [0.2, 0.2, 0.1, 0.5],
    spawnCount: 80,
    spawnTimeMax: 100,
    spawnTimeMin: 20,
    // Items
    dropChance: 0.3,
    item: ['points', 'points2x', 'tripleFire', 'health', 'bomb'],
    itemWeight: [0.45, 0.25, 0.1, 0.18, 0.02]
};

// level 0-1 bg=0, color=255
// level 2-3 bg='#001600', color='#00FF00'
// level 4-5 bg='#020E35', color='#39D5FF'
// level 6-7 bg='#330000', color='#F39C12'
