let ground;
let lander, landerImg;
let bgImg;
let obstacle;
let timer;
let landed = false;

var yVelocity = 0;
var xVelocity = 0;
var gravity = 0.05;

var thrust, crash, land, rcs_left, rcs_right, normal, obstacleImg, lzImg, lz;

function preload() {
  landerImg = loadImage("assets/lunar.png");
  bgImg = loadImage("assets/bg.png");

  thrust = loadAnimation("assets/b_thrust_1.png", "assets/b_thrust_2.png", "assets/b_thrust_3.png");
  crash = loadAnimation("assets/crash1.png", "assets/crash2.png", "assets/crash3.png");
  land = loadAnimation("assets/landing1.png", "assets/landing2.png", "assets/landing_3.png");
  rcs_left = loadAnimation("assets/left_thruster_1.png", "assets/left_thruster_2.png");
  rcs_right = loadAnimation("assets/right_thruster_1.png", "assets/right_thruster_2.png")
  normal = loadAnimation("assets/normal.png");

  obstacleImg = loadImage("assets/obstacle.png");
  lzImg = loadImage("assets/lz.png");

  thrust.playing = true;
  thrust.looping = false;
  land.looping = false;
  crash.looping = false;
  rcs_left.looping = false;
  rcs_right.looping = false;
}

function setup() {
  createCanvas(1000, 600);
  frameRate(80);
  timer = 1500;
  thrust.frameDelay = 5;
  land.frameDelay = 5;
  crash.frameDelay = 10;
  rcs_left.frameDelay = 5;
  rcs_right.frameDelay = 5;

  ground = createSprite(500, 590, 1000, 20);

  lander = createSprite(100, 80, 30, 30);
  lander.addImage(landerImg);
  lander.scale = 0.15;
  lander.setCollider("rectangle", 0, 0, lander.width, lander.height - 400);

  lander.addAnimation("thrusting", thrust);
  lander.addAnimation("crashing", crash);
  lander.addAnimation("landing", land);
  lander.addAnimation("left", rcs_left);
  lander.addAnimation("right", rcs_right);
  lander.addAnimation("normal", normal);

  lz = createSprite(260, 360, 50, 30);
  lz.addImage(lzImg);
  lz.scale = 0.4;
  lz.setCollider("rectangle", 0, 180, 400, 100);

  rectMode(CENTER);
  textSize(20)
}

function draw() {
  background(0);
  image(bgImg, 0, 0, 1000, 600);

  push();
  fill("white");
  text("Vertical Velocity: " + yVelocity, 600, 80)
  text("Horizontal Velocity: " + xVelocity, 600, 40)
  pop();

  yVelocity += gravity;
  lander.position.y += yVelocity;
  lander.position.x += xVelocity;

  var d = dist(lander.position.x, lander.position.y, lz.position.x, lz.position.y);

  if (d <= 5 && (yVelocity < 2 && yVelocity > - 2) && (xVelocity < 4 && xVelocity > - 2)) {
    landed = true;
    console.log("Landed");
    yVelocity = 0;
    xVelocity = 0;
    gravity = 0;
    lander.changeAnimation("landing");
  
    fill("yellow")
    textSize(45);
    text("You Won", 500, 300);
  }

  if (lander.collide(ground) == true) {
    console.log("CRASHED");
    lander.changeAnimation("crashing");
    stop();
  }

  drawSprites();
}

function keyPressed() {
  if (landed == false) {
    if (keyCode === UP_ARROW) {
      upwardThrust();
      lander.changeAnimation("thrusting");
    }

    if (keyCode === RIGHT_ARROW) {
      rightThrust();
      lander.changeAnimation("right");
    }

    if (keyCode === LEFT_ARROW) {
      leftThrust();
      lander.changeAnimation("left");
    }
  }
}

function upwardThrust() {
  yVelocity = -1;
}

function rightThrust() {
  xVelocity += 0.2;
}

function leftThrust() {
  xVelocity -= 0.2;
}

function stop() {
  yVelocity = 0;
  xVelocity = 0;
  gravity = 0;
}