var Dogeyboy, Dogey_Run, Dogey_Collide;
var GroundImg, InvGround;
var Normie, PepeNormie, NormieGroup;
var backgroundImg;
var GameOver, GameOverIMg;
PLAY = 1;
END = 0;
gameState = PLAY;
NormieScore = 0;
function preload(){
  Dogey_Run = loadAnimation("Dogeyboy Sprites/pixil-frame-0.png","Dogeyboy Sprites/pixil-frame-1.png","Dogeyboy Sprites/pixil-frame-2.png","Dogeyboy Sprites/pixil-frame-3.png","Dogeyboy Sprites/pixil-frame-4.png","Dogeyboy Sprites/pixil-frame-5.png","Dogeyboy Sprites/pixil-frame-6.png","Dogeyboy Sprites/pixil-frame-7.png","Dogeyboy Sprites/pixil-frame-8.png","Dogeyboy Sprites/pixil-frame-9.png","Dogeyboy Sprites/pixil-frame-10.png","Dogeyboy Sprites/pixil-frame-11.png","Dogeyboy Sprites/pixil-frame-12.png");
  GroundImg = loadImage("Ground.png");
  PepeNormie = loadAnimation("PepeNormies/pixil-frame-0.png","PepeNormies/pixil-frame-1.png","PepeNormies/pixil-frame-2.png","PepeNormies/pixil-frame-3.png","PepeNormies/pixil-frame-4.png","PepeNormies/pixil-frame-5.png");
  backgroundImg = loadImage("Blue Sky.png");
  GameOverImg = loadImage("Game Over.png");
}

function setup() {
 createCanvas(517.4,400);
 InvGround = createSprite(164,420,60,75);
 InvGround.addImage(GroundImg);
 InvGround.scale = 4;
 InvGround.velocityX = -3;
 Dogeyboy = createSprite(40,240,10,10);
 Dogeyboy.addAnimation("DogeyRun", Dogey_Run);
 Dogeyboy.scale = 2;
 NormieGroup = new Group();
 GameOver = createSprite(258.7,200,10,10);
 GameOver.addImage(GameOverImg);
 GameOver.visible = false;
}
 
function draw() {
 background(backgroundImg);
 frameRate(60);
 text("Normies Punched: " +NormieScore, 380, 30);
 
 if(gameState === PLAY){
   Normies();
   if(InvGround.x < 0){
   InvGround.x = InvGround.width/2;
   }
   if(mousePressedOver(Normie)){
     Normie.destroy();
     NormieScore = NormieScore + 1;
   }
   if(NormieGroup.isTouching(Dogeyboy)){
     gameState = END;
   }
 }else if(gameState === END){
   InvGround.velocityX = 0;
   Normie.velocityX = 0;
   Dogeyboy.visible = false;
   GameOver.visible = true;
   NormieScore = 0;
   NormieGroup.setVelocityXEach(0);
   NormieGroup.setLifetimeEach(-1);
   
   if(mousePressedOver(GameOver)){
     Reset();
   }
 }
   
 
   
 drawSprites();
}
function Normies(){
  if(frameCount % 150 === 0){
    Normie = createSprite(567.4,230,60,75);
    Normie.addAnimation("pepe",PepeNormie);
    Normie.velocityX = -3;
    Normie.scale = 1.5;
    NormieGroup.add(Normie);
    Normie.setCollider("rectangle",0,0,Normie.width,Normie.height);
    Normie.lifetime = 568;
    //Normie.debug = true;
  }
}
function Reset(){
  gameState = PLAY;
  GameOver.visible = false;
  Dogeyboy.visible = true;
  NormieGroup.destroyEach();
  InvGround.velocityX = -3;
}