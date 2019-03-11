const GAME_WIDTH = 640;
const GAME_HEIGHT = 640;
const PANEL_HEIGHT = 40;

let starfield;

function setup() {
    let totalHeight = min(GAME_HEIGHT + PANEL_HEIGHT, windowHeight - 2);
    let canvas = createCanvas(GAME_WIDTH, totalHeight);
    canvas.parent('game');

    background(0);
    fill(60);
    noStroke();
    rect(0, height, width, -PANEL_HEIGHT);

    stroke('#F1C40F');
    line(0, height - PANEL_HEIGHT, width, height - PANEL_HEIGHT);

    fill('#C0392B');
    stroke(0);
    rectMode(CENTER);
    let hw = 20;
    let dist = 10;
    for (let i = 0; i < 10; i++) {
        rect(20 + i * (hw + dist), height - PANEL_HEIGHT / 2, hw, hw);
    }

    // Create starfield background.
    starfield = new Starfield(GAME_WIDTH, GAME_HEIGHT, 200);
}

function draw() {
    // Draw and update the starfield in the background.
    starfield.update(1);
    starfield.display(0, 0);
}
