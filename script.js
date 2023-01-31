const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let isStop = false;

function Ball({ id, x, y, speed = 5, size = 50, color = "green" }) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.xStep = Math.round(Math.random() * speed + speed);
  this.yStep = Math.round(Math.random() * speed + speed);
  this.speed = speed;
  this.size = size;
  this.color = color;
}

const ball1 = new Ball({ id: 1, x: 100, y: 100, speed: 2, size: 100, color: "orange" });
const ball2 = new Ball({ id: 2, x: 100, y: 500, speed: 2, size: 100 });
const ball3 = new Ball({ id: 3, x: 200, y: 300, speed: 2, size: 100, color: "blue" });
const ballsArr = [ball1, ball2, ball3];

function run() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ballsArr.forEach((item) => {
    item.x += item.xStep;
    item.y += item.yStep;

    if (item.x >= canvas.width - item.size || item.x <= item.size) {
      item.x -= item.xStep;
      item.xStep = Math.round(Math.random() * item.speed + item.speed) * (item.xStep > 0 ? -1 : 1);
    }
    if (item.y >= canvas.height - item.size || item.y <= item.size) {
      item.y -= item.yStep;
      item.yStep = Math.round(Math.random() * item.speed + item.speed) * (item.yStep > 0 ? -1 : 1);
    }

    ballsArr.forEach((item2) => {
      const d = Math.sqrt(Math.pow(item2.x - item.x, 2) + Math.pow(item2.y - item.y, 2)) <= item2.size + item.size;
      if (item.id !== item2.id && d) {
        item.x -= item.xStep;
        item.y -= item.yStep;
        item.xStep = Math.round(Math.random() * item.speed + item.speed) * (item.xStep > 0 ? -1 : 1);
        item.yStep = Math.round(Math.random() * item.speed + item.speed) * (item.yStep > 0 ? -1 : 1);
      }
    });

    ctx.beginPath();
    ctx.arc(item.x, item.y, item.size, 0, 2 * Math.PI);
    ctx.fillStyle = item.color;
    ctx.fill();
  });

  !isStop && requestAnimationFrame(run);
}

requestAnimationFrame(run);

function stop() {
  isStop = !isStop;
  !isStop && requestAnimationFrame(run);
}
