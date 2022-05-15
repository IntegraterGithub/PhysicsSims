var canvasW = 300;
var canvasH = 300;


var canvasElement = document.getElementById('canvas')



canvasElement.addEventListener('click', (event) => {
 let rect = canvasElement.getBoundingClientRect();
 let x = event.clientX - rect.left;
 let y = event.clientY - rect.top;
        console.log("Coordinate x: " + x, 
                    "Coordinate y: " + y);

  
})
window.requestAnimationFrame(() => {
    // generate dye with a random density
    let cx = ((1/2 * canvasW) / SCALE);
    let cy = ((1/2 * canvasH) / SCALE);
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
})

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