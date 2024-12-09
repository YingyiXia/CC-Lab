
let bug;
let obstacles = [];
let gravity = 0.2;
let lift = -5;
let score = 0;
let pressure = 50;
let gameOverText = "";
let img;
let restartButton;

function preload() {
  img = loadImage('assets/Resume.png');
  img1 = loadImage('assets/rejection.jpg');
}

function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent('p5-canvas-container-JobHunting');
  canvas.position(windowWidth / 2 - width / 2, windowHeight / 2 - height / 2);
  bug = new Bug();

  restartButton = createButton('Restart');
  restartButton.position(width / 2 +300, height / 2 + 270);
  restartButton.size(100, 40);
  restartButton.mousePressed(restartGame);
  restartButton.hide();
}

function draw() {
  background(200, 220, 255);
  pressure += 0.01;

  fill(0);
  textSize(24);
  text("Score: " + score, 83, 30);
  text("Pressure: " + Math.floor(pressure), 108, 60);
  text('Press "C" to Calm Down', 180, 90);
  text('Click to fly', 130, 120);
  textSize(100);
  fill(0, 0, 0, 100);
  text("Interview", width / 2, height / 2);

  bug.update();
  bug.display();

  if (frameCount % 60 === 0) {
    obstacles.push(new Obstacle());
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].display();

    if (obstacles[i].hits(bug)) {
      gameOver(obstacles[i].obstacle);
    }

    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score += 4.5;
    }
  }
}

class Bug {
  constructor() {
    this.x = 100;
    this.y = height / 2;
    this.velocity = 0;
    this.width = 40;
    this.height = 40;
  }

  update() {
    this.velocity += gravity;
    this.y += this.velocity;

    if (this.y > height - this.height / 2) {
      this.y = height - this.height / 2;
      this.velocity = 0;
    }
    if (this.y < this.height / 2) {
      this.y = this.height / 2;
      this.velocity = 0;
    }
  }

  display() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, this.width, this.height);
    image(img, this.x - this.width / 2 - 10, this.y - this.height / 2 - 10, this.width + 20, this.height + 20);
  }

  fly() {
    this.velocity = lift;
  }
}

class Obstacle {
  constructor() {
    this.width = random(160, 180);
    this.height = random(70, 110);
    this.x = width;
    this.y = random(height - this.height);
    this.speed = random(3 + pressure / 5 - 50 / 5, 6 + pressure / 5 - 50 / 5);
    this.texts = [
      { text: "High GPA", offer: "Offer: Interview Regular" },
      { text: "work overtime", offer: "Offer: Freelancer" },
      { text: "Good University", offer: "Offer: Street Artist" },
      { text: "extracurricular activities", offer: "Offer: Idealist" },
      { text: "Internship experience", offer: "Offer: Future Successful Person" }
    ];
    this.obstacle = random(this.texts);
  }

  update() {
    this.x -= this.speed;
  }

  display() {
    fill(90, 40, 60);
    rect(this.x, this.y, this.width, this.height, 20);
    image(img1, this.x, this.y, this.width, this.height, 20);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    textStyle(BOLD);
  }

  hits(bug) {
    if (bug.x + bug.width / 2 > this.x && bug.x - bug.width / 2 < this.x + this.width &&
        bug.y + bug.height / 2 > this.y && bug.y - bug.height / 2 < this.y + this.height) {
      if (this.obstacle && this.obstacle.offer) {
        return true;
      } else {
        console.error("Obstacle data is undefined or incomplete!");
      }
    }
    return false;
  }

  offscreen() {
    return this.x < -this.width;
  }
}

function calculateSalary(score) {
  let salary = map(score, 0, 300, 3000, 15000);
  return Math.round(salary);
}

function gameOver(obstacleText) {
  if (!obstacleText || !obstacleText.offer) {
    console.error("Invalid obstacleText or missing 'offer' property.");
    return;
  }

  const selectedOffer = obstacleText.offer;
  const salary = calculateSalary(score);

  background(255, 0, 0);
  textSize(24);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2 - 50);
  textSize(20);
  text(`${selectedOffer}: ¥${salary}/month`, width / 2, height / 2 + 50);
  restartButton.show();
  noLoop();
}

function keyPressed() {
  if (keyCode === 67 && pressure >= 60) {
    pressure -= 3;
  }
}

function mousePressed() {
  bug.fly();
}

function restartGame() {
  bug = new Bug();
  obstacles = [];
  score = 0;
  pressure = 47;
  restartButton.hide();
  loop();
}
