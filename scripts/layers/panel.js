'use strict';

// Bottom UI panel.
class Panel {
    constructor(width, height) {
        this.graphics = createGraphics(width, height);
        this.width = width;
        this.height = height;
    }

    // Render panel to screen at a particular coordinate.
    display(x, y) {
        image(this.graphics, x, y);
    }

    // Render panel.
    update() {
        this.graphics.background(60);

        this.graphics.stroke('#F1C40F');
        this.graphics.line(0, 0, this.width, 0);

        this.graphics.fill('#C0392B');
        this.graphics.stroke(0);
        this.graphics.rectMode(CENTER);
        let hw = 20;
        let dist = 10;
        for (let i = 0; i < 10; i++) {
            this.graphics.rect(20 + i * (hw + dist), this.height / 2, hw, hw);
        }
    }
}
