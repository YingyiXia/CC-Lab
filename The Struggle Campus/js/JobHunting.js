
let bug;
let obstacles = [];
let gravity = 0.2;
let lift = -5;
let score = 0;
let pressure = 50;
let gameOverText = ""; // 用于存储不同的 Game Over 结局
let img

function preload() {
  img = loadImage('assets/Resume.png')
}
  

function setup() {
  let canvas = createCanvas(1000,600);
  canvas.parent('p5-canvas-container-JobHunting');
  canvas.position(windowWidth / 2 - width / 2, windowHeight / 2 - height /2);
  bug = new Bug();
}

function draw() {
  background(200, 220, 255);
  pressure += 0.11;
  
  // 显示分数和压力值
  fill(0);
  textSize(24);
  text("Score: " + score, 83, 30);
  text("Pressure: " + Math.floor(pressure), 108, 60);
  text('Press "C" to Calm Down', 180, 90);
  text('Press "W" to fly', 130, 120);
  textSize(100)
  fill(0,0,0,100)
  text("Interview",width/2,height/2)
  
  // 更新和显示简历（小飞虫）
  bug.update();
  bug.display();

  // 障碍物生成
  if (frameCount % 60 === 0) {
    obstacles.push(new Obstacle());
  }

  // 更新和显示障碍物
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].display();

    // 检查是否撞上障碍物
    if (obstacles[i].hits(bug)) {
      gameOver(obstacles[i].obstacle);  // 根据撞到的障碍物给出不同结局
    }

    // 增加分数并移除出界的障碍物
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score+=4.5;
    }
  }
}

// 简历（小飞虫）类
class Bug {
  constructor() {
    this.x = 100;
    this.y = height / 2;
    this.velocity = 0;
    this.width = 40;
    this.height = 40;
  }

  // 更新小飞虫的状态
  update() {
    this.velocity += gravity;
    this.y += this.velocity;

    // 防止飞虫飞出屏幕
    if (this.y > height - this.height / 2) {
      this.y = height - this.height / 2;
      this.velocity = 0;
    }
    if (this.y < this.height / 2) {
      this.y = this.height / 2;
      this.velocity = 0;
    }
  }

  // 显示小飞虫
  display() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, this.width, this.height);
    image(img, this.x-this.width/2-10, this.y-this.height/2-10, this.width+20, this.height+20);
  }

  // 飞翔
  fly() {
    this.velocity = lift;
  }
}

// 障碍物类
class Obstacle {
  constructor() {
    this.width = random(160, 180); // 障碍物宽度（竖着的障碍物）
    this.height = random(70, 110); // 障碍物高度
    this.x = width;
    this.y = random(height - this.height); // 障碍物的高度随机
    this.speed = random(3 + pressure / 4 - 50 / 4, 6 + pressure / 4 - 50 / 4); // 障碍物速度随机
    this.texts = [
      {text: "High GPA", offer: "Offer: Assistant Professor"},
      {text: "work overtime", offer: "Offer: Normal worker"},
      {text: "Good University", offer: "Offer: Mid-Level cleaner"},
      {text: "extracurricular activities", offer: "Offer: HR Assistant"},
      {text: "Internship experience", offer: "Offer: Intern"}
    ]; // 每个障碍物的文本和 offer
    this.obstacle = random(this.texts); // 随机选择一个障碍物
  }

  // 更新障碍物的位置
  update() {
    this.x -= this.speed; // 使障碍物移动
  }

  // 显示障碍物
  display() {
    // 障碍物外形
    fill(90, 40, 60); // 更深的颜色
    rect(this.x, this.y, this.width, this.height, 20); // 圆角矩形，让障碍物看起来更现代

    // 设置文本样式
    fill(255); // 白色字体
    textAlign(CENTER, CENTER);
    textSize(20); // 增加文本字体大小
    textStyle(BOLD); // 加粗文本

    // 将文本显示在障碍物的中心
    text(this.obstacle.text, this.x + this.width / 2, this.y + this.height / 2); 
  }

  // 检查是否与小飞虫碰撞
  hits(bug) {
    if (bug.x + bug.width / 2 > this.x && bug.x - bug.width / 2 < this.x + this.width &&
        bug.y + bug.height / 2 > this.y && bug.y - bug.height / 2 < this.y + this.height) {
      // 确保 obstacleText 是有效的
      if (this.obstacle && this.obstacle.offer) {
        return true;
      } else {
        console.error("Obstacle data is undefined or incomplete!");
      }
    }
    return false;
  }

  // 检查障碍物是否出界
  offscreen() {
    return this.x < -this.width;
  }
}

// 计算薪资
function calculateSalary(score) {
  // 根据分数来计算薪资
  let salary = map(score, 0, 250, 4000, 15000); // 将分数映射到薪资范围
  return Math.round(salary);
}

// 处理游戏结束
function gameOver(obstacleText) {
  // 确保 obstacleText 是有效的
  if (!obstacleText || !obstacleText.offer) {
    console.error("Invalid obstacleText or missing 'offer' property.");
    return;
  }

  // 根据碰到的障碍物文本选择游戏结束结局
  const selectedOffer = obstacleText.offer;
  const salary = calculateSalary(score); // 根据分数计算薪资
  
  background(255, 0, 0);
  textSize(24);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2 - 50);
  textSize(20);
  
  // 显示不同的 Offer 结局，并根据分数计算薪资
  text(`${selectedOffer}: ¥${salary}/month`, width / 2, height / 2 + 50);
  noLoop(); // 停止游戏
}

// 空格键触发小飞虫飞翔
function keyPressed() {
  if (keyCode === 87) { // W
    bug.fly();
  }
  if (keyCode === 67 && pressure >= 60) { 
    pressure -= 3;  // 按 "C" 键减轻压力
  }
}
