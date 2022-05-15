"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
class Circle extends GameObject {
    constructor(context, radius, x, y, vx, vy, mass, ax = 0, ay = 0, options, restitution, angularSpeed, angularAcceleration, color = '#0099b0') {
        super(context, x, y, vx, vy, mass, restitution, ax, ay, 0, angularSpeed, angularAcceleration, options.g, color);
        this.width = radius * 2;
        this.height = radius * 2;
        this.radius = radius;
        this.shapeType = 'Circle';
    }
    draw() {
        this.context.fillStyle = this.isColliding ? '#ff8080' : this.color;
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    }
}
exports.Circle = Circle;
//# sourceMappingURL=Circle.js.map