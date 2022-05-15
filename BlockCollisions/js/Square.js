class Square extends GameObject {
    constructor(context, width, height, x, y, vx, vy, mass, ax = 0, ay = 0, options, resitution, angularSpeed, angularAcceleration, color = '#0099b0') {
        super(context, x, y, vx, vy, mass, resitution, ax, ay, 0, angularSpeed, angularAcceleration, options.g, color, width, height, options.angularBoolean);
        ;
        this.width = width;
        this.height = height;
        this.shapeType = 'Square';
    }
    draw() {
        this.context.save();
        this.context.beginPath();
        this.context.translate(this.x + this.width / 2, this.y + this.height / 2);
        this.context.rotate(this.angle * Math.PI / 180);
        this.context.rect(-this.width / 2, -this.height / 2, this.width, this.height);
        this.context.fillStyle = this.isColliding ? '#ff8080' : this.color;
        this.context.fill();
        this.context.restore();
    }
}
//# sourceMappingURL=Square.js.map