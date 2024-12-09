
let snake;
let food;
let gridSize = 20;
let negativeEffectTimer = 0;
let obstacles = [];
let img1;
let img2;
let progressBarWidth = 300;
let progressBarHeight = 20;
let titles = ["Net Novice", "Always Online", "Screen Slave", "Virtual World Expert", "Addicted Gamer", "Ultimate Networm"];
let currentTitle = titles[0];
let endings = ["Healthy user", "Normal and understandable", "You are addicted!", "Nobody ask you to hang out in reality?", "You are so empty inside! Congrats!", "you're funny"];
let currentEnding = endings[0];
let restartButton;

function preload() {
  img1 = loadImage('assets/Ins.jpg');
  img2 = loadImage('assets/likes.png');
}

function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent('p5-canvas-container-media');
  canvas.position(windowWidth / 2 - width / 2, windowHeight / 2 - height / 2);
  frameRate(10);
  snake = new Snake();
  food = createFood();

  restartButton = createButton('Restart');
  restartButton.position(width / 2 +300, height / 2 + 280);
  restartButton.size(100, 40);
  restartButton.mousePressed(restartGame);
  restartButton.hide(); // Hide the restart button initially
}

function draw() {
  background(255);

  drawGradientBackground();
  snake.update();
  snake.show();

  if (snake.endGame()) {
    gameOver();
    return;
  }

  fill(255, 0, 0);
  noStroke();
  rect(food.x, food.y, gridSize, gridSize);
  image(img2, food.x - 4, food.y - 4, gridSize + 8, gridSize + 8);

  if (snake.eat(food)) {
    food = createFood();
    negativeEffectTimer += 2;
  }

  displayProgressBar();

  generateObstacles();
  fill(random(100, 255), random(100, 200), 0);
  for (let obs of obstacles) {
    rect(obs.x, obs.y, obs.width, obs.height);
  }

  updateSpeed();
}

function drawGradientBackground() {
  let c1 = color(100 + negativeEffectTimer * 6, 50, 174);
  let c2 = color(255, 255, 255);
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, i, width, i);
  }
}

function gameOver() {
  if (negativeEffectTimer >= 5 && negativeEffectTimer < 6) {
    currentEnding = endings[1];
  } else if (negativeEffectTimer >= 6 && negativeEffectTimer < 8) {
    currentEnding = endings[2];
  } else if (negativeEffectTimer >= 8 && negativeEffectTimer < 23) {
    currentEnding = endings[3];
  } else if (negativeEffectTimer >= 23 && negativeEffectTimer < 35) {
    currentEnding = endings[4];
  } else if (negativeEffectTimer >= 35) {
    currentEnding = endings[5];
  }
  background(155, 100, 150);
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2 - 160);
  textSize(24);
  text("Time Wasted: " + negativeEffectTimer + " Hours", width / 2, height / 2 - 120);

  textSize(40);
  text("Review: " + currentEnding, width / 2, height / 2);
  restartButton.show(); // Show the restart button when game is over
  noLoop();
}

function displayProgressBar() {
  fill(160);
  noStroke();
  rect(width - progressBarWidth - 30, 30, progressBarWidth, progressBarHeight);

  let progress = map(negativeEffectTimer, 0, 40, 0, progressBarWidth);
  fill(220, 213, 90);
  rect(width - progressBarWidth - 30, 30, progress, progressBarHeight);

  fill(0);
  textSize(18);
  textAlign(LEFT, TOP);
  text("Press 'ASDW' to Control , Collect likes and Avoid Obstacles.", 470, 60);
  text("Time wasted: " + negativeEffectTimer + " hours", width - progressBarWidth - 30, 90);
  text("Title: " + currentTitle, width - progressBarWidth - 30, 120);

  if (negativeEffectTimer >= 5 && negativeEffectTimer < 10) {
    currentTitle = titles[1];
  } else if (negativeEffectTimer >= 10 && negativeEffectTimer < 15) {
    currentTitle = titles[2];
  } else if (negativeEffectTimer >= 15 && negativeEffectTimer < 20) {
    currentTitle = titles[3];
  } else if (negativeEffectTimer >= 20 && negativeEffectTimer < 30) {
    currentTitle = titles[4];
  } else if (negativeEffectTimer >= 30) {
    currentTitle = titles[5];
  }
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(width / 2 / gridSize) * gridSize, floor(height / 2 / gridSize) * gridSize);
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir * gridSize;
    head.y += this.ydir * gridSize;
    this.body.push(head);
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.body.push(head);
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, gridSize, gridSize);
    }
  }

  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  eat(pos) {
    let head = this.body[this.body.length - 1];
    if (head.x === pos.x && head.y === pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  endGame() {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;

    if (x < 0 || x >= width || y < 0 || y >= height) {
      return true;
    }

    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x === x && part.y === y) {
        return true;
      }
    }

    for (let obs of obstacles) {
      if (x >= obs.x && x < obs.x + obs.width && y >= obs.y && y < obs.y + obs.height) {
        return true;
      }
    }

    return false;
  }
}

function createFood() {
  let x = floor(random(width / gridSize)) * gridSize;
  let y = floor(random(height / gridSize)) * gridSize;
  return createVector(x, y);
}

function generateObstacles() {
  let obstacleCount = floor(negativeEffectTimer / 3);
  while (obstacles.length < obstacleCount) {
    let x = floor(random(width / gridSize)) * gridSize;
    let y = floor(random(height / gridSize)) * gridSize;

    let isHorizontal = random() > 0.5;
    let length = floor(random(11, 14)) * gridSize;

    if (isHorizontal) {
      obstacles.push({ x: x, y: y, width: length, height: gridSize });
    } else {
      obstacles.push({ x: x, y: y, width: gridSize, height: length });
    }
  }
}

function updateSpeed() {
  let lengthFactor = snake.body.length / 4;
  let newSpeed = map(lengthFactor, 1, 10, 12, 25);
  frameRate(newSpeed);
}

function keyPressed() {
  if (keyCode === 65 && snake.xdir === 0) {
    snake.setDir(-1, 0);
  } else if (keyCode === 68 && snake.xdir === 0) {
    snake.setDir(1, 0);
  } else if (keyCode === 87 && snake.ydir === 0) {
    snake.setDir(0, -1);
  } else if (keyCode === 83 && snake.ydir === 0) {
    snake.setDir(0, 1);
  }
}

// Restart the game
function restartGame() {
  snake = new Snake();
  food = createFood();
  obstacles = [];
  negativeEffectTimer = 0;
  currentTitle = titles[0];
  currentEnding = endings[0];
  restartButton.hide();
  loop();
}
