const GAME_WIDTH = 640;
const GAME_HEIGHT = 640;
const PANEL_HEIGHT = 40;

let flash; // Flash layer.
let starfield; // Starfield background.

function setup() {
    let totalHeight = min(GAME_HEIGHT + PANEL_HEIGHT, windowHeight - 2);
    let canvas = createCanvas(GAME_WIDTH, totalHeight);
    canvas.parent('game');

    // Create graphics buffers.
    flash = new Flash(GAME_WIDTH, GAME_HEIGHT);
    starfield = new Starfield(GAME_WIDTH, GAME_HEIGHT, 200);
}

function draw() {
    // Draw and update the starfield in the background.
    starfield.update(1);
    starfield.display(0, 0);

    // Draw and update flash layer.
    flash.update(0, 0);
}
