let cursorX = 0;
let cursorY = 0;
let targetX = 0;
let targetY = 0;
let trail = [];
let glitchOffset = 0;
let glitchTimer = 0;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('pointer-events', 'none');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '10000');

    noCursor();

    for (let i=0; i<10; i++) {
        trail.push({ x: mouseX, y: mouseY });
    }
}

function draw() {
    clear();

    targetX = mouseX;
    targetY = mouseY;
    cursorX += (targetX - cursorX) * 0.3;
    cursorY += (targetY - cursorY) * 0.3;

    trail.push({ x: cursorX, y: cursorY });
    if (trail.length > 10) {
        trail.shift();
    }

    glitchTimer++;
    if (glitchTimer > 60) {
        glitchOffset = random(-3, 3);
        glitchTimer = 0;
    } else {
        glitchOffset *= 0.9;
    }

    for (let i=0; i<trail.length; i++) {
        let alpha = map(i, 0, trail.length, 0, 100);
        let size = map(i, 0, trail.length, 5, 15);

        noFill();
        stroke(105, 230, 248, alpha);
        strokeWeight(2);
        circle(trail[i].x, trail[i].y, size);
    }

    push();
    translate(cursorX, cursorY);

    stroke(255, 0, 60, 150);
    strokeWeight(2);
    noFill();
    circle(glitchOffset, 0, 25);

    stroke(105, 230, 248);
    strokeWeight(2);
    noFill();
    circle(0, 0, 25);

    stroke(105, 230, 248);
    strokeWeight(2);
    line(-8, 0, 8, 0);
    line(0, -8, 0, 8);

    fill(255, 0, 60);
    noStroke();
    circle(0, 0, 4);

    stroke(105, 230, 248);
    strokeWeight(2);

    line(-12, -12, -8, -12);
    line(-12, -12, -12, -8);
    
    line(12, -12, 8, -12);
    line(12, -12, 12, -8);
    
    line(-12, 12, -8, 12);
    line(-12, 12, -12, 8);
    
    line(12, 12, 8, 12);
    line(12, 12, 12, 8);

    pop();

    if (random() > 0.95) {
        stroke(105, 230, 248, 50);
        strokeWeight(1);
        line(0, cursorY, width, cursorY);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
