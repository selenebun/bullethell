// Flash layer used for visual effects.
class Flash {
    constructor(width, height) {
        this.graphics = createGraphics(width, height);
        this.duration = 0;
    }

    // Flash a color for a particular duration.
    flash(color, duration) {
        this.duration = duration;
        this.graphics.background(color);
    }

    // Render flash at a particular coordinate.
    display(x, y) {
        if (this.duration > 0) {
            this.duration--;
            image(this.graphics, x, y);
        }
    }
}
