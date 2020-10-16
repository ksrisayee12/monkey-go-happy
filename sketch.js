var monkey ,banana ,obstacle,background,ground,monkey2;
var monkeyimage,bananaimage,obstacleimage,obstacle1image,obstacle2image,obstacle3iage,obatacle4image,backgroundimage,gameover,restart,gameoverimage,restartimage
var bananagroup,obstaclegroup
PLAY=1
END=0
var gameState = PLAY;
var score

function preload(){
  
  
  monkeyimage =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaimage = loadImage("banana.png");
  obstacleimage = loadImage("obstacle.png");
 
  backgroundimage = loadImage("background.png")
  
  monkey2 = loadImage("Fallen Monkey 1.png")
  
  gameoverimage = loadImage("game over.png")
  
  restartimage = loadImage("restart.png")
}


function setup() {
  createCanvas(600,509);
  
 
  
  ground = createSprite(400,393,900,13);
  ground.velocityX = -6;
  ground.x = (200,300);
  ground.visibilty=false
  
  bananagroup = new Group();
  obstaclegroup = new Group();
  
  score=0
  
  background = createSprite(10,170,500,500)
  background.addImage(backgroundimage)
  
  background.scale=0.9
  
   monkey = createSprite(80,385,20,20);
  monkey.addAnimation("monkey",monkeyimage);
  monkey.addImage("collide",monkey2)
  monkey.scale = 0.1;
  monkey.debug=true
  monkey.setCollider("circle",-1,-5,325) 
  
  monkey.debug=false
   
 gameover = createSprite(288,240,600,500)
  gameover.addImage("gameover",gameoverimage)
 
  restart = createSprite(300,465,10,10)
  restart.addImage("restart",restartimage)
  restart.sclae=0.5
  
  
}


function draw() {
  
  
  
  
  background.velocityX=-5 
  
   if(background.x < 0){
    background.x = background.width/2
   }   
  
  ground.x = ground.width/2;
  monkey.collide(ground);
  
  if (gameState === PLAY){
     
    if (keyDown("space") &&monkey.y>=260)
  {
   monkey.velocityY = -14;
  }
  
  // gravity
  monkey.velocityY = monkey.velocityY + 0.8;
   
    restart.visible = false
    gameover.visible = false
    
  if(bananagroup.isTouching(monkey)){
    bananagroup.destroyEach();
    score=score+1.5
  }
  
  if(obstaclegroup.isTouching(monkey)){
   gameState = END;
    monkey.changeAnimation("collide",monkey2)
   
    
   }  
   
  
  
  obstacles();
  food();
    
  }
  
  if( gameState === END){
    
      monkey.velocityY=0;
      banana.velocityX = 0;
      obstacle.velocityX = 0;
      obstaclegroup.velocityX = 0;
    background.velocityX=0
    restart.visible = true
    gameover.visible = true
    banana.visible=false
    obstacle.visible=false
    
    if (mousePressedOver(restart)){
      reset()
    }
    
    score=0
    
      obstaclegroup.setLifetimeEach(-1);
    bananagroup.setLifetimeEach(-1);
  }

  drawSprites();
  
  
  fill("black");
  textSize(20);
  text("score:"+score,500,100)



  
}


function reset(){
  
gameState=PLAY
  
  
  restart.visible=false
  
  //groupname.destroyEach()
  obstaclegroup.destroyEach()
  bananagroup.destroyEach()
  
  monkey.changeAnimation("monkey",monkeyimage)
  
  score=0  
  
}

function food(){
  if( frameCount % 115 === 0){
    banana = createSprite(600,200,10,10);
    banana.addImage(bananaimage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.y = Math.round(random(150,200));
    banana.lifetime = 150;
    
    bananagroup.add(banana);      
  }
}

function obstacles(){
  if(frameCount % 310 === 0){
    obstacle = createSprite(600,350,10,10);
    obstacle.addImage(obstacleimage);
    obstacle.scale = 0.19;
    obstacle.velocityX = -5;
    obstacle.lifetime = 400;
    obstacle.debug=false 
    obstacle.setCollider("rectangle",-1,-5,450,450)
    
    obstaclegroup.add(obstacle);
  }
  
  
}