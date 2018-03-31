class Starfield {
    constructor(num) {
        this.delta = [];
        this.noise = [];
        this.stars = [];

        // Create stars
        for (let i = 0; i < num; i++) {
            this.stars.push({
                noise: 10 * i,
                deltaNoise: random(0.03),
                r: random(2),
                x: random(width),
                y: random(height),
                dy: random(10)
            });
        }
    }

    // Render and update each star
    display() {
        for (let i = 0; i < this.stars.length; i++) {
            let s = this.stars[i];

            // Render star
            fill(noise(s.noise) * 255, 127);
            noStroke();
            ellipse(s.x, s.y, s.r, s.r);

            // Update position
            if (isRunning()) {
                s.y += s.dy;
                if (s.y - s.r > height) {
                    s.r = random(2);
                    s.x = random(width);
                    s.y = 0;
                    s.dy = random(10);
                }
            }

            // Update noise
            s.noise += s.deltaNoise;
        }
    }
}
