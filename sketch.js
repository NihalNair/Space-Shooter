var scene, sceneImg;
var spaceShip, spaceShipImg, spaceshipImg2, invisibleWings;
var enemyImg, enemy;
var lazer, lazer2, lazerbeam, lazerImg, lazerImg2;
var warning, warningImg;
var missil, missilImg, boom, boomImg, meteor, meteorImg, gameOver, gameOverImg, restart, restartImg;
var shots = 0;
var load = 0;
var score = 0;
var life = 3;
var e = 0;
var gameState = "intro";
var enemyHp = 500;
var decideShot = 0;
var meteorTriger = "off";
var highScore = 0;
var a = 0;

function preload(){

sceneImg = loadImage("galaxy.png");
spaceShipImg = loadImage("spaceship.png");
spaceShipImg2 = loadImage("spaceship2.png");
lazerImg = loadImage("lazer.png");
lazerImg2 = loadImage("lazer2.png");
lazerImg3 = loadImage("lazer3.png");
enemyImg = loadImage("boss.png");
warningImg = loadImage("warning.png");
missilImg = loadImage("homingMissile.png");
shieldImg = loadImage("shield.png");
livesImg = loadImage("lives.png");
boomImg = loadImage("boom.png");
meteorImg = loadImage("meteorit.png");
gameOverImg = loadImage("GameOver.png");
restartImg = loadImage("restart.png");

}

function setup() {
 createCanvas(600, 600);

scene = createSprite(400,300)
scene.addImage(sceneImg);
scene.scale = 0.5;
scene.velocityX = -3;
scene.lifetime = 900;

livesSymbol = createSprite(535, 40);
livesSymbol.addImage(livesImg);
livesSymbol.scale = 0.3;
livesSymbol.depth = 10;
livesSymbol.visible = false; 

spaceShip = createSprite(100, 300);
spaceShip.addImage(spaceShipImg2);
spaceShip.scale = 0.4;
spaceShip.depth = 2;
spaceShip.y = 300;

gameOver = createSprite(300,250);
gameOver.addImage(gameOverImg);
gameOver.scale = 1;
gameOver.depth = 50;
gameOver.visible = false;

restart = createSprite(300,410);
restart.addImage(restartImg);
restart.scale = 0.7;
restart.depth = 50;
restart.visible = false;

invisibleWings = createSprite(50, 300, 10, 140);
invisibleWings.visible = false;

boom = createSprite(50, 300, 10, 140);
boom.addImage(boomImg);
boom.scale = 1;
boom.depth = 15;
boom.visible = false;

meteor = createSprite(800,Math.round(random(550,50)),10,10);
meteor.addImage(meteorImg);
meteor.scale = 0.25;
meteor.lifetime = 500;
meteor.depth = 16;

//shield = createSprite(100, 300);
//shield.addImage(shieldImg);
//shield.scale = 0.4;
//shield.depth = 2.1

createEnemy();

sceneGroup = new Group();

lazerGroup = new Group();

lazerGroup2 = new Group();

missilGroup = new Group();

lazerbeamGroup = new Group();

meteorGroup = new Group();

}

function draw() {
background("black");

if(gameState === "intro"){
    gameOver.visible = false;
    restart.visible = false;
}

if(frameCount % 1 === 0 && spaceShip.velocityX === 0 && gameState === "play" || gameState === "play2"){
    score = score + 1;
}

invisibleWings.y = spaceShip.y;

boom.x = enemy.x;
boom.y = enemy.y;

//shield.x = spaceShip.x;
//shield.y = spaceShip.y; 

if(gameState === "play" && spaceShip.velocityX === 0 && enemy.velocityX === 0 && meteorTriger === "off"){
    decideShot = 1;
}

if(gameState === "play" && spaceShip.velocityX === 0){
    livesSymbol.visible = true;
}

if(gameState === "intro"){
    livesSymbol.visible = false;
}

if(e === 1 && gameState === "play" && enemy.isTouching(lazerGroup)){
    enemyHp = enemyHp - 1;
}

if(spaceShip.isTouching(missilGroup) || invisibleWings.isTouching(missilGroup)){
    missil.destroy();
    life = life - 1;
    ;
}


if(scene.x < 200){
    spawnBackground();
}

if(spaceShip.velocityX === 0 && gameState === "play"){
    if(frameCount % 50 === 0){
        shots = 1
    }
}

if(gameState === "play" && spaceShip.velocityX === 0 && enemy.velocityX === 0 || gameState === "play2"){
spaceShip.y = World.mouseY;


}

if(shots === 1 && gameState === "play" && spaceShip.velocityX === 0 && meteorTriger === "off"){
 shotLazer();  
 shots = 0;       
 
}

    if(decideShot === 1 && gameState === "play"){
        if(frameCount % 80 === 0){
        createMissils();
        e = 1;
        }
    }

if(e === 1 && gameState === "play"){

if(missil.velocityX === -5){

    if(missil.y > spaceShip.y + 49){
        missil.velocityY = -3; 
    }

    if(missil.y < spaceShip.y - 49){
        missil.velocityY = 3; 
    }

    if(missil.y === spaceShip.y + 50){
        missil.velocityY = 0; 
    }

    if(missil.y === spaceShip.y - 50){
        missil.velocityY = 0; 
    }

    if(missil.y === spaceShip.y){
        missil.velocityY = 0; 
    }    
}

}

if(spaceShip.x > 700){

    
    spaceShip.x = -50;
     gameState = "play"; 

}

if(gameState === "play"){
    if(spaceShip.x > 98){
    
    spaceShip.velocityX = 0;
    spaceShip.x = 100;
    }
}
     
//spaceShip.debug = true;
//invisibleWings.debug = true;
//enemy.debug = true;
//meteor.debug = true;


if(keyDown("space") && gameState === "intro"){

    spaceShip.velocityX = 7; 
 
}

if(life < 1){
    gameState = "end";
    spaceShip.destroy();
    enemy.destroy();
    meteorGroup.destroyEach();
    lazerGroup.destroyEach();
    missilGroup.destroyEach();
    livesSymbol.visible = false;
    gameOver.visible = true;
    restart.visible = true;
    

    if(mousePressedOver(restart)){
        life = 3;
        gameState = "intro";
        reset();
    }
}

if(enemyHp < 0){
    boom.visible = true;
    missilGroup.destroyEach();
    lazerGroup.destroyEach();
    meteorTriger = "active";
    decideShot = 0;
    e = 0;

    if(frameCount % 100 === 0){
        boom.destroy();
        enemy.destroy();
        enemyHp = 1000;
        

    }
}

if(meteorTriger === "active" && gameState === "play"){
    a = 1;

    if(a === 1){
        if(frameCount % 120 === 0){
            createMeteorit();
        }

        if(spaceShip.isTouching(meteorGroup)){
            meteor.destroy();
            life = life - 1;
        }
    
    }
}

if(gameState === "play" && spaceShip.velocityX === 0){

    enemy.visible = true;   
    enemy.velocityX = -7;

    if(enemy.x < 502){
        enemy.velocityX = 0;
        enemy.x = 500;
    }
}

if(score > highScore){
    highScore = score;
}

//shield.setCollider("circle",0,0,228);
spaceShip.setCollider("circle",0,0,108);
enemy.setCollider("circle",0,0,108);
meteor.setCollider("circle",0,0,408);

drawSprites();

if(gameState === "intro" && spaceShip.x === 100){
    fill("white");
    stroke("white");
    textSize(50);
    text("Welcome to",225,280);
    text("Space Shooters!",180,350);
    textSize(20);
    text("Click space to continue.",255,420);
}

if(spaceShip.velocityX === 0 && gameState === "play" || gameState === "trans" || gameState === "play2"){
    fill("white");
    stroke("white");
    textSize(20);
    text("Score: "+ score,15,50);
    text(life,555,50);
}

if(spaceShip.velocityX === 0 && gameState === "play" || gameState === "trans" || gameState === "play2" || gameState === "end"){
    fill("white");
    stroke("white");
    textSize(20);
    text("High Score: "+ highScore,15,550);
}

if(gameState === "end"){
    fill("white");
    stroke("white");
    textSize(30);
    text("Your score was "+score ,170,350);

}

}

function spawnBackground(){
    
scene = createSprite(995,300)
scene.addImage(sceneImg);
scene.scale = 0.5;
scene.velocityX = -3;
scene.lifetime = 900;

scene.depth = 1

sceneGroup.add(scene);


}

function shotLazer(){

    lazer = createSprite(150,200,40,10);
    lazer.addImage(lazerImg);
    lazer.y = spaceShip.y;
    lazer.y = lazer.y - 20;                       
    lazer.velocityX = 3;
    lazer.depth = 1.5;  
    lazer.scale = 0.45;
    lazer.lifetime = 160;
    lazerGroup.add(lazer);
    
    lazer = createSprite(150,200,40,10);
    lazer.addImage(lazerImg);
    lazer.y = spaceShip.y;
    lazer.y = lazer.y + 20;                       
    lazer.velocityX =  3;
    lazer.depth = 1.5;  
    lazer.scale = 0.45;
    lazer.lifetime = 160;
    lazerGroup.add(lazer);
}

function createEnemy(){

    enemy = createSprite(700, 300);
    enemy.addImage(enemyImg);
    enemy.scale = 0.5;
    enemy.visible = false;
    enemy.depth = 1.99
}

function superLazer(){
    lazerBeam = createSprite(445,300,40,10);
    lazerBeam.addImage(lazerImg3);
    lazerBeam.y = enemy.y;                       
    lazerBeam.velocityX =  -13;
    lazerBeam.scale = 0.45;
    lazerBeam.lifetime = 160;
    lazerBeam.depth = 1.4;
    lazerbeamGroup.add(lazerBeam);
}

function createMissils(){
    missil = createSprite(445,300,40,10);
    missil.addImage(missilImg);                 
    missil.velocityX =  -5;
    missil.scale = 0.2;
    missil.lifetime = 300;
    missil.depth = 1.4;
    missilGroup.add(missil);
}

function createMeteorit(){
   meteor = createSprite(800,Math.round(random(550,50)),10,10);
   meteor.addImage(meteorImg);
   meteor.velocityX = -8;
   meteor.scale = 0.25;
   meteor.lifetime = 500;
   meteor.depth = 16;
   meteorGroup.add(meteor);
   
}

function reset(){
    spaceShip = createSprite(100, 300);
    spaceShip.addImage(spaceShipImg2);
    spaceShip.scale = 0.4;
    spaceShip.depth = 2;
    spaceShip.y = 300;
    score = 0;
    meteorTriger = "off";

    createEnemy();
}

