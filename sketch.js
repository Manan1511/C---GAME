var database;
var gameState =0;

var shooter, ball, bullets;
var shooterimg, ballimg;
var ballGroup;
var gun,Win,Die;

var ballarray = [];

function preload(){
  shooterimg = loadImage("images/shooter.png");
  ballimg = loadImage("images/image.png");

  gun = loadSound("Sounds/Gun-Shot.mp3");
  win = loadSound("Sounds/Victory.mp3");
  die = loadSound("Sounds/Game Over.mp3");
}
function setup() {
  createCanvas(displayWidth-20, displayHeight-220);
  shooter = createSprite(displayWidth/2,displayHeight-280,20,20);
  shooter.addImage(shooterimg);
  shooter.scale = 0.7;
  edges = createEdgeSprites();
  ballGroup = new Group();
  bulletGroup = new Group();
  shooter.debug = true;
}

function draw() {
  background(0);

  if(gameState===0){
    
    shooter.x = mouseX;
    fire();
    spawner();
    nos = Math.round (random(10,50));
    //Destroying bullets after they hit
     for(var i = 0;i<bulletGroup.maxDepth();i++){
      var bulletSprite = bulletGroup.get(i);
      if(bulletSprite != null && bulletSprite.isTouching(ballGroup)){
        bulletSprite.destroy();
     }
    }
    //subtracting numbers as soon as a bullet hits
    for(var i = 0;i<ballGroup.maxDepth();i++){
      var ballSprite = ballGroup.get(i);
      if(ballSprite != null  && ballSprite.isTouching(bulletGroup)){
        console.log(ballarray);
        var dummy = ballarray[i][1];
        dummy = dummy -1;
        ballarray[i][1] = dummy;
        console.log(ballarray[i][1]);
      }
    }
    console.log(ballGroup.maxDepth());
    if(ballGroup.maxDepth()%10===0 && ballGroup.maxDepth() != 0){
      ballGroup.destroyEach();
      ballarray = [];
    }
    //Adding numbers on the side of balls
    for(var i = 0;i<ballarray.length;i++){
      stroke("white")
      textSize(20);
      text(ballarray[i][1],ballarray[i][0].x+100,ballarray[i][0].y);

    }
  if(ballGroup.isTouching(shooter)){
    gameState = 1;
    die.play();
  }
  
}
  if(gameState===1){
    stroke("red");
    textSize(50);
    textAlign(CENTER);  
    text("GAME OVER", displayWidth/2, displayHeight/2);
  }
  drawSprites();
}
function fire(){
  
  bullets = createSprite(shooter.x,shooter.y,5,10);
  bulletGroup.add(bullets);
  bullets.shapeColor = "yellow";  
  bullets.velocity.y = -30;
  bullets.lifetime = 100;
  if(frameCount%1000===0){
  gun.play();
}
}
function spawner(){
  if(frameCount%70===0){
    ball = createSprite(10,100,10,10);
  ball.addImage(ballimg);
  ball.x = random(20,displayWidth-20);
  ballGroup.add(ball);
  ball.scale = 0.3;
  //ball.lifetime = 200;
  ball.velocity.y = 10;
  ball.bounceOff(edges);
  var balldata = [ball,nos];
  ballarray.push(balldata);
  ball.debug = true;
  ball.setCollider("circle",0,0,220);
  }
}