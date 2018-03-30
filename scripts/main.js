// Debug measurements
let avgFPS = 0;
let numFPS = 0;

// Game state
let debugMode = false;
let level = 0;
let paused = false;


// Calculate FPS and update sidebar
function calculateFPS() {
    let f = frameRate();
    avgFPS += (f - avgFPS) / ++numFPS;

    if (debugMode) {
        document.getElementById('fps').innerHTML = 'FPS: ' + round(f);
        document.getElementById('avgfps').innerHTML = 'Avg. FPS: ' + avgFPS.toFixed(1);
    }
}

// Update game status on sidebar
// TODO access player properties
// TODO slowdowns?
function status() {
    document.getElementById('level').innerHTML = 'Level: ' + (level + 1);
    //document.getElementById('score').innerHTML = 'Score: ' + (pl.score);
    //document.getElementById('hp').innerHTML = 'HP: ' + pl.hpStr();
    //document.getElementById('bombs').innerHTML = 'Bombs: ' + pl.bombs;

    // Debugging
    calculateFPS();
}


/* Main p5.js functions */

function setup() {
    let c = createCanvas(600, 650);
    c.parent('game');

    // Configure p5.js
    angleMode(DEGREES);
    ellipseMode(RADIUS);
}

// TODO vary background
function draw() {
    background(0);

    status();
}

function keyPressed() {
    if (key === 'D') {
        debugMode = !debugMode;
        document.getElementById('debug').style.display = debugMode ? 'block' : 'none';
    }
    if (key === 'P') paused = !paused;
}
