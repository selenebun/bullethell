// Apply properties from a template to an object
function applyTemplate(obj, template) {
    if (typeof template === 'undefined') return;

    let keys = Object.keys(template);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        obj[key] = template[key];
    }
}

// Run the main loop for an array of entities
function mainLoop(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        let e = arr[i];
        e.act();
        if (e.dead) {
            arr.splice(i, 1);
            if (e.onDeath) e.onDeath();
        }
    }
}

// Check if point is offscreen
function offscreen(x, y, r) {
    return (x + r < 0 || x - r > width || y + r < 0 || y - r > height);
}

// Returns a random integer, using the same arguments as p5js random()
function randint() {
    return floor(random(...arguments));
}

// Returns a random item from an array using a second array of weights
function randWeight(arr, weight) {
    // Get total weight
    let total = weight.reduce(function(prev, cur) {
        return prev + cur;
    });

    let r = random(total);
    let weightSum = 0;
    for (let i = 0; i < arr.length; i++) {
        weightSum += weight[i];
        if (r <= weightSum) return arr[i];
    }
}
