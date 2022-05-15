class GameObject
{
    context:any;
    x:number;
    y:number;
    vx: number;
    vy:number;
    mass:number; 
    restitution:number;
    isColliding: boolean;
    ax:number;
    ay:number;
    angle: number; // angle measured in degrees
    angularSpeed:number;
    angularAcceleration:number;
    color:string;
    width:number;
    height:number;
    g:number;
    angularBoolean:boolean
    constructor (context:any, x:number, y:number, vx:number, vy:number, mass:number, restitution:number, ax:number, 
        ay:number, angle:number, angularSpeed:number, angularAcceleration:number, g:number, color:string, width:number, 
        height:number, angularBoolean:boolean){
        this.context = context;
        this.angularBoolean = angularBoolean;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.mass = mass;
        this.restitution = restitution;
        this.isColliding = false;
        this.ax = ax; 
        this.ay = ay;
        this.angle = angle;
        this.angularSpeed = angularSpeed;
        this.angularAcceleration = angularAcceleration;
        this.color = color;
        this.width = width;
        this.height = height;
        this.g = g;
    }
    toRadians(degrees:number){
      return degrees * Math.PI/180
    }
    update(secondsPassed:number){
        // Update position of object based on acceleration, velocity and gravity
        if(this.g){
            this.vy -= Math.abs(this.g);
        
        }
        console.log(this.angularBoolean)
        if(this.angularBoolean){
        if((this.angle % 90) > (this.angle % 90 / 2)){
             this.angle += (this.angularSpeed * secondsPassed) + (1/2 * (this.angle * this.g * 1.5) * secondsPassed * secondsPassed);
        } else {
            this.angle -= (this.angularSpeed * secondsPassed) + (1/2 * (this.angle * this.g * 1.5) * secondsPassed * secondsPassed);
        }
        }
        if ((this.x + this.width) >= this.context.canvas.width) {
            this.x += (this.vx * secondsPassed) + (1/2 * this.ax * secondsPassed * secondsPassed)
            this.y += (this.vy * secondsPassed) + (1/2 * (this.vy) * secondsPassed * secondsPassed);
            this.vx = -10;
            this.angularAcceleration = 0;
            this.angularSpeed = 0;

        } else if((this.x - this.width) <= 0){
            this.x += (this.vx * secondsPassed) + (1/2 * this.ax * secondsPassed * secondsPassed)
            this.y += (this.vy * secondsPassed) + (1/2 * (this.vy) * secondsPassed * secondsPassed);
           this.vx = -10
           this.angularAcceleration = 0;
            this.angularSpeed = 0
        } else if ((this.y + this.height) >= this.context.height) {

            this.vy = 0;
            this.angularAcceleration = 0;
            this.angularSpeed = 0
        } else  if ((this.y) <= 0) {
            this.vy = 0
            if(this.angularBoolean){
            this.angularSpeed += 5;
            if(this.angle % 90 <= 10){
                if(this.angularSpeed){
                   this.angle = 0
                }
                this.angle = 90;
                this.angularAcceleration = 0;
                this.angularSpeed = 0;
                 
            }
            }
      } else {
        this.x += (this.vx * secondsPassed) + (1/2 * this.ax * secondsPassed * secondsPassed)
        this.y += (this.vy * secondsPassed) + (1/2 * (this.vy) * secondsPassed * secondsPassed);
      }

    }
}