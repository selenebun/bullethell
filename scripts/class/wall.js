class Wall {
    constructor(pos, numSegments, isHorizontal) {
        // Display
        this.amplitude = 10;
        this.color = '#F9B32F';
        this.num = numSegments;
        this.weight = 4;

        // Misc
        this.dead = false;

        // Physics
        this.horizontal = isHorizontal;
        this.pos = pos;
    }

    // All operations to do per tick
    act() {
        this.collidePlayer();
        this.display();
    }

    // Check for collision with player
    collidePlayer() {}

    // Display on the canvas
    display() {
        noFill();
        stroke(this.color);
        strokeWeight(this.weight);
        beginShape();
        for (let i = 0; i < (this.num + 1); i++) {
            let amp = random(-this.amplitude, this.amplitude);
            if (this.horizontal) {
                vertex(width/this.num*i, this.pos + amp);
            } else {
                vertex(this.pos + amp, MAP_HEIGHT/this.num*i);
            }
        }
        endShape();
        strokeWeight(1);
    }

    // Any dynamic initialization to do
    init() {}

    // Events
    onDeath() {}
}
