const BOSS = {};

BOSS.boss0 = {
    // AI
    nextStage: 'enter',
    stages: {
        enter: {
            nextStage: 'ricochet',
            ai: function(b) {
                // Force player back
                if (pl.pos.y < MAP_HEIGHT * 3/4) {
                    pl.pos.y = lerp(pl.pos.y, MAP_HEIGHT * 3/4, 0.05);
                }

                // Move to next stage once positioned correctly
                if (b.pos.y >= MAP_HEIGHT/8) {
                    b.pos.y = MAP_HEIGHT/8;
                    b.vel.y = 0;
                    b.switchStage();
                }
            },
            init: function(b) {
                b.speed = 1;
                b.vel = createVector(0, b.speed);
            }
        },
        ricochet: {
            nextStage: 'wait',
            timeLimit: 720,
            ai: function(b) {
                b.speed = lerp(b.speed, 3, 0.05);
                b.vel.setMag(b.speed);

                // Draw a lightning wall
                noFill();
                stroke('#F9B32F');
                strokeWeight(4);
                beginShape();
                for (let i = 0; i < 21; i++) {
                    vertex(width/20 * i, MAP_HEIGHT/4 + random(-10, 10));
                }
                endShape();
                strokeWeight(1);

                // Destroy player's bullets that go above wall
                for (let i = 0; i < bullets.length; i++) {
                    let e = bullets[i];
                    if (e.fromPlayer) e.mapTop = MAP_HEIGHT/4;
                }

                // Fire ricochet bullets
                b.fire();
            },
            attack: function(b) {
                emitBullets(b.pos.x, b.pos.y, 90, [-45, 0, 45], 5, 5, BULLET.ricochet);
            },
            finish: function(b) {
                b.vel.x = 0;
                pl.mapTop = 0;
            },
            init: function(b) {
                b.fireRate = 35;
                b.vel = createVector(randSign(), 0);
                pl.mapTop = MAP_HEIGHT/4;
            }
        },
        wait: {
            nextStage: 'center',
            timeLimit: 120,
            ai: function(b) {
                b.pos.x = lerp(b.pos.x, width/2, 0.05);
            }
        },
        center: {
            nextStage: 'spiral',
            ai: function(b) {
                if (b.pos.y >= MAP_HEIGHT/2) {
                    b.pos.y = MAP_HEIGHT/2;
                    b.vel.y = 0;
                    b.switchStage();
                }
            },
            init: function(b) {
                b.vel.y = b.speed;
            }
        },
        spiral: {
            healthLimit: 0.5,
            nextStage: 'up',
            timeLimit: 1200,
            ai: function(b) {
                b.fire();
            },
            attack: function(b) {
                for (let i = 0; i < b.emitters.length; i++) {
                    b.emitters[i].fire();
                }
            },
            finish: function(b) {
                // Kill emitters
                for (let i = 0; i < b.emitters.length; i++) {
                    b.emitters[i].dead = true;
                }
                b.emitters = [];
            },
            init: function(b) {
                // Make cooldown 0
                b.fireRate = 0;
                
                // Create emitters
                let e1 = new Emitter(-200, 0, b);
                let e2 = new Emitter(200, 0, b);
                applyTemplate(e1, {
                    // Misc
                    bulletTemplate: BULLET.basic,
                    fireRate: 60,
                    angles: [0, 60, 120, 180, 240, 300],
                    angVel: 10,
                    maxSpeed: 2,
                    minSpeed: 2
                });
                let angles = [];
                for (let i = 0; i < 6; i++) {
                    let a = 60 * i;
                    for (let j = 0; j < 3; j++) {
                        angles.push(a + 15*j);
                    }
                }
                applyTemplate(e2, {
                    // Misc
                    bulletTemplate: BULLET.basic,
                    fireRate: 60,
                    angles: angles,
                    angVel: -10,
                    maxSpeed: 1,
                    minSpeed: 1
                });
                b.emitters = [e1, e2];
            }
        },
        up: {
            nextStage: 'clear',
            ai: function(b) {
                if (b.pos.y <= MAP_HEIGHT/8) {
                    b.pos.y = MAP_HEIGHT/8;
                    b.vel.y = 0;
                    b.switchStage();
                }
            },
            init: function(b) {
                b.vel = createVector(0, -b.speed/4);
            }
        },
        clear: {
            nextStage: 'ricochet',
            timeLimit: 60,
            ai: function(b) {
                // Force player back
                if (pl.pos.y < MAP_HEIGHT * 3/4) {
                    pl.pos.y = lerp(pl.pos.y, MAP_HEIGHT * 3/4, 0.05);
                }
            }
        }
    },
    // Display
    color: '#009B90',
    model: MODEL.ship.boss0,
    // Stats
    hp: 360,
    points: 2000,
    // Methods
    onHitLeft: function() {
        this.pos.x = this.mapLeft + this.r * this.edgeRadius;
        this.vel.x *= -1;
    },
    onHitRight: function() {
        this.pos.x = this.mapRight - this.r * this.edgeRadius;
        this.vel.x *= -1;
    }
};
