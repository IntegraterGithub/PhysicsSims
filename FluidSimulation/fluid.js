let N = 200;
let iter = 16;
let SCALE = 5;
let t = 0;

function IX(x, y) {
  return x + y * N;
}

// Fluid cube class
class Fluid {
  constructor(dt, diffusion, viscosity) {
    this.hsb = false;
    this.size = N;
    this.dt = dt;
    this.diff = diffusion; // the rate of diffusion 
    this.visc = viscosity;
    this.color = [255,255,255] // rgb color for the dye

    // current values for density and velocity
    this.density = new Array(N * N).fill(0);
    this.Vx = new Array(N * N).fill(0);
    this.Vy = new Array(N * N).fill(0);
    
    // previous values for density and velocity
    this.density_prev = new Array(N * N).fill(0);
    this.Vx0 = new Array(N * N).fill(0);
    this.Vy0 = new Array(N * N).fill(0);
  }

  // step method 
  step() {
    let N = this.size;
    let visc = this.visc;
    let diff = this.diff;
    let dt = this.dt;
    let Vx = this.Vx;
    let Vy = this.Vy;
    let Vx0 = this.Vx0;
    let Vy0 = this.Vy0;
    let s = this.density_prev;
    let density = this.density;

    diffuse(1, Vx0, Vx, visc, dt);
    diffuse(2, Vy0, Vy, visc, dt);

    project(Vx0, Vy0, Vx, Vy);

    advect(1, Vx, Vx0, Vx0, Vy0, dt);
    advect(2, Vy, Vy0, Vx0, Vy0, dt);

    project(Vx, Vy, Vx0, Vy0);
    diffuse(0, s, density, diff, dt);
    advect(0, density, s, Vx, Vy, dt);
  }
 
  // method to add density
  addDensity(x, y, amount) {
    let index = IX(x, y);
    this.density[index] += amount;
  }

  // method to add velocity
  addVelocity(x, y, amountX, amountY) {
    let index = IX(x, y);
    this.Vx[index] += amountX;
    this.Vy[index] += amountY;
  }

  // function to render density
  renderD() {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        let x = i * SCALE;
        let y = j * SCALE;
        let d = this.density[IX(i, j)];
        if(this.hsb){
          colorMode(HSB, 255);
          fill(d, 255, 255)
          noStroke();
          rect(x, y, SCALE, SCALE)
        } else {
        fill(d);
        noStroke();
        rect(x, y, SCALE, SCALE)
        }
      }
    }
  }
   
  // function to render velocity
  renderV() {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        let x = i * SCALE;
        let y = j * SCALE;
        let vx = this.Vx[IX(i, j, k)];
        let vy = this.Vy[IX(i, j, k)];
        this.canvas.stroke(0);

        if (!(abs(vx) < 0.1 && abs(vy) <= 0.1)) {
          line(x, y, x + vx * SCALE, y + vy * SCALE);
        }
      }
    }
  }
}
