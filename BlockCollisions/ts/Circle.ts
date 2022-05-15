export class Circle extends GameObject {
    width: number;
    height: number;
    ax: number;
    ay: number;
    g: number;
    radius:number;
    shapeType:string;
    constructor(context:any, radius:number, x:number, y:number, vx:number, vy:number, mass:number, 
        ax:number=0, ay:number=0, options:Options, restitution:number, angularSpeed:number, angularAcceleration:number, color:string='#0099b0' ) {
        super(context, x, y, vx, vy, mass, restitution, ax, ay, 0, angularSpeed, angularAcceleration, options.g, color);
        this.width = radius * 2;
        this.height = radius * 2;
        this.radius = radius;
        this.shapeType = 'Circle'
    }

    draw() {
        this.context.fillStyle = this.isColliding ? '#ff8080' : this.color;
        // this.context.translate(this.x, this.y);
        // this.context.rotate(Math.PI / 180 * (this.angle + 90));
        // this.context.translate(-this.x, -this.y);
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        // this.context.setTransform(1, 0, 0, 1, 0, 0)
    }
}