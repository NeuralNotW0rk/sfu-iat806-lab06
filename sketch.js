let boundingBox;
let boxSize = 200;

let balls = [];
let numBalls = 100;

function lightingSetup(lightColor) {
    ambientLight(lightColor, 150);
    pointLight(lightColor, 100, -60, 100);
}

function setup() {
    createCanvas(512, 512, WEBGL);
    // Make the shader run faster 
    // reducing number of pixels 
    pixelDensity(1);

    boundingBox = new Box(createVector(0, 0, 0), boxSize, boxSize, boxSize);

    for (let i = 0; i < numBalls; i++) {
        balls.push(new Ball(createVector(0, 0, 0), 10));
    }
}

function draw() {
    background(230);
    lightingSetup(color(255, 255, 255));

    orbitControl();

    
    balls.forEach((ball) => {
        ball.update();
        boundingBox.checkCollision(ball);
        ball.render();
    });
    boundingBox.render();
}

function mousePressed() {
    balls.forEach((ball) => {
        ball.launch(createVector(mouseX, mouseY, random(-50, 50)));
    });
}