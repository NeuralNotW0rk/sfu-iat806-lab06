class Box {
    constructor(position, width, height, depth, top = true) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.top = top;
    }

    // We're only doing bounding boxes for now.
    checkCollision(shape) {
        let xMin = this.position.x - this.width / 2;
        let xMax = this.position.x + this.width / 2;
        let yMin = this.position.y - this.height / 2;
        let yMax = this.position.y + this.height / 2;
        let zMin = this.position.z - this.depth / 2;
        let zMax = this.position.z + this.depth / 2;

        // x bounds
        if (shape.position.x <= xMin + shape.radius) {
            shape.velocity.x = -shape.velocity.x * shape.elasticity;
            shape.position.x = xMin + shape.radius;
        }
        if (shape.position.x >= xMax - shape.radius) {
            shape.velocity.x = -shape.velocity.x * shape.elasticity;
            shape.position.x = xMax - shape.radius;
        }

        // y bounds
        if (this.top && shape.position.y <= yMin + shape.radius) {
            shape.velocity.y = -shape.velocity.y * shape.elasticity;
            shape.position.y = yMin + shape.radius;
        }
        if (shape.position.y >= yMax - shape.radius) {
            shape.velocity.y = -shape.velocity.y * shape.elasticity;
            shape.position.y = yMax - shape.radius;
        }

        // z bounds
        if (shape.position.z <= zMin + shape.radius) {
            shape.velocity.z = -shape.velocity.z * shape.elasticity;
            shape.position.z = zMin + shape.radius;
        }
        if (shape.position.z >= zMax - shape.radius) {
            shape.velocity.z = -shape.velocity.z * shape.elasticity;
            shape.position.z = zMax - shape.radius;
        }
    }

    render() {
        push();
        // Fully transparent
        noFill();
        translate(this.position);
        box(this.width, this.height, this.depth);
        pop();
    }
}

class Ball {
    constructor(position, radius) {
        // Radius
        this.radius = radius;

        // Spatial vectors
        this.position = position;
        this.velocity = createVector(0.0, 0.0, 0.0);

        // Material
        this.color = color(100, 100, 100);
        this.shininess = 200;
        this.specular = 255;

        // Physical properties
        this.drag = 0.01;
        this.elasticity = 0.9;

        this.launchAcceleration = 0.1;
        this.launchRandomness = 100;
    }

    render() {
        push();
        noStroke();

        fill(this.color);
        shininess(this.shininess);
        specularMaterial(this.specular);
        translate(this.position);
        sphere(this.radius);
        pop();
    }

    update() {
        // Move
        this.position.add(this.velocity);

        // Gravity
        this.velocity.y += 1.0;

        // Drag
        this.velocity.mult(1.0 - this.drag);
    }

    launch(target) {
        this.velocity.x += (target.x - this.position.x + random(-this.launchRandomness, this.launchRandomness)) * this.launchAcceleration;
        this.velocity.y += (target.y - this.position.y + random(-this.launchRandomness, this.launchRandomness)) * this.launchAcceleration;
        this.velocity.z += (target.z - this.position.z + random(-this.launchRandomness, this.launchRandomness)) * this.launchAcceleration;
    }
}