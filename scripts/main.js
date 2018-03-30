// Config
const BOMB_COUNT = 2;
const BOMB_FLASH_DURATION = 4;
const INVULN_TIME = 20;
const PLAYER_HP = 7;
const PLAYER_RADIUS = 8;
const PLAYER_SPEED = 5;
const SLOWDOWN_DURATION = 80;
const SLOWDOWN_FRAME_SKIP = 2;
const SLOWDOWN_WAIT_NEXT = 1800;

// Cooldowns
let flashTime = 0;
let nextSlowdownTime = 0;
let slowTime = 0;

// Debug measurements
let avgFPS = 0;
let numFPS = 0;

// Entities
let boss;
let bullets = [];
let enemies = [];
let items = [];
let pl;
let ps = [];

// Game state
let debugMode = false;
let level = 0;
let paused = false;

// Powerups
let bombs = BOMB_COUNT;
let slowdownReady = true;


// Calculate FPS and update sidebar
function calculateFPS() {
    let f = frameRate();
    avgFPS += (f - avgFPS) / ++numFPS;

    if (debugMode) {
        document.getElementById('fps').innerHTML = 'FPS: ' + round(f);
        document.getElementById('avgfps').innerHTML = 'Avg. FPS: ' + avgFPS.toFixed(1);
    }
}

// Update all cooldowns
function cooldown() {
    if (flashTime > 0) flashTime--;
    if (nextSlowdownTime > 0) nextSlowdownTime--;
    if (slowTime > 0) slowTime--;
}

// Draw the correct background
function drawBackground() {
    flashTime > 0 ? background(255) : background(0);
}

// Return whether game is not paused or slowed down that tick
function isRunning() {
    return !this.paused && (slowTime === 0 || frameCount % SLOWDOWN_FRAME_SKIP);
}

// Spawn the player at the correct coords
function spawnPlayer() {
    pl = new Player(width/2, height * 3/4);
    pl.init();
}

// Update game status on sidebar
// TODO slowdowns?
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
    if (slowdownReady && !paused) {
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

    spawnPlayer();
    bullets.push(new Bullet(width/2, height * 3/4, -90, 3, true));
}

// TODO vary background
function draw() {
    // Draw the appropriate background
    drawBackground();

    // Update game status in sidebar
    status();

    // Update and draw all entities
    loopOver(items);
    loopOver(bullets);
    loopOver(enemies);
    pl.act();
    loopOver(ps);

    // Update all cooldowns
    cooldown();
}

function keyPressed() {
    if (key === 'C') useBomb();
    if (key === 'D') {
        debugMode = !debugMode;
        document.getElementById('debug').style.display = debugMode ? 'block' : 'none';
    }
    if (key === 'P') paused = !paused;
    if (key === 'X') useSlowdown();
}
