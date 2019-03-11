const STAR_ALPHA = 95;
const STAR_MIN_SPEED = 0.5;
const STAR_MAX_SPEED = 3;
const STAR_RADIUS = 1.5;

// Vertically scrolling starfield.
class Starfield {
    constructor(width, height, numStars) {
        this.graphics = createGraphics(width, height);
        this.width = width;
        this.height = height;
        this.bg = color(0);
        this.fg = color(255, STAR_ALPHA);
        this.stars = [];

        // Create stars at random positions.
        for (let i = 0; i < numStars; i++) {
            let r = random(STAR_RADIUS);
            let x = random(r, width - r);
            let y = random(r, height - r);
            let dy = random(STAR_MIN_SPEED, STAR_MAX_SPEED);
            this.stars.push({
                x,
                y,
                r,
                dy,
            });
        }

        // Set graphics buffer drawing modes.
        this.graphics.fill(this.fg);
        this.graphics.noStroke();
    }

    // Render starfield to screen at a particular coordinate.
    display(x, y) {
        image(this.graphics, x, y);
    }

    // Render stars to the graphics buffer and update their positions.
    update(dt) {
        // Clear background.
        this.graphics.background(this.bg);

        // Render and update stars.
        for (let star of this.stars) {
            this.graphics.circle(star.x, star.y, star.r);

            // Update position.
            star.y += star.dy * dt;
            if (star.y - star.r > this.height) {
                star.r = random(STAR_RADIUS);
                star.x = random(star.r, this.width - star.r);
                star.y = -star.r;
                star.dy = random(STAR_MIN_SPEED, STAR_MAX_SPEED);
            }
        }
    }
}
