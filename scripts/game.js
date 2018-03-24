let bullets;
let enemies;
let pl;
let powerups;

let bg = [0, 0, 0];

let avgFPS = 0;
let numFPS = 0;

let showFPS = false;
let showHitbox = false;


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
        bullets.push(new Bullet(random(width), random(height), PI/4, 3, BULLET.basic));
    }
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
    background(bg);

    // Update status display
    calcFPS();

    // Update entities
    mainLoop(bullets);
    mainLoop(enemies);
    mainLoop(powerups);
    pl.act();
}


/* User input functions */

function keyPressed() {
    if (key === 'F') {
        showFPS = !showFPS;
        document.getElementById('debug').style.display = showFPS ? 'block' : 'none';
    }

    if (key === 'H') showHitbox = !showHitbox;
}
