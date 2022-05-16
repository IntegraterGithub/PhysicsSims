let fluid;
let canvas;

function setup() {
  canvas = createCanvas(300, 300);
  frameRate(20);
  fluid = new Fluid(0.2, 0, 0.0000000001);


}
window.onload = () => {
  var countr = 1;
  var changeColor = document.getElementById('changeColor');
  changeColor.addEventListener('click', () => {
     countr++
     if(countr % 2){
       fluid.hsb = true;
     } else {
       fluid.hsb = false;
     }
  })
  var rerender = document.getElementById('rerender');
  rerender.addEventListener('click', () => {
    fluid = new Fluid(0.2, 0, 0.0000000001);
  })
  
}


var prevMouseX = 0;
var prevMouseY = 0;
function draw() {
  let cx = int((0.5 * width) / SCALE);
  let cy = int((0.5 * height) / SCALE);
 if(Math.floor(mouseX) != prevMouseX || Math.floor(mouseY) != prevMouseY){
   console.log(mouseX)
   fluid.addDensity(Math.floor((mouseX) / SCALE), Math.floor((mouseY) / SCALE ), random(100, 300));
   fluid.addDensity(Math.floor((mouseX) / SCALE) + 1, Math.floor((mouseY) / SCALE ), random(100, 300));
   fluid.addDensity(Math.floor((mouseX) / SCALE), Math.floor((mouseY) / SCALE ) + 1, random(100, 300));
   fluid.addDensity(Math.floor((mouseX) / SCALE) + 1, Math.floor((mouseY) / SCALE ) + 1, random(100, 300));

  prevMouseX = Math.floor(mouseX);
  prevMouseY = Math.floor(mouseY)
 }
  
  

  
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      fluid.addDensity(cx + i, cy + j, random(100, 150));
    }
  }

  for (let i = 0; i < 2; i++) {
    let angle = noise(t) * TWO_PI * 2;
    let v = p5.Vector.fromAngle(angle);
    v.mult(0.2);
    t += 0.01;
    fluid.addVelocity(cx, cy, v.x, v.y);
  }

  fluid.step();
  fluid.renderD();
}

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
  parseInt(result[1], 16),
  parseInt(result[2], 16),
  parseInt(result[3], 16)
   ] : null;
}

