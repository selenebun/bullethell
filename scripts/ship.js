class Ship extends Entity {
    constructor(x, y, template) {
        super(x, y);

        // Display
        this.color = '#E74C3C';

        // Misc
        this.hp = 0;
        this.isPlayer = false;

        // Stats
        this.cooldown = 0;      // ticks until able to fire again
        this.fireCool = 10;     // cooldown between firing bullets
        this.speed = 3;         // movement speed
        this.points = 0;

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

    // Border behavior
    borders() {
        let r = this.r * 2;
        if (this.pos.x - r < 0) this.pos.x = r;
        if (this.pos.x + r > width) this.pos.x = width - r;
        if (this.pos.y - r > height) this.dead = true;
    }

    // Check for collision with enemy ships
    collideShips() {
        for (let i = 0; i < enemies.length; i++) {
            let e = enemies[i];
            if (this.collide(e)) {
                this.damage();
                return;
            }
        }
    }

    // Deal damage
    damage(amt) {
        if (typeof amt === 'undefined') amt = 1;
        this.hp > 0 ? this.hp -= amt : this.explode();
    }

    // Create explosion particle effect
    explode() {
        this.dead = true;
        ps.push(new ParticleSystem(this.pos.x, this.pos.y, PS.basicExplosion));
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

    // Do something when entity dies
    onDeath() {}

    // Update physics, age, etc.
    update() {
        super.update();
        if (this.cooldown > 0) this.cooldown--;
    }

    // Fire weapon
    weapon() {}
}
