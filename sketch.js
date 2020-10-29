var PLAY = 1;
var END  = 0;
var gameState = PLAY
var stop;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime , score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  stop = loadAnimation("stop","sprite0.png")
}



function setup() {
  
  monkey = createSprite (80,315,20,20);
  monkey.addAnimation ("running",monkey_running)
  monkey.scale = 0.1
  
  ground = createSprite (400,350,900,10)
  ground.velocityX = -7;
  console.log(ground.width);
  
  obstacleGroup = createGroup();
  fruitGroup = createGroup();
  
  survivalTime = 0;
  score= 0
  
}


function draw() {

  background ("lightgrey");
  monkey.collide(ground);
 
  stroke("white");
  textSize(20);
  fill("white");
  
  if(gameState === PLAY){
     text("Survival Time:"+survivalTime,30,30)
  
  // making the ground repeat itself
  ground.x=ground.width/2
  
  if (keyDown("space")&& monkey.y>210){
    monkey.velocityY = -12
  }
  

  obstacles();
  fruits();
  
  //survivaltime
  survivalTime =  survivalTime + Math.round(getFrameRate()/65);
  
  if(monkey.isTouching(fruitGroup)){
    score=score+2
    fruitGroup.destroyEach();
  }
  
  text("Score:"+score,270,30);
     
  }
  
  if(gameState===END){
    ground.velocityX = 0;
    text("GAMEOVER",150,200);
  }
  
  if (monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
  
  if (keyDown("space")){
    gameState=PLAY;
  }
  
    monkey.velocityY = monkey.velocityY+0.8
  
  
  drawSprites();
  
  
}


function obstacles(){
  if (frameCount%300 === 0){
    var obstacle = createSprite (350,310,30,30);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.Lifetime = 100;   
    obstacle.velocityX= -7;
    obstacleGroup.add(obstacle)
  
  }
}

function fruits(){
  if (frameCount%80 === 0){
    var banana =createSprite (350,Math.round(random(120,200)),15,15);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX= -7
    fruitGroup.add(banana)
    
  }
}


