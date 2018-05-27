const BOSS = {};

BOSS.boss1 = {
    // AI
    nextStage: 'enter',
    stages: {
        enter: {
            nextStage: 'ricochet',
            ai(b) {
                // Force player back
                if (pl.pos.y < MAP_HEIGHT * 3/4) {
                    pl.pos.y = lerp(pl.pos.y, MAP_HEIGHT * 3/4, 0.05*dt());
                }

                // Move to next stage once positioned correctly
                if (b.pos.y >= MAP_HEIGHT/8) {
                    b.pos.y = MAP_HEIGHT/8;
                    b.vel.y = 0;
                    b.switchStage();
                }
            },
            init(b) {
                b.speed = 1;
                b.vel = createVector(0, b.speed);
                // Whether to do needle stage next
                b.needleStage = random() < 0.5;
            }
        },
        ricochet: {
            nextStage: 'wait',
            timeLimit: 720,
            ai(b) {
                b.speed = lerp(b.speed, 3, 0.05 * dt());
                b.vel.setMag(b.speed);

                // Destroy player's bullets that go above wall
                for (let i = 0; i < bullets.length; i++) {
                    let e = bullets[i];
                    if (e.fromPlayer) e.mapTop = MAP_HEIGHT/4;
                }

                // Fire ricochet bullets
                b.fire();
            },
            attack(b) {
                emitBullets(b.pos.x, b.pos.y, 90, [-45, 0, 45], 5, 5, BULLET.ricochet);
            },
            init(b) {
                b.fireRate = 35;
                b.vel = createVector(randSign(), 0);
                pl.mapTop = MAP_HEIGHT/4;

                // Create a lightning wall
                walls.push(new Wall(MAP_HEIGHT/4, 20, true));
            },
            finish(b) {
                b.vel.x = 0;
                pl.mapTop = 0;

                // Clear lightning walls
                walls = [];
            }
        },
        wait: {
            nextStage: 'center',
            timeLimit: 120,
            ai(b) {
                b.pos.x = lerp(b.pos.x, width/2, 0.05 * dt());
            }
        },
        center: {
            ai(b) {
                if (b.pos.y >= MAP_HEIGHT/2) {
                    b.pos.y = MAP_HEIGHT/2;
                    b.vel.y = 0;
                    b.nextStage = b.needleStage ? 'needle' : 'spiral';
                    b.needleStage = !b.needleStage;
                    b.switchStage();
                }
            },
            init(b) {
                b.vel.y = b.speed;
            }
        },
        spiral: {
            healthLimit: 0.3,
            nextStage: 'up',
            timeLimit: 1200,
            ai(b) {
                b.fire();
            },
            attack(b) {
                for (let i = 0; i < b.emitters.length; i++) {
                    b.emitters[i].fire();
                }
            },
            finish(b) {
                // Kill emitters
                for (let i = 0; i < b.emitters.length; i++) {
                    b.emitters[i].dead = true;
                }
                b.emitters = [];
            },
            init(b) {
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
            ai(b) {
                if (b.pos.y <= MAP_HEIGHT/8) {
                    b.pos.y = MAP_HEIGHT/8;
                    b.vel.y = 0;
                    b.switchStage();
                }
            },
            init(b) {
                b.vel = createVector(0, -b.speed/4);
            }
        },
        clear: {
            nextStage: 'ricochet',
            timeLimit: 60,
            ai(b) {
                // Force player back
                if (pl.pos.y < MAP_HEIGHT * 3/4) {
                    pl.pos.y = lerp(pl.pos.y, MAP_HEIGHT * 3/4, 0.05 * dt());
                }
            }
        },
        needle: {
            healthLimit: 0.2,
            nextStage: 'up',
            timeLimit: 1000,
            ai(b) {
                b.fire();
            },
            attack(b) {
                let a = random(360);
                emitBullets(b.pos.x, b.pos.y, a, [0, 120, 240], 3, 4, BULLET.twoStage);
            },
            init(b) {
                b.fireRate = 50;
            }
        }
    },
    // Display
    color: '#009B90',
    model: MODEL.ship.boss1,
    // Stats
    hp: 380,
    points: 2000,
    // Methods
    onHitLeft() {
        this.pos.x = this.mapLeft + this.r * this.edgeRadius;
        this.vel.x *= -1;
    },
    onHitRight() {
        this.pos.x = this.mapRight - this.r * this.edgeRadius;
        this.vel.x *= -1;
    }
};

BOSS.heavyBomber = {
    // AI
    nextStage: 'enter',
    stages: {
        enter: {
            nextStage: 'bombs',
            ai(b) {
                // Move to next stage once positioned correctly
                if (b.pos.y >= MAP_HEIGHT/6) {
                    b.pos.y = MAP_HEIGHT/6;
                    b.vel.y = 0;
                    b.switchStage();
                }
            },
            init(b) {
                b.speed = 1;
                b.vel = createVector(0, b.speed);
            }
        },
        bombs: {
            nextStage: 'center',
            healthLimit: 0.2,
            timeLimit: 900,
            ai(b) {
                b.speed = lerp(b.speed, 2, 0.05 * dt());
                b.vel.setMag(b.speed);
                if (random() < 0.003) b.vel.x *= -1;

                // Fire large bombs
                b.fire();
            },
            attack(b) {
                let a = random() < 0.5 ? 0 : 180;
                emitBullets(b.pos.x, b.pos.y, a, [0], 3, 5, BULLET.largeBomb);
            },
            init(b) {
                b.fireRate = 70;
                b.vel = createVector(randSign(), 0);
            },
            finish(b) {
                b.vel.x = 0;
            }
        },
        center: {
            nextStage: 'repel',
            timeLimit: 260,
            ai(b) {
                b.pos.x = lerp(b.pos.x, width/2, 0.05 * dt());
            }
        },
        repel: {
            nextStage: 'enemies',
            timeLimit: 60,
            ai(b) {
                // Force player back
                if (pl.pos.y < MAP_HEIGHT * 3/4) {
                    pl.pos.y = lerp(pl.pos.y, MAP_HEIGHT * 3/4, 0.05*dt());
                }
            }
        },
        enemies: {
            nextStage: 'wait',
            timeLimit: 1200,
            ai(b) {
                // Destroy player's bullets that go above wall
                for (let i = 0; i < bullets.length; i++) {
                    let e = bullets[i];
                    if (e.fromPlayer) e.mapTop = MAP_HEIGHT/3;
                }

                // Spawn enemies
                b.fire();
            },
            attack(b) {
                spawnEnemy();
            },
            init(b) {
                b.fireRate = 80;
                pl.mapTop = MAP_HEIGHT/3;

                // Create a lightning wall
                walls.push(new Wall(MAP_HEIGHT/3, 20, true));
            }
        },
        wait: {
            nextStage: 'delay',
            ai(b) {
                // Destroy player's bullets that go above wall
                for (let i = 0; i < bullets.length; i++) {
                    let e = bullets[i];
                    if (e.fromPlayer) e.mapTop = MAP_HEIGHT/3;
                }
                
                if (enemies.length === 0) b.switchStage();
            },
            finish(b) {
                pl.mapTop = 0;

                // Clear lightning walls
                walls = [];
            }
        },
        delay: {
            nextStage: 'bullets',
            timeLimit: 60
        },
        bullets: {
            nextStage: 'bombs',
            healthLimit: 0.2,
            timeLimit: 1200,
            ai(b) {
                b.fire();
            },
            attack(b) {
                let a = random(30, 150);
                emitBullets(b.pos.x, b.pos.y, a, [0], 4, 5, BULLET.large);
                
                if (random() < 0.1) {
                    let a = random(30, 150);
                    emitBullets(b.pos.x, b.pos.y, a, [0], 0, 3, BULLET.bomb);
                }
            },
            init(b) {
                b.fireRate = 50;
            },
            finish(b) {}
        }
    },
    // Display
    color: '#009C41',
    model: MODEL.ship.heavyBomber,
    // Physics
    r: 54,
    // Stats
    hp: 440,
    points: 2000,
    // Methods
    onHitLeft() {
        this.pos.x = this.mapLeft + this.r * this.edgeRadius;
        this.vel.x *= -1;
    },
    onHitRight() {
        this.pos.x = this.mapRight - this.r * this.edgeRadius;
        this.vel.x *= -1;
    }
};
