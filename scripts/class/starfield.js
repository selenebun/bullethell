class Starfield {
    constructor(num, starSpeed) {
        this.alpha = LEVEL[0].alpha;
        this.bg = color(LEVEL[0].bg);
        this.color = color(LEVEL[0].color);
        this.speed = starSpeed;
        this.stars = [];

        // Create stars
        for (let i = 0; i < num; i++) {
            this.stars.push({
                noise: 10 * i,
                deltaNoise: random(0.03),
                r: random(2),
                x: random(width),
                y: random(height),
                dy: random(starSpeed)
            });
        }
    }

    // Render and update each star
    display() {
        // Lerp to proper colors
        if (blackStarfield) {
            this.alpha = 127;
            this.bg = color(0);
            this.color = color(255);
        } else {
            this.alpha = lerp(this.alpha, curLevel.alpha, STARFIELD_LERP);
            this.bg = lerpColor(this.bg, color(curLevel.bg), STARFIELD_LERP);
            this.color = lerpColor(this.color, color(curLevel.color), STARFIELD_LERP);
        }

        // Skip rendering stars if low graphics mode
        if (!showStars) return;

        // Render stars
        for (let i = 0; i < this.stars.length; i++) {
            let s = this.stars[i];

            // Render star
            this.color.setAlpha(this.alpha * noise(s.noise));
            fill(this.color);
            noStroke();
            ellipse(s.x, s.y, s.r, s.r);

            // Update position
            if (!paused) {
                s.y += s.dy * dt();
                if (s.y - s.r > height) {
                    s.r = random(2);
                    s.x = random(width);
                    s.y = 0;
                    s.dy = random(this.speed);
                }
            }

            // Update noise
            s.noise += s.deltaNoise;
        }
    }
}
