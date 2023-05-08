let dimension = 1000;
let elements = [];
const canvas = document.getElementById("myCanvas");
canvas.width = dimension;
canvas.height = dimension;
const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: true });
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

class Element {
  constructor(x, y, color, mass, speed) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.mass = mass;
    this.speed = speed;
  }
  update() {
    //attraction
    for (let i = 0; i < elements.length; i++) {
      if (elements[i] != this) {
        let dx = elements[i].x - this.x;
        let dy = elements[i].y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1000) {
          let force = (0.001 * this.mass * elements[i].mass) / dist;
          this.speed.x += (force * dx) / dist;
          this.speed.y += (force * dy) / dist;
        }
      }
    }
    //damping
    this.speed.x *= 0.95;
    this.speed.y *= 0.95;
  }
  draw() {
    this.x += this.speed.x;
    this.y += this.speed.y;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.mass, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < 10; i++) {
    elements.push(
      new Element(
        Math.random() * dimension,
        Math.random() * dimension,
        "blue",
        Math.random() * 50,
        { x: 0, y: 0 }
      )
    );
  }
}

function step() {
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < elements.length; i++) {
    elements[i].update();
  }
  for (let i = 0; i < elements.length; i++) {
    elements[i].draw();
  }
  requestAnimationFrame(step);
}
init();
step();
