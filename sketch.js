var bananaImage, obstacleImage, obstacleGroup, backgr,backgImage, score, playerAnim, player,ground,invisibleGround;
var factor =100;

function preload(){
  backgImage = loadImage("jungle2.jpg");
  obstacleImage = loadImage("stone.png");
  bananaImage = loadImage("banana.png");
  playerAnim= loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
}

function setup() {
  createCanvas(400,400);
   
  backgr=createSprite(0,0,400,400);
  backgr.addImage(backgImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;

  ground = createSprite(200,380,400,20);
  ground.visible = false;
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  invisibleGround = createSprite(200,400,400,20);
  invisibleGround.visible = false;

  player = createSprite(60,380,20,50);
  player.addAnimation("Running",playerAnim);
  player.scale=0.02;
  
  score = 0;
  
  fruitGroup = new Group();
  obstacleGroup = new Group();
}
function draw() {
 background("White");
  
 if(keyDown("SPACE")){
  player.velocityY = -12;
 }
 player.velocityY = player.velocityY+0.8;
 spawnFruit();
 spawnObstacles();
  if(score<=2) {
      player.scale=0.04;
  }
      
  if(factor == 0) {
    factor = 100;
  }
   if(fruitGroup.isTouching(player)){
   score = score+2;
   factor = factor-6;
   fruitGroup.destroyEach();
   player.scale = score/factor;
 }
  else if(obstacleGroup.isTouching(player)){
  player.scale = 0.04; 
  score = 0;
  obstacleGroup.destroyEach();
 }
 if(player.y<150){
   player.y = 360;
 }
 player.collide(invisibleGround);
 drawSprites();
 stroke("black");
 textSize = 20;
 fill("black")
 text("Score: "+score,200,100);
  
  if(ground.x<200) {
    ground.x=ground.width/2;
  }
  if(backgr.x < -200){
    backgr.x= backgr.width/2;
  }
  
}
function spawnFruit(){
  if (frameCount % 60 === 0) {
    var fruit = createSprite(400,320,40,10);
    fruit.y = random(280,320);
    fruit.addImage(bananaImage);
    fruit.scale = 0.05;
    fruit.velocityX = -3;
    
     //assign lifetime to the variable
    fruit.lifetime = 134;
    
    //adjust the depth
    fruit.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    fruitGroup.add(fruit);
}
}
function spawnObstacles(){
  if (frameCount % 80 === 0) {
    var obstacle = createSprite(400,320,40,10);
    obstacle.y = Math.round(random(400,380));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.05;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 134;
    
    //adjust the depth
    obstacle.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
}
}