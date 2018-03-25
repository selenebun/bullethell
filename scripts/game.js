let bullets;
let enemies;
let pl;
let powerups;
let ps;

let bg = 0;

let level = 0;
let score;

let curLevel;
let spawnCooldown = 60;
let toSpawn;

let bombs = 2;
let bTime = 0;
let bDuration = 20;
let slowdowns = 2;
let sTime = 0;
let sDuration = 60;

let paused = false;
let showFPS = false;
let showHitbox = false;

let avgFPS = 0;
let numFPS = 0;


// Use a bomb
function bomb() {
    if (bombs > 0) {
        bombs--;
        bullets = [];
        bTime = bDuration;
    }
}

// Calculate current and average FPS and update sidebar
function calcFPS() {
    let fps = frameRate();
    avgFPS += (fps - avgFPS) / ++numFPS;

    document.getElementById('fps').innerHTML = 'FPS: ' + fps.toFixed(1);
    document.getElementById('avgfps').innerHTML = 'Avg. FPS: ' + avgFPS.toFixed(1);
}

// Load current level
function loadLevel() {
    curLevel = LEVEL[level];
    bg = curLevel.bg;
    toSpawn = curLevel.spawnCount;
    resetEntities();
    score = 0;
    bTime = 0;
    sTime = 0;
}

// Reset all entities
function resetEntities() {
    bullets = [];
    enemies = [];
    powerups = [];
    ps = [];

    pl = new Ship(width/2, 3 * height/4, SHIP.player);
}

// Use a slowdown
function slowdown() {
    if (slowdowns > 0) {
        slowdowns--;
        sTime = sDuration;
    }
}

// Spawn an enemy
function spawnEnemy() {
    if (toSpawn > 0) {
        spawnCooldown = randint(curLevel.spawnCoolMin, curLevel.spawnCoolMax);
        let type = randWeight(curLevel.enemy, curLevel.enemyWeight);
        enemies.push(new Ship(random(width), -30, SHIP[type]));
    } else {
    }
    toSpawn--;
}

// Updaet game status on sidebar
function updateStatus() {
    document.getElementById('level').innerHTML = 'Level: ' + (level + 1);
    document.getElementById('score').innerHTML = 'Score: ' + pad(score, 7);
    document.getElementById('hp').innerHTML = 'HP: ' + (pl.hp + 1) + '/' + (pl.maxHp + 1);
    document.getElementById('bombs').innerHTML = 'Bombs: ' + bombs;
    document.getElementById('slowdowns').innerHTML = 'Slowdowns: ' + slowdowns;
}


/* Main p5.js functions */

function setup() {
    let c = createCanvas(600, 650);
    c.parent('game');

    // Set drawing modes
    ellipseMode(RADIUS);
    rectMode(RADIUS);

    // Initialize entities
    loadLevel();
}

function draw() {
    bTime > (bDuration - 1) ? background(255) : background(bg);

    // Update status display
    updateStatus();
    calcFPS();

    // Spawn enemies
    if (toSpawn > 0) spawnCooldown > 0 ? spawnCooldown-- : spawnEnemy();

    // Update entities
    mainLoop(bullets);
    mainLoop(enemies);
    mainLoop(powerups);
    pl.act();
    pl.collideShips();
    mainLoop(ps);
    if (pl.dead) pl.onDeath();

    // Update cooldowns
    if (bTime > 0) bTime--;
    if (sTime > 0) sTime--;
}


/* User input functions */

function keyPressed() {
    if (key === 'C') bomb();
    if (key === 'F') {
        showFPS = !showFPS;
        document.getElementById('debug').style.display = showFPS ? 'block' : 'none';
    }
    if (key === 'H') showHitbox = !showHitbox;
    if (key === 'P') paused = !paused;
    if (key === 'X') slowdown();
}
