class Ship extends Entity {
    constructor(x, y, template) {
        super(x, y);

        // Misc
        this.hp = 1;
        this.isPlayer = false;

        // Stats
        this.cooldown = 0;      // ticks until able to fire again
        this.fireCool = 5;     // cooldown between firing bullets

        // Substitute properties from template
        applyTemplate(this, template);

        // Set max HP
        this.maxHp = this.hp;

        // Set any additional properties
        this.init();
    }

    // Call all necessary methods each frame
    act() {
        this.ai();
        super.act();
    }

    // Dynamically update behavior
    ai() {}

    // Deal damage
    damage(amt) {
        if (typeof amt === 'undefined') amt = 1;
        this.hp > 0 ? this.hp -= amt : this.dead = true;
    }

    // Heal
    heal(amt) {
        if (typeof amt === 'undefined') amt = 1;
        if (this.hp < this.maxHp) this.hp += amt;
        if (this.hp > this.maxHp) this.hp = this.maxHp;
    }

    // Check cooldown and fire weapon
    fire() {
        if (this.cooldown > 0) return;
        this.cooldown = this.fireCool;
        this.weapon();
    }

    // Update physics, age, etc.
    update() {
        super.update();
        if (this.cooldown > 0) this.cooldown--;
    }

    // Fire weapon
    weapon() {}
}
