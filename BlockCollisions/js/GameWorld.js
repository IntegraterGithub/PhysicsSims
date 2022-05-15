class GameWorld {
    constructor(canvasId, options) {
        this.canvas = null;
        this.angularBoolean = options.angularBoolean;
        this.context = null;
        this.secondsPassed = 0;
        this.oldTimeStamp = 0;
        this.gameObjects = [];
        this.resetCounter = 0;
        this.barrier = options.barrier;
        this.g = options.g;
        this.init(canvasId);
        this.currentObject = undefined;
    }
    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.context.translate(0, this.canvas.height);
        this.context.scale(1, -1);
        this.createWorld();
        window.requestAnimationFrame((timeStamp) => { this.gameLoop(timeStamp); });
    }
    createWorld() {
        console.log(this.canvas.width);
        var length = Math.floor(Math.random() * 10) + 5;
        var gameObjects = [];
        for (let i = 0; i < length; i++) {
            gameObjects.push(new Square(this.context, 50, 50, Math.floor(Math.random() * (this.canvas.width - 20)) + 10, Math.floor(Math.random() * (this.canvas.height - 20)) + 10, Math.floor(Math.random() * 50) + 10, Math.floor(Math.random() * 50) + 10, Math.floor(Math.random() * 50) + 10, Math.floor(Math.random() * 50) + 10, Math.floor(Math.random() * 50) + 10, { g: this.g, angularBoolean: this.angularBoolean }, 0.9, Math.floor(Math.random() * 50), Math.floor(Math.random() * 50)));
        }
        this.gameObjects = gameObjects;
    }
    gameLoop(timeStamp) {
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update(this.secondsPassed);
        }
        this.detectCollisions();
        this.clearCanvas();
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw();
        }
        window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
    }
    detectCollisions() {
        let obj1;
        let obj2;
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].isColliding = false;
        }
        for (let i = 0; i < this.gameObjects.length; i++) {
            obj1 = this.gameObjects[i];
            var cornerTL = { x: obj1.x, y: obj1.y };
            var cornerTR = { x: obj1.x + obj1.width, y: obj1.y };
            var cornerBL = { x: obj1.x, y: obj1.y - obj1.height };
            var cornerBR = { x: obj1.x + obj1.width, y: obj1.y - obj1.height };
            for (let j = i + 1; j < this.gameObjects.length; j++) {
                obj2 = this.gameObjects[j];
                if (this.rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)) {
                    obj1.isColliding = true;
                    obj2.isColliding = true;
                    let vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };
                    let distance = Math.sqrt((obj2.x - obj1.x) * (obj2.x - obj1.x) + (obj2.y - obj1.y) * (obj2.y - obj1.y));
                    let vCollisionNorm = { x: vCollision.x / distance, y: vCollision.y / distance };
                    let vRelativeVelocity = { x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy };
                    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
                    if (speed < 0) {
                        break;
                    }
                    let impulse = 2 * speed / (obj1.mass + obj2.mass);
                    obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x);
                    obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y);
                    obj2.vx += (impulse * obj1.mass * vCollisionNorm.x);
                    obj2.vy += (impulse * obj1.mass * vCollisionNorm.y);
                }
            }
        }
    }
    rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
            return false;
        }
        return true;
    }
    circleIntersect(x1, y1, r1, x2, y2, r2) {
        var dx = Math.abs(x1 - x2);
        var dy = Math.abs(y1 - y2);
        return ((dx * dx) + (dy * dy)) <= r1 + r2;
    }
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
//# sourceMappingURL=GameWorld.js.map