/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new Kun(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class Kun {
  constructor(startX, startY,s) {
    this.x = startX;
    this.y = startY;
    this.scaleFactor = s;
    this.bodyAngle = 0;
    this.amplitude = 10
    this.legPosL=-27
    this.legPosR=27
    this.bodyX=0
    this.ballAngle=0
    this.legAngle=0
    this.handAngle=0
    // add properties for your dancer here:
    //..
    //..
    //..
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.shoulderAngle += this.shoulderSpeed;
    this.bodyAngle+=0.05
    this.ballAngle+=0.3
    this.legAngle+=0.4
    this.handAngle+=0.1
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    fill(100)
    rect(-20,-40,40,40)
    fill(180+30*sin(this.ballAngle),160,100)
    circle(0,-50+10*sin(this.bodyAngle),60)
    fill(80)
    stroke("white")
    push()
    translate(0,-10+10*sin(this.bodyAngle))
    bezier(0,-70,-36,-67,-42,-44,-32,-28)
    bezier(0,-70,36,-67,42,-44,32,-28)
    fill(255)
    textSize(20)
    text('o_O',-17,-28)
    pop()
    fill(0,0,0,0)
    stroke(100)
    strokeWeight(6)
    
    bezier(-17,50,this.legPosL+20*sin(this.legAngle),66,-27,77,-12,89)
    bezier(17,50,this.legPosR+20*cos(this.legAngle),66,27,77,12,89)
    
    fill(100)
    this.bodyangle+=0.05
    let bodyX = this.amplitude * sin(this.bodyAngle);
    let bodyY = this.amplitude * sin(3.2*this.bodyAngle);
    rect(bodyX-36,bodyY-20,70,72,20)
    
    push()
    translate(bodyX+40,bodyY)
    rotate(this.handAngle)
    fill(100)
    stroke(1)
    strokeWeight(0)
    fill(220,140,200)
    rect(-10,0,70,7)
    fill(100)
    circle(0,0,23)
    
    
    pop()
    fill(255)
    noStroke()
    rect(bodyX-20,bodyY-20,4,70)
    rect(bodyX+20,bodyY-20,4,70)
    
    fill('orange')
    circle(-50,30+20*sin(this.ballAngle),30)


    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    strokeWeight(0)
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/