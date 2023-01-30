const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const radius = 50;
let x = 50;
let xStep = Math.round(Math.random() * 5 + 5);

let y = 50;
let yStep = Math.round(Math.random() * 5 + 5);

function f() {
  x = x + xStep;
  y = y + yStep;

  if (x >= canvas.width - radius || x <= radius) {
    xStep = Math.round(Math.random() * 5 + 5) * (xStep > 0 ? -1 : 1);
  }
  if (y >= canvas.height - radius || y <= radius) {
    yStep = Math.round(Math.random() * 5 + 5) * (yStep > 0 ? -1 : 1);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "green";
  ctx.fill();

  requestAnimationFrame(f);
}

requestAnimationFrame(f);
