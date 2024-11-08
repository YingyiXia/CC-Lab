let myContinents=[];
let peoples = [];
let angle
let heartX
let heartY

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container")
  colorMode(HSB);
  
  myContinent = new Continent(100, 150);
   for (let i = 0; i < 1; i++) {
    myContinents.push(new Continent(random(100, 400), random(0, 400)));
  }
  
   for (let i = 0; i < 500; i++) {
    peoples.push(new people(random(0, width), random(0, height)));
  }
  
  
}

function draw() {
  //background(250,220,100)
  console.log(mouseX,mouseY)


  for(i=0; i<1;i++){
    myContinents[i].update();
  myContinents[i].display();
  }
  for (let i = peoples.length - 1; i >= 0; i--) {
    peoples[i].update();
    peoples[i].display();

    if (peoples[i].isOffScreen() || peoples[i].lifetime <= 0) {
      peoples.splice(i, 1);  
    if(peoples.length<300){
      peoples.push(new people(random(0, width), random(0, height)))
    }
    }
  }
  
}

class Continent {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = 40;
    this.x = 250
    this.y = 200
    this.color = random(100,240)
    fill(100,100,100)
    
  
    
  }

  update() {
  
  }

  display() {
  
    
    noStroke()
    fill(50,100,100)
    arc(250,200,380,380,0.7,PI*0.8)
    fill(this.color, 20, 100);
    circle(this.x, this.y, 250); 
    textSize(this.size)
    this.size*=1.0001
    text('🩷',this.x-37,this.y+10)
    
  }
}


class people {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = random(5, 8.5);  
    this.color = color(random(200,300), random(40,90), random(60,90));  
    this.speedx = random(-1, 1);  
    this.speedy = random(-2, 2);  
    this.lifetime = random(100, 255);  
    this.angle = 0
  }

  update() {
    this.angle = frameCount*0.05
    this.x += this.speedx*10*sin(this.angle)
    this.y += this.speedy*random(0.2,0.4);
    
 
    this.lifetime -= 1;
    
  }

  display() {
    fill(this.color);
    noStroke();
    circle(this.x, this.y, this.size); 
    
    

  }

 
  isOffScreen() {
  if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
    return true;  
  } else {
    return false; 
  }
}
}
