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
            if (this.stage) this.stages[this.stage].ai(this);
            this.collidePlayer();
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
        if (this.nextStageTime <= 0 && this.nextStageTime > -1) this.switchStage(this.nextStage);
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
        pl.score += this.points;
        bullets = [];
        loadLevel();
        this.explode();
    }

    // Trigger next stage of boss fight
    switchStage() {
        this.healthCooldown = -1;
        this.nextStageTime = -1;
        if (this.stage && this.stages[this.stage] && this.stages[this.stage].finish) {
            this.stages[this.stage].finish(this);
        }
        if (this.nextStage in this.stages) {
            this.stage = this.nextStage;
            let curStage = this.stages[this.stage];
            if (curStage.init) curStage.init(this);
            this.nextStage = curStage.nextStage;
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
