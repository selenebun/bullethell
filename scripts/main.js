'use strict';

const GAME_WIDTH = 640;
const GAME_HEIGHT = 640;
const PANEL_HEIGHT = 40;

let flash; // Flash layer.
let panel; // UI panel.
let starfield; // Starfield background.

let paused = false;

function setup() {
    let totalHeight = min(GAME_HEIGHT + PANEL_HEIGHT, windowHeight - 2);
    let canvas = createCanvas(GAME_WIDTH, totalHeight);
    canvas.parent('game');

    // Create graphics buffers.
    flash = new Flash(GAME_WIDTH, GAME_HEIGHT);
    panel = new Panel(GAME_WIDTH, PANEL_HEIGHT);
    starfield = new Starfield(GAME_WIDTH, GAME_HEIGHT, 200);

    // Display UI panel.
    panel.update();
    panel.display(0, height - PANEL_HEIGHT);
}

function draw() {
    // Draw and update the starfield in the background.
    if (!paused) starfield.update(1);
    starfield.display(0, 0);

    // Draw and update flash layer.
    flash.display(0, 0);
}

function keyPressed() {
    // Use spacebar to pause.
    if (key === ' ') paused = !paused;
}
