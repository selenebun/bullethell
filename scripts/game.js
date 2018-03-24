let bullets;
let enemies;
let pl;
let powerups;

let bg = [0, 0, 0];

let level = 1;
let score = 0;

let bombs = 2;
let bTime = 0;
let bDuration = 20;
let slowdowns = 2;
let sTime = 0;
let sDuration = 60;

let plSpeed = 4;

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

// Reset all entities
// TODO spawn player
function resetEntities() {
    bullets = [];
    enemies = [];
    powerups = [];

    pl = new Ship(width/2, height/2, SHIP.player);

    // Spawn bullets
    for (let i = 0; i < 50; i++) {
        bullets.push(new Bullet(random(width), random(height), PI/4, 2, BULLET.basic));
    }
}

// Use a slowdown
function slowdown() {
    if (slowdowns > 0) {
        slowdowns--;
        sTime = sDuration;
    }
}

// Updaet game status on sidebar
function updateStatus() {
    document.getElementById('level').innerHTML = 'Level: ' + level;
    document.getElementById('score').innerHTML = 'Score: ' + pad(score, 7);
    document.getElementById('hp').innerHTML = 'HP: ' + pl.hp + '/' + pl.maxHp;
    document.getElementById('bombs').innerHTML = 'Bombs: ' + bombs;
    document.getElementById('slowdowns').innerHTML = 'Slowdowns: ' + slowdowns;
}


/* Main p5.js functions */

function setup() {
    let c = createCanvas(600, 650);
    c.parent('game');

    // Set drawing modes
    ellipseMode(RADIUS);

    // Initialize entities
    resetEntities();
}

function draw() {
    bTime > (bDuration - 1) ? background(255) : background(bg);

    // Update status display
    updateStatus();
    calcFPS();

    // Update entities
    mainLoop(bullets);
    mainLoop(enemies);
    mainLoop(powerups);
    pl.act();

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
