var ground,player,groundImage,playerImage;
var obstacle,obstacleImage;
var cactus,boxImage,jewelImage;
var ground2,monsterImage;
var logGroup,cactusGroup,groundGroup;
var gameState;
function preload(){
    groundImage=loadImage("images/log/Pad_02_1.png");
    obstacleImage=loadImage("images/obstacle/Prop_5.png");
    monsterImage=loadImage("images/monster/34.png");
    boxImage=loadImage("images/box/2.png");
    jewelImage=loadImage("images/jewel/8.png")
    playerImage=loadImage("images/charcter/knight.png")
    restartImage=loadImage("images/restart.jpg");
}
function setup(){
createCanvas(1000,700);
logGroup=new Group();
cactusGroup=new Group();
groundGroup=new Group();
gameState="play";
restart=createSprite(462,170,20,20);
restart.addImage(restartImage);
restart.visible=false;
ground=createSprite(500,height-10,1000,20);
//ground.addImage(groundImage);
invisibleGround=createSprite(500,height,1000,10);
invisibleGround.visible=true;
ground.shapeColor="red";
player=createSprite(50,620,20,20);
player.debug=true;

player.addImage(playerImage);
player.setCollider("circle",-10,20,30);
//stage1

obstacle2=createSprite(558,668,40,10);
obstacle2.velocityX=2;
obstacle2.addImage(monsterImage);
obstacle2.scale=0.15;
barrier1=createSprite(550,668,5,20);
barrier2=createSprite(805,668,5,20);
barrier1.visible=false;
barrier2.visible=false;
box1=createSprite(982,677,30,30);
box1.addImage(boxImage);
box1.scale=0.3;

//stage2
ground2=createSprite(440,550,880,15);
ground2.shapeColor="red";
 for(var i=180;i<460;i=i+200){
     createCactus(i,670);
 }
for(var i=150;i<800;i=i+150){
createCactus(i,530);
}
for(var i=300;i<750;i=i+200){
    createCactus(i,273);
}

for(var i=200;i<965;i=i+250){
createGround(i,420);
}
for(var i=100;i<900;i=i+220){
    createGround(i,300);
}
createLogs(51,505,45);
createLogs(951,375,135);

jewel=createSprite(22,273,30,30);
jewel.addImage(jewelImage);
jewel.scale=0.2;

}
function draw(){
 background("black");
 fill(255);



if(gameState==="play"){
    obstacle2.bounceOff(barrier1);
    obstacle2.bounceOff(barrier2);
   
        player.velocityY+=0.5;
player.collide(invisibleGround);
player.collide(ground2);

player.collide(box1);
player.collide(groundGroup);
player.collide(logGroup);
if(cactusGroup.isTouching(player)||player.isTouching(obstacle2)){
    gameState="end";

}
if(player.isTouching(jewel)){
    gameState="win";
   
}
}
else if(gameState==="end"){
    textSize(20);
    text("You Lose",440,41);
    player.velocityX=0;
    player.velocityY=0;
restart.visible=true;
if(mousePressedOver(restart)){
    reset();
}

}else if(gameState==="win"){
    textSize(20);
text("YOU WIN",440,41);
restart.visible=true;
}


 text(mouseX+","+mouseY,mouseX,mouseY);
drawSprites();
}
function createCactus(x,y){
    cactus=createSprite(x,y,10,10);

cactus.addImage(obstacleImage);

cactus.scale=0.15;
cactusGroup.add(cactus);
}
function createGround(x,y){
   newGround=createSprite(x,y,150,15);
   newGround.addImage(groundImage);
   newGround.scale=0.2;
groundGroup.add(newGround);

}
function createLogs(x,y,r){
    log1=createSprite(x,y,100,15);
    log1.rotation=r;
    log1.addImage(groundImage);
    log1.scale=0.2;
    logGroup.add(log1);

}
function keyPressed(){
    if(keyCode===UP_ARROW){
        
     
  player.velocityY=-10;}
    if(keyCode===RIGHT_ARROW){
        player.velocityX=5;
    }
    if(keyCode===LEFT_ARROW){
        player.velocityX=-5;
    }
}
function reset(){
    gameState="play";
    player.x=50;
    player.y=620;
    restart.visible=false;

}