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

    // Render flash layer at a particular coordinate.
    display(x, y) {
        image(this.graphics, x, y);
    }

    // Update flash layer and calculate duration.
    update() {
        if (this.duration > -1) {
            this.duration--;
            if (this.duration === -1) {
                this.graphics.clear();
            }
        }
    }
}
