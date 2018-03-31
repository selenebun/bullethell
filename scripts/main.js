// Config
const BOMB_COUNT = 2;
const BOMB_FLASH_DURATION = 4;
const BOSS_SPAWN_DELAY = 300;
const INVULN_TIME = 20;
const PLAYER_FIRE_RATE = 8;
const PLAYER_HP = 7;
const PLAYER_RADIUS = 8;
const PLAYER_SPEED = 5;
const SLOWDOWN_DURATION = 80;
const SLOWDOWN_FRAME_SKIP = 2;
const SLOWDOWN_WAIT_NEXT = 900;
const SPAWN_GRACE_PERIOD = 60;
const WORLD_CEILING = -50;

// Cooldowns
let flashTime;
let nextSlowdownTime;
let slowTime;
let spawnTime;

// Debug measurements
let avgFPS = 0;
let numFPS = 0;

// Entities
let boss;
let bullets;
let enemies;
let items;
let pl;
let ps;

// Game state
let bg;
let curLevel;
let debugMode = false;
let level = 0;
let paused = false;
let toSpawn;
let toSpawnBoss;

// Powerups
let bombs;


// Calculate FPS and update sidebar
function calculateFPS() {
    let f = frameRate();
    avgFPS += (f - avgFPS) / ++numFPS;

    if (debugMode) {
        document.getElementById('fps').innerHTML = 'FPS: ' + round(f);
        document.getElementById('avgfps').innerHTML = 'Avg. FPS: ' + avgFPS.toFixed(1);
    }
}

// Clear all entities (except player)
function clearEntities() {
    boss = null;
    bullets = [];
    enemies = [];
    items = [];
    ps = [];
}

// Update all cooldowns
function cooldown() {
    if (flashTime > 0) flashTime--;
    if (nextSlowdownTime > 0) nextSlowdownTime--;
    if (slowTime > 0) slowTime--;
    if (spawnTime > 0) spawnTime--;
}

// Draw the correct background
// TODO procedurally generated scrolling background
function drawBackground() {
    flashTime > 0 ? background(255) : background(bg);
}

// Display a health bar for a boss
function healthBar(e) {
    let h = e.hp / e.maxHp;
    if (e === 0) return;

    let c = color('#D73C2C');
    c.setAlpha(191);
    fill(c);
    noStroke();
    rectMode(CENTER);
    rect(width/2 - 0.5, 10, h * (width - 200), 10);
}

// Return whether game is not paused or slowed down that tick
function isRunning() {
    return !paused && (slowTime === 0 || frameCount % SLOWDOWN_FRAME_SKIP);
}

// Load current level
function loadLevel() {
    curLevel = LEVEL[level];
    bg = curLevel.bg;
    toSpawn = curLevel.spawnCount;
    toSpawnBoss = true;

    // Clear all entities
    clearEntities();
    spawnPlayer();

    // Reset cooldowns
    flashTime = 0;
    nextSlowdownTime = 0;
    slowTime = 0;
    spawnTime = SPAWN_GRACE_PERIOD;

    // Reset powerups
    bombs = BOMB_COUNT;
    slowdownReady = true;
}

// Spawn a boss
function spawnBoss() {
    boss = new Boss(width/2, WORLD_CEILING);
    applyTemplate(boss, BOSS[curLevel.boss]);
    boss.init();
}

// Spawn an enemy
function spawnEnemy() {
    spawnTime = randInt(curLevel.spawnTimeMin, curLevel.spawnTimeMax);
    let type = randWeight(curLevel.enemy, curLevel.enemyWeight);
    let e = new Enemy(random(width), WORLD_CEILING);
    applyTemplate(e, ENEMY[type]);
    e.init();
    enemies.push(e);
}

// Spawn the player at the correct coords
function spawnPlayer() {
    pl = new Player(width/2, height * 3/4);
    pl.init();
}

// Update game status on sidebar
function status() {
    document.getElementById('level').innerHTML = 'Level: ' + (level + 1);
    document.getElementById('score').innerHTML = 'Score: ' + (pl.score);
    document.getElementById('hp').innerHTML = 'HP: ' + pl.hpStr();
    document.getElementById('bombs').innerHTML = 'Bombs: ' + bombs;

    // Debugging
    calculateFPS();
}

// Use a bomb powerup
function useBomb() {
    if (bombs > 0 && !paused) {
        bombs--;
        bullets = [];
        pl.invulnTime = INVULN_TIME;
        flashTime = BOMB_FLASH_DURATION;
    }
}

// Use a slowdown powerup
function useSlowdown() {
    if (nextSlowdownTime === 0 && !paused) {
        slowdownReady = false;
        slowTime = SLOWDOWN_DURATION;
        nextSlowdownTime = SLOWDOWN_WAIT_NEXT;
    }
}


/* Main p5.js functions */

function setup() {
    let c = createCanvas(600, 650);
    c.parent('game');

    // Configure p5.js
    angleMode(DEGREES);
    ellipseMode(RADIUS);

    // Begin level
    loadLevel();
}

function draw() {
    // Draw the appropriate background
    drawBackground();

    // Update game status
    status();

    // Spawn enemies or boss
    if (isRunning() && spawnTime === 0) {
        if (toSpawn > 0) {
            toSpawn--;
            spawnEnemy();
            if (toSpawn === 0) spawnTime = BOSS_SPAWN_DELAY;
        } else if (toSpawnBoss && enemies.length === 0) {
            toSpawnBoss = false;
            spawnBoss();
        }
    }

    // Update and draw all entities
    loopOver(items);
    loopOver(bullets);
    loopOver(enemies);
    if (boss) boss.act();
    pl.act();
    loopOver(ps);

    // Update all cooldowns
    cooldown();

    // Draw boss health bar
    if (boss) healthBar(boss);

    // Check for boss death
    if (boss && boss.dead) {
        boss.onDeath();
        boss = null;
    }

    // Check for player death
    if (pl.dead) pl.onDeath();
}

function keyPressed() {
    if (key === 'B') {
        clearEntities();
        toSpawn = 0;
        spawnTime = SPAWN_GRACE_PERIOD;
    }
    if (key === 'C') useBomb();
    if (key === 'D') {
        debugMode = !debugMode;
        document.getElementById('debug').style.display = debugMode ? 'block' : 'none';
    }
    if (key === 'P') paused = !paused;
    if (key === 'X') useSlowdown();
}
