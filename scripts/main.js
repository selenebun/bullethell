// Config
const BOMB_COUNT = 2;
const BOMB_FLASH_DURATION = 5;
const BOMBS_PER_LEVEL = 1;
const BOSS_GRACE_PERIOD = 120;
const BOSS_SPAWN_DELAY = 120;
const INVULN_TIME = 20;
let   MAP_HEIGHT = 650;
const MODEL_LINE_ALPHA = 127;
const NUM_STARS = 300;
const PLAYER_FIRE_RATE = 8;
const PLAYER_HP = 7;
const PLAYER_RADIUS = 6;
const PLAYER_SPEED = 4;
const SCORE_UPDATE_SPEED = 4;
const SLOWDOWN_ALPHA = 95;
const SLOWDOWN_ALPHA_FULL = 127;
const SLOWDOWN_DT = 0.4;
const SLOWDOWN_DURATION = 120;
const SLOWDOWN_WAIT_NEXT = 600;
const SPAWN_GRACE_PERIOD = 60;
const STARFIELD_LERP = 0.2;
const STARFIELD_SPEED = 10;
const UI_PANEL_HEIGHT = 100;
const WORLD_CEILING = -50;

// Background
let starfield;

// Cooldowns
let bossTime;
let flashTime;
let nextSlowdownTime;
let slowTime;
let spawnTime;

// Debug measurements
let avgFPS = 0;
let numFPS = 0;

// Debug mode
let blackStarfield = false;
let lowGraphics = false;
let showFPS = false;
let showHitboxes = false;
let showStars = true;

// Entities
let boss;
let bullets;
let enemies;
let items;
let pl;
let ps;
let walls;

// Game state
let curLevel;
let level;
let levelScore;
let paused = false;
let score;
let scoreMult;
let scoreToAdd;
let toSpawn;
let toSpawnBoss;

// Powerups
let bombs;


// Add a score
function addScore(points) {
    scoreToAdd += points;
    setScoreStyle('#F1C40F', 'bold');
}

// Display a health bar for a boss
function bossHealthBar() {
    let h = boss.hp / boss.maxHp;
    if (h === 0) return;

    let c = color(215, 60, 44, 191);
    fill(c);
    noStroke();
    rectMode(CENTER);
    rect(width/2 - 0.5, 10, h * (width - 200), 10);
}

// Calculate FPS and update sidebar
function calculateFPS() {
    let f = frameRate();
    avgFPS += (f - avgFPS) / ++numFPS;
    document.getElementById('fps').innerHTML = 'FPS: ' + round(f);
    document.getElementById('avgfps').innerHTML = 'Avg. FPS: ' + avgFPS.toFixed(1);
}

// Clear all entities (except player)
function clearEntities() {
    boss = null;
    bullets = [];
    enemies = [];
    items = [];
    ps = [];
    walls = [];
}

// Update all cooldowns
function cooldown() {
    if (flashTime > 0) flashTime--;

    if (!paused) {
        if (bossTime > 0) {
            bossTime -= dt();
            if (bossTime <= 0) spawnBoss();
        }

        if (nextSlowdownTime > 0 && slowTime === 0) nextSlowdownTime -= dt();
        if (nextSlowdownTime < 0) nextSlowdownTime = 0;

        if (slowTime > 0) slowTime -= dt();
        if (slowTime < 0) slowTime = 0;

        if (spawnTime > 0) spawnTime -= dt();
        if (spawnTime < 0) spawnTime = 0;

        if (toSpawnBoss && enemies.length === 0) {
            toSpawnBoss = false;
            bossTime = BOSS_SPAWN_DELAY;
        }
    }
}

// Return current dt
function dt() {
    if (paused) {
        return 0;
    } else if (slowTime > 0) {
        return SLOWDOWN_DT;
    }
    return 1;
}

// Draw bomb
function drawBomb(x, y) {
    fill('#007C21');
    stroke(0, MODEL_LINE_ALPHA);
    rectMode(CORNER);
    rect(x, y, 20, 20);
}

// Draw heart
function drawHeart(x, y, empty) {
    fill(empty ? 0 : '#D73C2C');
    stroke(0, MODEL_LINE_ALPHA);
    rectMode(CORNER);
    rect(x, y, 20, 20);
}

// Load a level
function loadLevel() {
    if (LEVEL[level + 1]) {
        level++;
        curLevel = LEVEL[level];
        toSpawn = curLevel.spawnCount;

        // Reset cooldowns
        spawnTime = BOSS_GRACE_PERIOD;

        // Reset powerups
        bombs += BOMBS_PER_LEVEL;

        // Save score
        levelScore = score + scoreToAdd;
    }
}

// Respawn everything for current level
function reloadLevel() {
    curLevel = LEVEL[level];
    toSpawn = curLevel.spawnCount;
    toSpawnBoss = false;

    // Clear all entities
    clearEntities();
    spawnPlayer();

    // Reset cooldowns
    bossTime = 0;
    flashTime = 0;
    nextSlowdownTime = 0;
    slowTime = 0;
    spawnTime = SPAWN_GRACE_PERIOD;

    // Reset powerups
    bombs = BOMB_COUNT;
    slowdownReady = true;

    // Reset score
    score = levelScore;
    scoreToAdd = 0;
}

// Reset game to first level
function resetGame() {
    // Game state
    level = 0;
    levelScore = 0;
    score = 0;
    scoreMult = 1;
    scoreToAdd = 0;
    reloadLevel();
}

// Set score text style
function setScoreStyle(color, weight) {
    let s = document.getElementById('score').style;
    s.color = color;
    s.fontWeight = weight;
}

// Spawn a boss
function spawnBoss() {
    if (curLevel.boss) {
        boss = new Boss(width/2, WORLD_CEILING);
        applyTemplate(boss, BOSS[curLevel.boss]);
        boss.init();
    } else {
        loadLevel();
    }
}

// Spawn an enemy
function spawnEnemy() {
    spawnTime = randInt(curLevel.spawnTimeMin, curLevel.spawnTimeMax);
    let type = randWeight(curLevel.enemy, curLevel.enemyWeight);
    let e = new Enemy(random(width), WORLD_CEILING);
    applyTemplate(e, ENEMY[type]);
    e.init();

    // Determine spawn location
    if (!e.spawnAboveMap) {
        e.pos.y = MAP_HEIGHT - WORLD_CEILING;
    }
    
    enemies.push(e);
}

// Spawn an item
function spawnItem(x, y) {
    if (typeof x === 'undefined' || typeof y === 'undefined') {
        x = random(width);
        y = WORLD_CEILING;
    }
    let type = randWeight(curLevel.item, curLevel.itemWeight);
    items.push(new Item(x, y, ITEM[type]));
}

// Spawn the player at the correct coords
function spawnPlayer() {
    pl = new Player(width/2, MAP_HEIGHT * 3/4);
    pl.init();
}

// Update game status on displays
function status() {
    document.getElementById('level').innerHTML = 'Level: ' + (level + 1);
    document.getElementById('score').innerHTML = 'Score: ' + score;
    document.getElementById('scoremult').innerHTML = 'Multiplier: ' + scoreMult + 'x';

    // Debugging
    if (showFPS) calculateFPS();
}

// Draw player bombs
function uiBombs() {
    for (let i = 0; i < bombs; i++) {
        drawBomb(20 + 30*i, height - UI_PANEL_HEIGHT + 60);
    }
}

// Draw player health
function uiHealth() {
    let empty = pl.maxHp - (pl.hp - 1);
    for (let i = pl.maxHp; i >= 0; i--) {
        drawHeart(20 + 30*i, height - UI_PANEL_HEIGHT + 20, --empty > 0);
    }
}

// Draw the UI panel
function uiPanel() {
    // Draw grey rectangle
    fill(48);
    stroke(241, 196, 15);
    rectMode(CORNER);
    rect(0, height - UI_PANEL_HEIGHT, width, UI_PANEL_HEIGHT);

    // Draw all UI panel elements
    strokeWeight(2);
    uiBombs();
    uiHealth();
    uiSlowdown();
    strokeWeight(1);
}

// Draw indicator of slowdown recharge status
function uiSlowdown() {
    push();
    translate(width - 50, height - 50);
    rotate(180);
    stroke(0, MODEL_LINE_ALPHA);

    let loadPercent = (SLOWDOWN_WAIT_NEXT - nextSlowdownTime) / SLOWDOWN_WAIT_NEXT;
    let angle = 360 * loadPercent;
    
    // Draw blue/green portion
    if (angle > 0) {
        if (angle === 360) {
            fill(55, 219, 208, SLOWDOWN_ALPHA_FULL);
        } else {
            fill(55, 219, 208, SLOWDOWN_ALPHA);
        }
        arc(0, 0, 40, 40, 90, 90 + angle);
    }

    // Draw red portion
    if (angle < 360) {
        fill(231, 76, 60, SLOWDOWN_ALPHA);
        arc(0, 0, 40, 40, 90 + angle, 90);
    }

    pop();
}

// Update the score by slowly adding
function updateScore() {
    if (scoreToAdd >= SCORE_UPDATE_SPEED) {
        scoreToAdd -= SCORE_UPDATE_SPEED;
        score += SCORE_UPDATE_SPEED * scoreMult;
        if (scoreToAdd === 0) setScoreStyle('#ECF0F1', 'normal');
    } else {
        score += scoreToAdd * scoreMult;
        scoreToAdd = 0;
        setScoreStyle('#ECF0F1', 'normal');
    }
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
    // Ensure game can fit vertically inside screen
    let maxSize = MAP_HEIGHT + UI_PANEL_HEIGHT + 2;
    let h = windowHeight > maxSize ? maxSize : windowHeight;
    MAP_HEIGHT = h - UI_PANEL_HEIGHT - 2;
    let c = createCanvas(600, h - 2);
    c.parent('game');

    // Configure p5.js
    angleMode(DEGREES);
    ellipseMode(RADIUS);

    // Start background starfield
    starfield = new Starfield(NUM_STARS, STARFIELD_SPEED);

    // Begin level
    resetGame();
}

function draw() {
    // Draw the background and starfield
    flashTime > 0 ? background(255) : background(starfield.bg);
    starfield.display();

    // Update game status display
    if (!paused) updateScore();
    status();

    // Spawn enemies or boss
    if (!paused && spawnTime === 0 && toSpawn > 0) {
        toSpawn--;
        if (toSpawn === 0) toSpawnBoss = true;
        spawnEnemy();
    }

    // Update and draw all entities
    loopOver(items);
    loopOver(bullets);
    if (boss) boss.act();
    loopOver(enemies);
    pl.act();
    loopOver(walls);
    loopOver(ps);

    // Update all cooldowns
    cooldown();

    // Draw UI panel
    uiPanel();

    // Draw boss health bar
    if (boss) bossHealthBar();

    // Check for boss death
    if (boss && boss.dead) {
        boss.onDeath();
        boss = null;
    }

    // Check for player death
    if (pl.dead) pl.onDeath();
}

function keyPressed() {
    // Use a bomb
    if (key === 'C' || key === 'M') useBomb();

    // Toggle FPS display
    if (key === 'F') {
        showFPS = !showFPS;
        document.getElementById('debug').style.display = showFPS ? 'block' : 'none';
        if (showFPS) {
            avgFPS = 0;
            numFPS = 0;
        }
    }

    // Toggle low graphics settings
    if (key === 'G') {
        showStars = lowGraphics;
        lowGraphics = !lowGraphics;
        if (lowGraphics) ps = [];
    }

    // Toggle hitbox display
    if (key === 'H') showHitboxes = !showHitboxes;

    // Pause
    if (key === 'P') paused = !paused;

    // Toggle black starfield
    if (key === 'T') blackStarfield = !blackStarfield;

    // Use a slowdown
    if (key === 'X' || key === 'N') useSlowdown();

    // Toggle rendering stars
    if (key === 'Y') showStars = !showStars;
}
