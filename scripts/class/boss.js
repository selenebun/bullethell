class Boss extends Ship {
    constructor(x, y) {
        super(x, y);

        // AI
        this.nextStage = null;
        this.stage = null;
        this.stages = {};

        // Cooldown
        this.healthCooldown = -1;
        this.nextStageTime = -1;

        // Display
        this.boomSize = 256;
        this.boomSpeedMax = 4;
        this.boomType = PS.confetti;

        // Misc
        this.dropRate = 0.002;
        this.emitters = [];
        this.type = 'boss';

        // Physics
        this.r = 28;

        // Stats
        this.points = 1000;
    }

    // All operations to do per tick
    act() {
        if (!paused) {
            if (this.stage && this.stages[this.stage].ai) {
                this.stages[this.stage].ai(this);
            }
            this.collidePlayer();
            this.spawnItem();
        }
        super.act();
    }

    // Damage player if in contact
    collidePlayer() {
        if (this.collide(pl)) pl.damage();
    }

    // Update all cooldowns
    cooldown() {
        super.cooldown();
        if (this.nextStageTime > 0) this.nextStageTime -= dt();
        if (this.nextStageTime <= 0 && this.nextStageTime > -1) this.switchStage();
    }

    // Deal damage
    damage() {
        super.damage();
        if (this.healthCooldown > 0) this.healthCooldown--;
        if (this.healthCooldown === 0) this.switchStage();
    }

    // Fire weapon
    fire() {
        if (this.fireTime > 0) return;
        this.fireTime = this.fireRate;
        if (this.stage in this.stages && this.stages[this.stage].attack) {
            this.stages[this.stage].attack(this);
        }
    }

    // Any dynamic initialization to do
    init() {
        super.init();
        this.switchStage();
    }

    // Events
    onKilled() {
        addScore(this.points);
        bullets = [];
        loadLevel();
        this.explode();
    }

    // Spawn an item above the map
    spawnItem() {
        if (random() < this.dropRate * dt()) spawnItem();
    }

    // Trigger next stage of boss fight
    switchStage() {
        this.healthCooldown = -1;
        this.nextStageTime = -1;

        // Finish stage
        if (this.stage && this.stages[this.stage] && this.stages[this.stage].finish) {
            this.stages[this.stage].finish(this);
        }

        // Start the next stage
        if (this.nextStage in this.stages) {
            this.stage = this.nextStage;
            let curStage = this.stages[this.stage];
            if (curStage.init) curStage.init(this);

            // Set next stage
            if (Array.isArray(curStage.nextStage)) {
                // Pick random stage from array
                this.nextStage = random(curStage.nextStage);
            } else {
                this.nextStage = curStage.nextStage;
            }

            // Set limits for switching stage
            let t = curStage.timeLimit;
            this.nextStageTime = t ? t : -1;
            let h = curStage.healthLimit;
            if (h) {
                this.healthCooldown = h * this.maxHp;
            }
        } else {
            this.stage = null;
        }
    }
}
