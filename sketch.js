var monkey, monkeyImage, monkeyDead;
var bananaImage, stoneImage;
var ground, bananaGroup, obstacleGroup, survival = 0,
  score = 0,
  life = 2;
var bg, bgImage;
var gameState = "play";



function preload() {
  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png", )
  monkeyDead = loadImage("Monkey_01.png")
  bananaImage = loadImage("banana.png")
  stoneImage = loadImage("stone.png")
  bgImage = loadImage("jungle.jpg")
}


function setup() {
  createCanvas(500, 300);
  ground = createSprite(200, 290, 800, 20);
  ground.x = ground.width / 2;

  bg = createSprite(300, 150);
  bg.addImage("bg", bgImage)
  bg.scale = 0.5;
  bg.velocityX = -3;

  monkey = createSprite(200, 200, 10, 10);
  monkey.addAnimation("monkey", monkeyImage);
  monkey.addImage("monkeyD", monkeyDead);
  monkey.scale = 0.1;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {

  background(255);
  if (gameState === "play") {
    survival = survival + Math.round(getFrameRate() / 60);

    if (keyDown("space")) {
      monkey.velocityY = -10;
    }

    monkey.velocityY = monkey.velocityY + 0.5;

    if (bg.x < 0) {
      bg.x = 500;
    }

    monkey.collide(ground);

    createBanana();
    createStone();

    for (var i = 0; i < bananaGroup.size(); i++) {
      if (bananaGroup.get(i).isTouching(monkey)) {
        bananaGroup.get(i).destroy()
        score += 2
      }
    }

    switch (score) {
      case 10:
        monkey.scale = 0.12;
        break;
      case 20:
        monkey.scale = 0.14;
        break;
      case 30:
        monkey.scale = 0.16;
        break;
      case 40:
        monkey.scale = 0.18;
        break;
      case 50:
        monkey.scale = 0.2;
        break;
      default:
        break;
    }

    if (monkey.isTouching(obstacleGroup)) {
      life--;
      obstacleGroup.destroyEach();
      monkey.scale = 0.1
    }

    if (life == 0) {
      gameState = "end"
    }
  } else if (gameState === "end") {
    bg.velocityX = 0;
    obstacleGroup.setVelocityXEach(0)
    bananaGroup.setVelocityXEach(0)
    monkey.changeImage("monkeyD", monkeyDead)
  }

  drawSprites();

  stroke("blue");
  fill("magenta")
  textSize(18);
  text("Survival Time: " + survival, 320, 50);
  text("Score: " + score, 50, 50);
  text("Lives: " + life, 50, 80);
  if (gameState === "end") {
    stroke("black");
    fill("magenta")
    strokeWeight(4)
    textSize(50);
    text("Game Over", 130, 180);
  }
}

function createBanana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(width, random(50, 200), 10, 10);
    banana.velocityX = -3;
    banana.addImage("Banana", bananaImage);
    banana.scale = 0.05;
    banana.lifetime = 400 / 3;
    bananaGroup.add(banana);
  }
}

function createStone() {
  if (frameCount % 300 === 0) {
    var stone = createSprite(width, 260, 10, 10);
    stone.velocityX = -3;
    stone.addImage("Stone", stoneImage);
    stone.scale = 0.1;
    stone.lifetime = 400 / 3;
    stone.depth = bg.depth + 1
    obstacleGroup.add(stone);

  }
}