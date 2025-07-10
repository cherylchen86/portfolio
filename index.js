const canvas = document.getElementById("rain-canvas");
const ctx = canvas.getContext("2d");
//获取 Canvas 并准备画布

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;
//设置 canvas 大小 = 屏幕大小

let mouse = { x: -1000, y: -1000 }; // 添加一个mouse变量，初始设到屏幕外

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});
//监听窗口大小变化. 如果窗口缩放，canvas 会自适应更新

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class RainLine {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * (width + height);
    this.y = Math.random() * -height;
    this.length = 50 + Math.random() * 100;
    this.speed = 2 + Math.random() * 2;
    this.thickness = 1;
    this.color = "rgba(200, 200, 200, 0.4)";
  }

  update() {
    this.x -= this.speed;
    this.y += this.speed;
    if (this.y > height || this.x < 0) {
      this.reset();
    }
  } //如果线飘出屏幕左下角，重置再来

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.length * -0.707, this.y + this.length * 0.707); // cos(45°)=sin(45°)=0.707
    
    if (this.isInMouseRange()) {
        const x1 = this.x;
        const y1 = this.y;
        const x2 = this.x + this.length * -0.707;
        const y2 = this.y + this.length * 0.707;

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, "#5DADEC");
        gradient.addColorStop(1, "#7AB5B0");

        ctx.strokeStyle = gradient;
    } else {
      ctx.strokeStyle = this.color;
    }
    
    ctx.lineWidth = this.thickness;
    ctx.stroke();
  }

  isInMouseRange() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 100; // 你可以改半径，比如 150、200 等
  }
}

const rainLines = Array.from({ length: 120 }, () => new RainLine());
//一次性创建 120 根线，每根都随机位置、长度、速度

function animate() {
  ctx.clearRect(0, 0, width, height);
  rainLines.forEach(line => {
    line.update();
    line.draw(ctx);
  });
  requestAnimationFrame(animate);
}

animate();
