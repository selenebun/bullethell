// Flash layer used for visual effects.
class Flash {
    constructor(width, height) {
        this.graphics = createGraphics(width, height);
        this.duration = -1;
    }

    // Flash a color for a particular duration.
    flash(color, duration) {
        this.duration = duration;
        this.graphics.background(color);
    }

    // Update flash layer and render at a particular coordinate.
    update(x, y) {
        if (this.duration > 0) {
            this.duration--;
            image(this.graphics, x, y);
        }
    }
}
