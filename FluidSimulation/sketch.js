let fluid;
let canvas;
function setup() {
  canvas = createCanvas(300, 300);
  frameRate(20);
  fluid = new Fluid(0.2, 0, 0.0000000001);


}

function draw() {

   
  let cx = int((0.5 * width) / SCALE);
  let cy = int((0.5 * height) / SCALE);

  
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

window.onload = () => {
  var colorPicker = document.getElementById('colorPicker');
  colorPicker.value = '#FFFFFF'
  colorPicker.addEventListener('input', (event) => {
    fluid.color = hexToRgb(event.target.value)
    // render the density again based on the new color
    fluid.renderD();
  })
}