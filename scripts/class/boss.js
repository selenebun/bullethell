class Boss extends Ship {
    constructor(x, y) {
        super(x, y);

        // AI
        this.stage = null;
        this.stageCycle = [];
        this.stageIndex = 0;
        this.stages = {};

        // Physics
        this.r = 28;

        // Stats
        this.points = 2000;
    }

    // All operations to do per tick
    act() {
        if (isRunning()) {
            this.ai();
            this.collidePlayer();
        }
        super.act();
    }

    // Damage player if in contact
    collidePlayer() {
        if (this.collide(pl)) pl.damage();
    }

    // Update all cooldowns
    // TODO progress boss fight stage
    cooldown() {
        super.cooldown();
    }

    // Deal damage
    // TODO progress boss fight stage
    damage() {
        super.damage();
    }

    // Trigger next stage of boss fight
    nextStage() {
        // Null stage if stage cycle empty or no defined stages
        if (this.stageCycle.length === 0 || Object.keys(this.stages).length === 0) {
            this.stage = null;
            return;
        }

        // Wrap to beginning of stage cycle
        if (this.stageIndex === this.stageCycle.length - 1) {
            this.stageIndex = 0;
        } else {
            this.stageIndex++;
        }

        // Use key if valid
        let key = this.stageCycle[this.stageIndex];
        if (key in this.stages) {
            this.stage = key;
            this.stages[key].init();
        } else {
            this.stage = null;
        }
    }

    // Events
    // TODO confetti effect
    onKilled() {
        pl.score += this.points;
    }
}
