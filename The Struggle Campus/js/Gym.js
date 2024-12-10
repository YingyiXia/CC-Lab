let dancer;
let basketball;
let hoop;
let score = 0;
let countdown = 60;  
let timer;  
let chargingTime = 0;  
let isCharging = false;  
let chargeStartTime = 0;  

function preload() {
  img1 = loadImage('assets/Basketball field.png'); 
  img2 = loadImage('assets/hoop.png');
  img3 = loadImage('assets/Basketball.jpg');
}

function setup() {
  let canvas = createCanvas(1000,600);
  canvas.parent('p5-canvas-container-Gym');
  canvas.position(windowWidth / 2 - width / 2, windowHeight / 2 - height /2);
  dancer = new Kun(width / 3.4, height / 2);  
  basketball = new Basketball(dancer.x + 50, dancer.y - 50);  
  hoop = new Hoop(width - 150, height / 2);  
  timer = millis();  
}

function draw() {
  
  if (countdown <= 0) {
    gameOver();
    return;
  }
  
  
  background(0);
  image(img1, 0, 0, width, height);
  
  
  dancer.update();
  dancer.display();
  
 
  basketball.update();
  if (basketball.isThrown) {  
    basketball.display();
  }

  
  hoop.update();
  hoop.display();
  
  
  if (basketball.isThrown && hoop.checkScore(basketball)) {
    
    let distance = dist(basketball.x, basketball.y, hoop.x, hoop.y);
    score += floor(distance/20);  
    basketball.reset(dancer.x + 50, dancer.y - 50);  
  }
  
  // score
  displayScore();

  
  displayCountdown();
  
 
  displayChargeBar();
  
  
  if (isCharging) {
    chargingTime = min(chargingTime + 1, 100);  
  }

  
}

function displayScore() {
  fill(255);
  textSize(32);
  textAlign(LEFT);
  text("Score: " + score, 20, 40); 
  text("Power: ", 20, 70);
  text("Press 'ASDW' to control Kun and click to shoot",20,100) 
}

function displayCountdown() {
  let elapsedTime = floor((millis() - timer) / 1000);  
  countdown = max(0, 60 - elapsedTime);  
  fill(255);
  textSize(32);
  textAlign(RIGHT);
  text("Time: " + countdown, width - 20, 40); 
}

function displayChargeBar() {
  fill(255);
  noStroke();
  
  rect(130, 50, width - 800, 20);  
  fill(map(chargingTime, 0, 55, 0, width - 800), 255-map(chargingTime, 0, 120, 0, width - 800), 0);  
  rect(130, 50, map(chargingTime, 0, 100, 0, width - 800), 20); 
}

function gameOver() {
  fill(202, 200, 250);
  textSize(48);
  textAlign(CENTER);
  text("Game Over!", width / 2, height / 2);
  textSize(32);
  text("Final Score: " + score, width / 2, height / 2 + 50);
  noLoop();  }


function mousePressed() {
  
  chargeStartTime = millis();
  isCharging = true;
  chargingTime = 0; 
}

function mouseReleased() {
  
  if (isCharging) {
    let chargeDuration = millis() - chargeStartTime;  
    let angle = -QUARTER_PI;  
    let power = map(chargeDuration, 0, 1000, 5, 20);  
    basketball.reset(dancer.x + 50, dancer.y - 50);  // 
    basketball.throwBall(angle, power);  // 
    isCharging = false; 
  }
}

class Kun {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.bodyAngle = 0;
    this.amplitude = 10;
    this.legPosL = -27;
    this.legPosR = 27;
    this.bodyX = 0;
    this.ballAngle = 0;
    this.legAngle = 0;
    this.handAngle = 0;
  }

  update() {

    this.bodyAngle += 0.05;
    this.ballAngle += 0.3;
    this.legAngle += 0.4;
    this.handAngle += 0.1;
    
    
    if (keyIsPressed === true) {
      if (key === "a") {
        this.x = max(0, this.x - 3);  
      } else if (key === "w") {
        this.y = max(0, this.y - 3);  
      } else if (key === "s") {
        this.y = min(height, this.y + 3);  
      } else if (key === "d") {
        this.x = min(width / 2, this.x + 3); 
      }
    }
  }

  display() {
    push();
    translate(this.x, this.y);

    
    fill(100);
    rect(-20, -40, 40, 40);

    fill(180 + 30 * sin(this.ballAngle), 160, 100);
    circle(0, -50 + 10 * sin(this.bodyAngle), 60);

    fill(80);
    stroke("white");
    push();
    translate(0, -10 + 10 * sin(this.bodyAngle));
    bezier(0, -70, -36, -67, -42, -44, -32, -28);
    bezier(0, -70, 36, -67, 42, -44, 32, -28);
    fill(255);
    textSize(20);
    text('o_O', 22, -28);  
    pop();

    
    fill(0, 0, 0, 0);
    stroke(100);
    strokeWeight(6);
    bezier(-17, 50, this.legPosL + 20 * sin(this.legAngle), 66, -27, 77, -12, 89);
    bezier(17, 50, this.legPosR + 20 * cos(this.legAngle), 66, 27, 77, 12, 89);

    
    fill(100);
    let bodyX = this.amplitude * sin(this.bodyAngle);
    let bodyY = this.amplitude * sin(3.2 * this.bodyAngle);
    rect(bodyX - 36, bodyY - 20, 70, 72, 20);

   
    push();
    translate(bodyX + 40, bodyY);
    rotate(this.handAngle);
    fill(100);
    stroke(1);
    strokeWeight(0);
    fill(220, 140, 200);
    rect(-10, 0, 70, 7);
    fill(100);
    circle(0, 0, 23);
    pop();
    
    push();
    translate(bodyX - 40, bodyY);
    rotate(this.handAngle);
    fill(100);
    stroke(1);
    strokeWeight(0);
    fill(220, 140, 200);
    rect(-10, 0, 70, 7);
    fill(100);
    circle(0, 0, 23);
    pop();

    //neck
    fill(255);
    noStroke();
    rect(bodyX - 20, bodyY - 20, 4, 70);
    rect(bodyX + 20, bodyY - 20, 4, 70);

    pop();
  }
}

class Basketball {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.radius = 15;
    this.isThrown = false;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.isThrown = false;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  throwBall(angle, power) {
    this.isThrown = true;
    this.velocityX = cos(angle) * power;
    this.velocityY = sin(angle) * power;
  }

  update() {
    if (this.isThrown) {
      this.x += this.velocityX;
      this.y += this.velocityY;
      this.velocityY += 0.55;  // gravity

      if (this.y > height) {
        this.reset(dancer.x + 50, dancer.y - 50);
      }
    }
  }

  display() {
    fill('orange');
    noStroke();
    circle(this.x, this.y, this.radius * 2);
  }
}

class Hoop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 140;  
    this.height = 24;  
    this.speedX = 2;
    this.speedY = 1.5;
    this.directionX = 1;
    this.directionY = 1;
  }

  update() {
    this.x += this.directionX * this.speedX;
    this.y += this.directionY * this.speedY;

    if (this.x < width - 200 || this.x > width - 100) {
      this.directionX *= -1;
    }

    if (this.y < 50 || this.y > height - 50) {
      this.directionY *= -1;
    }
  }

  display() {
    fill(255);
    noStroke();
    rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);  
    image(img2,this.x - this.width / 2, this.y - this.height / 2, this.width, this.height+60)
  }

  checkScore(basketball) {
    let d = dist(this.x, this.y, basketball.x, basketball.y);
    return d < this.width  + 1.2*basketball.radius && basketball.y < this.y + this.height / 2 && basketball.y > this.y - this.height / 2;
  }
}
