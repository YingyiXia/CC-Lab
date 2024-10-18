console.log("it works")
let anxiety = 20;
let workload = 460;
let sunX = 350;
let cloudX;
let cloudY;
let cloudX1;
let cloudY1;
let cloudX2;
let cloudY2;
let circle1X = 150;
let circle1Y = 0;
let creatureX = 500;
let creatureY = 250;
let destinationx = 500;
let destinationy = 300;
let leftlimit = -30;
let rightlimit = 30;
let xArray = [];
let yArray = [];
let initialSizeOfArray = 100;
let harm1;
let harm2;
let angleInDegrees = 45;
let rg = 0;
let gg = 0;
let bg = 0;
let bodycolorr = 140;
let bodycolorg = 30;
let bodycolorb = 220;
let bodycolorR = 255;
let bodycolorB = 255;
let duelength = 400;
let duecolor = 200;
let transparency = 100;
let transparencyText = 255;
let happyReaction = 0;
let tiredness = 0;
let goodJoby = 0;
let A = 100;
let S = 100;
let D = 100;
let W = 100;
let E = 100;
let color1
function setup() {
  let cnv = createCanvas(800, 500);
 cnv.parent("p5-canvas-container")
  cloudX = random(200, 700);
  cloudY = random(100, 220);

  cloudX1 = random(200, 700);
  cloudY1 = random(100, 220);

  cloudX2 = random(200, 700);
  cloudY2 = random(100, 220);

  for (let i = 0; i < initialSizeOfArray; i++) {
    xArray[i] = random(-75, 75);
    yArray[i] = random(-40, 130);
  }
}

function draw() {
  console.log(mouseX, mouseY);
  let angle = radians(angleInDegrees);

  //sky
  background(88 - anxiety * 0.2, 150 - anxiety * 0.2, 255 - anxiety * 1);

  noStroke();
  fill(255);
  //planet
  let rg = map(anxiety, 10, 160, 31, 177);
  let bg = map(anxiety, 10, 160, 188, 173);
  let gg = map(anxiety, 10, 160, 31, 137);
  fill(rg, bg, gg);

  circle(500, 650, 700);
  //Stuffs
  push();
  translate(500, 650);
  rotate(angle);
  angleInDegrees += 0.4;
  let rg1 = map(anxiety, 10, 160, 31, 177);
  let bg1 = map(anxiety, 10, 160, 188, 173);
  let gg1 = map(anxiety, 10, 160, 31, 137);
  fill(rg1, bg1, gg1);
  circle(0, 550, 160);
  fill("brown");
  rect(-12.5, 350, 25, 170);
  fill(180);
  rect(-12.5, -450, 25, 100);
  rect(-100, -530, 200, 100);
  fill(100);
  rect(-80, -520, 160, 80);
  //
  if (dist(anxiety, workload, 165, 374) > 70) {
    textSize(50);
    fill("blue");
    text("Cool", -55, -460);
  } else if (dist(anxiety, workload, 165, 374) < 70) {
    fill("red");
    textSize(50);
    text("S.O.S.", -60, -460);
  }
  fill(255, map(anxiety, 10, 160, 255, 0), 0);
  circle(500, 0, 200);
  fill(0, 0, 0, 0);
  stroke(0);
  strokeWeight(5);
  bezier(
    481 + anxiety / 4,
    -46 - anxiety / 4,
    440,
    -35,
    440,
    35,
    481 + anxiety / 4,
    46 + anxiety / 4
  );
  fill(0);
  ellipse(525, 30, anxiety / 2, 30);
  ellipse(525, -30, anxiety / 2, 30);
  //Due
  rotate(angle);
  angleInDegrees += map(workload, 460, 370, 0.2, 0.9);
  fill(duecolor, 0, 0, 200);
  rect(-730, 0, duelength, 40, 30);
  fill(0);
  textSize(70);
  text("Due", -550, 0);
  if (
    mouseIsPressed == true &&
    workload < 400 &&
    dist(creatureX, creatureY, mouseX, mouseY) < 150
  ) {
    duelength += 2;
    duecolor = 255;
  }
  //????????
  pop();
  //mode panel
  fill(255);
  rect(0, 350, 200);
  stroke(0);
  strokeWeight(2);
  line(5, 460, 170, 460);
  line(20, 375, 20, 480);
  fill(0);
  triangle(170, 455, 170, 465, 178, 460);
  triangle(15, 375, 25, 375, 20, 367);
  strokeWeight(1);
  textSize(12);
  text("anxiety", 155, 476);
  text("workload", 7, 360);
  //mode
  noStroke();
  fill(100, 240, 100, 100);
  rect(20, 410, 80, 50);
  fill(240, 240, 100, 100);
  rect(20, 370, 80, 40);
  rect(100, 410, 70, 50);
  fill(240, 100, 100, 100);
  rect(100, 370, 70, 40);
  fill(0, 0, 0, 100);
  rect(165, 370, 5, 5);
  fill(100 + workload / 6, 20, 240 - anxiety);
  circle(anxiety, workload, random(9, 11));
  if (workload < 370) {
    workload = 370;
  }
  if (anxiety < 20) {
    anxiety = 20;
  }
  if (workload > 460) {
    workload = 460;
  }
  if (anxiety > 170) {
    anxiety = 170;
  }
  //sun
  let greenValue = map(anxiety, 5, 160, 0, 200);
  noStroke();
  fill(255, 200 - greenValue, 0, 30);
  for (let i = 0; i < 90; i++) {
    let dia = 150 + anxiety * 0.3 - i * 2;
    circle(sunX, 100, dia);
  }

  //cloud

  for (let i = 0; i < 5; i++) {
    noStroke();
    fill(255, 255, 255, 100);

    ellipse(cloudX, cloudY, 90 - anxiety * 0.5, 70 - anxiety * 0.5);
    ellipse(cloudX - 30, cloudY, 90 - anxiety * 0.5, 70 - anxiety * 0.5);
    ellipse(cloudX - 15, cloudY - 25, 90 - anxiety * 0.5, 70 - anxiety * 0.5);
    ellipse(cloudX - 20, cloudY + 17, 90 - anxiety * 0.5, 70 - anxiety * 0.5);
    ellipse(cloudX + 20, cloudY + 10, 90 - anxiety * 0.5, 70 - anxiety * 0.5);
    cloudX += 0.5;

    if (cloudX > 880) {
      cloudX = 100;
      cloudY = random(70, 240);
    }
  }

  for (let i = 0; i < 5; i++) {
    noStroke();
    fill(255, 255, 255, 90);

    ellipse(cloudX1, cloudY1, 90 - anxiety * 0.5, 70 - anxiety * 0.5);
    ellipse(cloudX1 - 30, cloudY1, 90 - anxiety * 0.5, 70 - anxiety * 0.5);
    ellipse(cloudX1 - 15, cloudY1 - 25, 90 - anxiety * 0.5, 70 - anxiety * 0.5);
    ellipse(cloudX1 - 20, cloudY1 + 17, 90 - anxiety * 0.5, 70 - anxiety * 0.5);
    ellipse(cloudX1 + 20, cloudY1 + 10, 90 - anxiety * 0.5, 70 - anxiety * 0.5);
    cloudX1 += 0.68;

    if (cloudX1 > 880) {
      cloudX1 = 100;
      cloudY1 = random(70, 240);
    }
  }

  for (let i = 0; i < 5; i++) {
    noStroke();
    fill(255, 255, 255, 80);

    ellipse(cloudX2, cloudY2, 90 - anxiety * 0.5, 70 - anxiety * 0.5);
    ellipse(cloudX2 - 30, cloudY2, 90 - anxiety * 0.5, 70 - anxiety * 0.5);
    ellipse(cloudX2 - 15, cloudY2 - 25, 90 - anxiety * 0.5, 70 - anxiety * 0.5);
    ellipse(cloudX2 - 20, cloudY2 + 17, 90 - anxiety * 0.5, 70 - anxiety * 0.5);
    ellipse(cloudX2 + 20, cloudY2 + 10, 90 - anxiety * 0.5, 70 - anxiety * 0.5);
    cloudX2 += 0.1 + cloudX2 / 400;

    if (cloudX2 > 880) {
      cloudX2 = 100;
      cloudY2 = random(70, 240);
    }
  }

  //event panel
  noStroke();
  fill(245);
  rect(0, 0, 200, 350);
  fill(0);
  textSize(34);
  text("Daily Rotine", 2, 50);

  textSize(25);
  fill(A);
  rect(20, 150, 40, 40, 10);
  fill(S);
  rect(65, 150, 40, 40, 10);
  fill(D);
  rect(110, 150, 40, 40, 10);
  fill(W);
  rect(65, 105, 40, 40, 10);
  fill(E);
  rect(110, 105, 40, 40, 10);
  fill(255);
  text("A", 31, 180);
  text("S", 77, 180);
  text("D", 122, 180);
  text("W", 73, 135);
  text("E", 123, 135);
  fill(0);
  text("🥳", 28, 215);
  text("😪", 73, 215);
  text("🫠", 118, 215);
  text("📚", 70, 100);
  text("🥲", 115, 100);
  textSize(20);
  text("try to click it!➡️", 22, 286);
  text("Press to control ⬇️", 5, 336);
  if (keyIsPressed === true) {
    if (key === "a") {
      anxiety -= 1;
      A = 0;
      color1=250
    } else if (key === "w") {
      workload -= 1;
      W = 0;
      color1=250
    } else if (key === "s") {
      workload += 1;
      S = 0;
      color1=250
    } else if (key === "d") {
      anxiety += 0.79;
      D = 0;
      color1=250
    } else if (key === "e") {
      anxiety += 1;
      workload -= 1;
      E = 0;
      color1=250
    }
  }
  if (keyIsPressed === false) {
    A = S = D = W = E = 100;
    color1-=10
  }
  //indicator lights
  stroke(0);
  strokeWeight(1);
  fill(255);
  circle(145, 473, 10);
  circle(67, 357, 10);
  if (anxiety > 100) {
    fill("red");
    circle(145, 473, 10);
  } else if (anxiety < 100) {
    fill("green");
    circle(145, 473, 10);
  }
  if (workload < 410) {
    fill("red");
    circle(67, 357, 10);
  } else if (workload >= 410) {
    fill("green");
    circle(67, 357, 10);
  }
  stroke(color1,0,0,200)
  strokeWeight(2)
  fill(0,0,0,0)
  rect(20,370,150,90)
  //creature
  let heartRate = map(workload, 460, 360, 0.05, 0.19);
  let sinvalue = sin(frameCount * heartRate);
  let dia = map(sinvalue, -1, 1, 42, 60);

  push();
  translate(creatureX, creatureY);

  //shadow
  noStroke();
  fill(100, 100, 100, 150);
  ellipse(0, 165, 150, 20);

  //body
  noStroke();
  fill(bodycolorR, 0, bodycolorB, 160);
  rect(-75, -40, 150, 170, 40);
  fill(bodycolorr, bodycolorg, bodycolorb, 220);
  for (let i = 0; i < xArray.length; i++) {
    xArray[i] += random(-0.5, 0.5);
    yArray[i] += random(-0.7, 0.7 + tiredness);

    let x = xArray[i];
    let y = yArray[i];

    bodycolorr = random(230, 255);
    bodycolorg = (140, 190);
    bodycolorb = random(10, 125);
    noStroke();
    circle(x, y, 30);
    if (y < creatureY) {
      y = creatureY;
    }
  }

  noStroke();
  //heart
  fill(255 - anxiety / 2, 0 + anxiety / 2, 0 + anxiety / 2);
  circle(-15, 0, dia - 5);
  circle(15, 0, dia - 5);
  circle(0, 5, 20);
  //fill(0,0,200)
  triangle(-dia + 22, 14, dia - 22, 14, 0, dia);

  //eye
  fill(0, 0, 0, 0);
  stroke(anxiety);
  strokeWeight(4);
  bezier(-45, -100, -17, -130, 33, -118, 58, -108);
  bezier(-43, -83, -11, -52, 33, -47, 75, -96);
  let eyemotion = noise(frameCount * heartRate);
  let eyeX = map(eyemotion, 0, 1, -30, 40);
  fill(0 + anxiety, 0, 0, 200);
  circle(eyeX, -91, 43);
  line(-46, -160, -25, -130);
  line(10, -172, 9, -132);
  line(60, -169, 49, -130);
  //mouth
  stroke(anxiety);
  strokeWeight(5);
  fill(0, 0, 0, 0);
  bezier(
    -53,
    -74 + anxiety / 3.6 - happyReaction,
    -20,
    -45,
    20,
    -45,
    53,
    -74 + anxiety / 3.6 - happyReaction
  );

  //dark circles
  noStroke();
  fill(100, 100, 100, 110);
  ellipse(
    eyeX,
    -90,
    1.5 * map(workload, 460, 360, 0, 100),
    map(workload, 460, 360, 0, 100)
  );

  pop();
  //interaction
  //1
  if (
    mouseIsPressed == true &&
    anxiety > 100 &&
    workload < 400 &&
    dist(creatureX, creatureY, mouseX, mouseY) < 150
  ) {
    noStroke();
    fill(100, 100, 240, 200);
    circle(creatureX + 30, creatureY - 23, 60);
    triangle(
      creatureX,
      creatureY - 20,
      creatureX + 60,
      creatureY - 20,
      creatureX + 30,
      creatureY - 90
    );
  }
  //2
  if (
    mouseIsPressed == true &&
    anxiety > 100 &&
    dist(creatureX, creatureY, mouseX, mouseY) < 150
  ) {
    bodycolorr = 100;
    bodycolorg = 100;
    bodycolorb = 100;
  } else if (mouseIsPressed == false) {
    bodycolorr = 140;
    bodycolorg = 30;
    bodycolorb = 220;
  }
  //3
  if (
    mouseIsPressed == true &&
    anxiety < 100 &&
    workload > 400 &&
    dist(creatureX, creatureY, mouseX, mouseY) < 150
  ) {
    happyReaction++;
  } else if (
    mouseIsPressed == false &&
    anxiety < 100 &&
    workload > 400 &&
    dist(creatureX, creatureY, mouseX, mouseY) < 150
  ) {
    happyReaction -= 5;
  }
  if (anxiety > 100 || happyReaction <= 0 || workload < 400) {
    happyReaction = 0;
  }
  //4
  if (
    mouseIsPressed == true &&
    workload < 400 &&
    dist(creatureX, creatureY, mouseX, mouseY) < 150
  ) {
    tiredness = 1;
  } else if (
    mouseIsPressed == false &&
    workload < 400 &&
    dist(creatureX, creatureY, mouseX, mouseY) < 150
  ) {
    tiredness = -0.6656;
  }
  if (mouseIsPressed == false && workload > 400) {
    tiredness = 0;
  }

  //motion
  moveSpeed = map(workload, 460, 360, 0.01, 0.07);
  creatureX = lerp(creatureX, destinationx, moveSpeed);
  creatureY = lerp(creatureY, destinationy, moveSpeed - 0.005);

  if (dist(creatureX, creatureY, destinationx, destinationy) < 50) {
    destinationx = random(330, 720);
    destinationy = random(200, 380);
  }
  //mouse

  textSize(30);
  if (anxiety < 100 && workload > 400) {
    text("😄", mouseX - 18, mouseY + 5);
  } else if (anxiety > 100 && workload > 400) {
    text("😖", mouseX - 18, mouseY + 5);
  } else if (anxiety > 100 && workload < 400) {
    text("👹", mouseX - 18, mouseY + 5);
  } else if (anxiety < 100 && workload < 400) {
    text("🤯", mouseX - 18, mouseY + 5);
  }

  //Hp
  stroke(0);
  strokeWeight(3);
  text("HP", 203, 293);
  fill(0, 0, 0, 0);
  rect(200, 300, 30, 200, 20);
  noStroke();
  fill("red");
  let hp = 200;
  let restHp = -harm1 + hp - harm2;
  rect(200, 300, 30, restHp, 20);
  if (anxiety > 100) {
    harm1 = (anxiety - 100) * 1.5;
  } else if (anxiety <= 100) {
    harm1 = 0;
  }
  if (workload < 400) {
    harm2 = map(workload, 400, 360, 0, 126.5);
  } else if (workload > 400) {
    harm2 = 0;
  }
  if (workload < 400 && anxiety > 100) {
    hp -= 0.5;
  }
  if (restHp <= 10) {
    restHp = 5;
    fill(0);
    rect(200, 0, 600, 500);

    goodJoby += 0.8;

    fill(255, 0, 0, 255);
    textSize(80);
    text("You Killed It.", 240, 250);
    fill(255);
    text("Good Job!", 275, goodJoby - 50);
    fill(0, 0, 0, 0);
  }
  if (goodJoby > 550) {
    goodJoby = 0;
  }

  //click to start
  noStroke();
  fill(100, 100, 100, transparency);
  rect(200, 0, 600, 500);
  fill(255, 255, 255, transparencyText);
  textSize(60);
  text("Click to Start!", 300, 250);
}

function mouseClicked() {
  if ((transparency = 100)) {
    transparency = 0;
  }
  if ((transparencyText = 255)) {
    transparencyText = 0;
  }
}

function drawTree() {
  let rg1 = map(anxiety, 10, 160, 31, 177);
  let bg1 = map(anxiety, 10, 160, 188, 173);
  let gg1 = map(anxiety, 10, 160, 31, 137);
  fill(rg1, bg1, gg1);
  circle(0, 550, 160);
  fill("brown");
  rect(-12.5, 350, 25, 170);
}
