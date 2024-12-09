let idCardInstance;  // 实例化IDCard
let IDCardIMG;
let Male, Female;  // 用于存储切换的图片
let currentImage;    // 当前显示的图片

function preload(){
  // 确保图片路径正确
  IDCardIMG = loadImage("assets/IDCard.jpg");
  Male = loadImage("assets/Male.png");  
  Female = loadImage("assets/Female.png");  
}

function setup() {
  let canvas = createCanvas(400, 540);
  canvas.parent('p5-canvas-container-name');
  canvas.position(windowWidth / 2 - width / 2, windowHeight / 2 - height /2);

  // 创建 IDCard 实例
  idCardInstance = new IDCard(IDCardIMG);

  // 默认显示 Male 图像
  currentImage = Male;

  // 选择按钮并绑定事件
  let buttonA = select('#buttonA');
  buttonA.mousePressed(showMale);  // 点击 Male 按钮时调用 showMale

  let buttonB = select('#buttonB');
  buttonB.mousePressed(showFemale);  // 点击 Female 按钮时调用 showFemale
}

function draw() {
  background(220);

  // 更新和显示 IDCard 背景
  idCardInstance.update();
  idCardInstance.display();

  // 显示当前选中的图片，居中显示
  imageMode(CENTER);  // 使用 CENTER 模式使图片居中
  image(currentImage, width / 2 + 4, height / 2 -62, 177, 250);  // 图片居中，调整大小
}

function showMale() {
  currentImage = Male;  // 切换为 Male 图片
}

function showFemale() {
  currentImage = Female;  // 切换为 Female 图片
}

// IDCard 类定义
class IDCard {
  constructor(jpg){
    this.x = width / 2;  // 图像中心对齐
    this.y = height / 2; // 图像中心对齐
    this.jpg = jpg;
    this.sizeX = 400; 
    this.sizeY = 540;  // 设置适当的尺寸
  }

  update(){
    // 你可以在这里更新任何动画或交互
  }

  display(){
    push();
    translate(this.x, this.y);  // 移动到指定位置
    imageMode(CENTER);  // 设置图像绘制模式为中心对齐
    image(this.jpg, 0, 0, this.sizeX, this.sizeY);  // 绘制图片，适当调整大小
    pop();
  }
}
