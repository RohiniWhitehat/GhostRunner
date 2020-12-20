var tower,towerImg;
var ghost,ghostImgJ,ghostImgS;
var door, doorImg;
var climber, climberImg;
var climberGroup, doorGroup;
var iBlock, iBlockGroup;
var gameState="play";

function preload(){
  towerImg=loadImage("tower.png");
  ghostImgJ=loadImage("ghost-jumping.png");
  ghostImgS=loadImage("ghost-standing.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=2;
  
  ghost = createSprite(200,200);
  ghost.addImage(ghostImgS);
  ghost.scale=0.4;
  
  doorGroup = new Group();
  climberGroup = new Group();
  iBlockGroup = new Group();
}

function draw(){
  background("black");
  
  if(gameState==="play"){
  
      if(tower.y>600){
        tower.y=300;
      }
      if(keyDown("space")){
        ghost.velocityY=-4;
      }

      if(keyDown("left")){
        ghost.x=ghost.x-3;
      }

      if(keyDown("right")){
        ghost.x=ghost.x+3;
      }
      ghost.velocityY=ghost.velocityY+0.3;

      if(climberGroup.isTouching(ghost)){
            ghost.velocityY=0;
          }

      if(iBlockGroup.isTouching(ghost) || ghost.y>=600){
        gameState="over";
      }
      
      spawnDoors();
  }
  
  drawSprites();
  
  if(gameState==="over"){
    climberGroup.destroyEach();
    doorGroup.destroyEach();
    iBlockGroup.destroyEach();
    tower.setVelocity(0,0);
    ghost.setVelocity(0,0);
    ghost.destroy();
    fill("yellow");
    textSize(44);
    text("GAME OVER!!",170,180);
  }
}

function spawnDoors(){
  if(frameCount%150===0){
      var x = Math.round(random(150,450))
      
      door = createSprite(x,-50,10,10);
      door.addImage(doorImg);
      door.velocityY=2;
      doorGroup.add(door);
    
      climber=createSprite(x,0,10,10);
      climber.addImage(climberImg);
      climber.velocityY=2;
      climberGroup.add(climber);
    
      iBlock = createSprite(x,10,climber.width,20);
      iBlock.velocityY=2;
      iBlock.visible=false;
      iBlockGroup.add(iBlock);
    
    
      ghost.depth=climber.depth;
      ghost.depth=ghost.depth+1;
    
      door.lifetime=350;
      climber.lifetime=300;
      iBlock.lifetime=300;
    
      
  }
  
}