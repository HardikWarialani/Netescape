var fish, edges, lives=5;
var netGroup;
var net;
var r,l;
var gameState="start"
var play,replay
var w,n;
var f; 
var fcount
var fp;
var re
var playimg
var sound

function preload(){
  r = loadImage("nemoR.png")
  l = loadImage("nemoL.png")
  w = loadImage('Water.jpg')
  n = loadImage("net.png")
  fp = loadImage("food.png")
  re = loadImage("replay.png")
  playimg = loadImage("play.png")
  sound=loadSound('Gene.mp3')
}

function setup() {
  createCanvas(1200,500);
 fish = createSprite(600,350,50,50)
 fish.addImage("l",l)
 fish.addImage("r",r)
 fcount=0
 fish.scale=0.2
 //fish.debug=true
 fish.setCollider("circle",0,0,230)
 edges = createEdgeSprites()
 netGroup=new Group()
 foodGroup=new Group()
 fish.visible=false
 play=createSprite(60,200,100,50)
 play.addImage(playimg)
 play.scale=0.1
 replay=createSprite(60,300,100,50)
 replay.addImage(re)
 replay.scale=0.2
 play.shapeColor='green'
 replay.shapeColor='red'
 replay.visible=false
}

function draw() {
  background(w);  
  drawSprites();
  if(gameState==="start"){
    textSize(50)
    fill('black')
    text("Welcome",10,100)
    lives=5
    fcount=0
    play.visible=true
   /* play.mousePressed(()=>{
      gameState="play"
      play.visible=false
    })*/
    if(mousePressedOver(play)){
      gameState="play"
      play.visible=false
    }
  }
  if(gameState==="play"){
    sound.play()
    throwNet()
    fish.visible=true
    food()
    if (keyDown("a")){
      fish.x-=5
  //fish.y=0
      fish.changeImage("l",l)
      fish.scale=0.2
    }
    if (keyDown("d")){
      fish.x+=5
      //fish.velocityY=0
      fish.changeImage("r",r)
      fish.scale=0.2
    }
    if (keyDown("w")){
      fish.y-=5
      //fish.velocityX=0
      fish.changeImage("l",l)
      fish.scale=0.2
    }
    if (keyDown("s")){
      fish.y+=5
      //fish.velocityX=0
      fish.changeImage("r",r)
      fish.scale=0.2
    }
      fish.collide(edges[0])
      fish.collide(edges[1])
      fish.collide(edges[2])
      fish.collide(edges[3])
      if (fish.collide(netGroup)){
        fish.shapeColor="black"
        lives=lives-1
        netGroup.destroyEach()
        
      }
      if(fish.collide(foodGroup)){
        fcount=fcount+1
        foodGroup.destroyEach()
      }
  }
  if(gameState==="end"){
lives=-1
textSize(50)
fill('red')
   text("Game Over",10,100)
   fish.visible=false
   replay.visible=true
   if(mousePressedOver(replay)){
     gameState='start'
     replay.visible=false
    }
  }
  
  

   fill(0)
    textSize(22)
    text('Lives:'+lives,10,20)

    text('Food collected:'+fcount,10,50)
  

if (lives===0){
   gameState='end'
}
}

function throwNet(){
  if(frameCount%30===0){
    var rx= random(20,1180)
    var ry= random(20,480)
    net= createSprite(rx,ry,100,100)
    net.lifetime=150
    netGroup.add(net)
    net.addImage(n)
  }
}
function food(){
  if(frameCount%30===0){
    var fa= random(20,1180)
    var fb= random(20,480)
    f= createSprite(fa,fb,50,50)
    f.addImage('food',fp)
    f.scale=0.4
    f.lifetime=100
    foodGroup.add(f)
   // f.debug=true
    f.setCollider("rectangle",0,50,90,250)

  }
}