// Apply properties from a template to an object
function applyTemplate(obj, template) {
    if (typeof template === 'undefined') return;

    let keys = Object.keys(template);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        obj[key] = template[key];
    }
}

// Check if point is offscreen
function offscreen(x, y, r) {
    return (x + r < 0 || x - r > width || y + r < 0 || y - r > height);
}
