const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const radius = 50;
let isStop = false;

function Ball(x, y, size = radius, color = "green") {
  this.x = x;
  this.y = y;
  this.xStep = Math.round(Math.random() * 5 + 5);
  this.yStep = Math.round(Math.random() * 5 + 5);
  this.size = size;
  this.color = color;
}

const ball1 = new Ball(50, 50, 50, "orange");
const ball2 = new Ball(500, 500, 30);
const ballsArr = [ball1, ball2];

function f() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ballsArr.forEach((item) => {
    item.x = item.x + item.xStep;
    item.y = item.y + item.yStep;

    if (item.x >= canvas.width - radius || item.x <= radius) {
      item.x += item.xStep < 0 ? radius - item.x : -(radius + item.x - canvas.width);
      item.xStep = Math.round(Math.random() * 5 + 5) * (item.xStep > 0 ? -1 : 1);
    }
    if (item.y >= canvas.height - radius || item.y <= radius) {
      item.y += item.yStep < 0 ? radius - item.y : -(radius + item.y - canvas.height);
      item.yStep = Math.round(Math.random() * 5 + 5) * (item.yStep > 0 ? -1 : 1);
    }

    ctx.beginPath();
    ctx.arc(item.x, item.y, item.size, 0, 2 * Math.PI);
    ctx.fillStyle = item.color;
    ctx.fill();
  });

  !isStop && requestAnimationFrame(f);
}

requestAnimationFrame(f);

function stop() {
  isStop = !isStop;
  !isStop && requestAnimationFrame(f);
}
