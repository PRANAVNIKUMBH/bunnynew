const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

function preload(){
  bg = loadImage("images/background.png")
  fruitimg = loadImage("images/melon.png")
  bunnyimg = loadImage('images/Rabbit-01.png')
  blinkani = loadAnimation('images/blink_1.png','images/blink_2.png','images/blink_3.png')
  eatani = loadAnimation('images/eat_0.png','images/eat_1.png','images/eat_2.png','images/eat_3.png','images/eat_4.png')
  sadani = loadAnimation('images/sad_1.png','images/sad_2.png','images/sad_3.png')
  bgs = loadSound('images/sound1.mp3')
  ss = loadSound('images/sad.wav')
  cs = loadSound('images/rope_cut.mp3')
  es = loadSound('images/eating_sound.mp3')
  ais = loadSound('images/air.wav')
}


function setup() 
{
  createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;
  rope = new Rope(5,{x:250,y:30})
  rope2 = new Rope(7,{x:400,y:30})
  rope3 = new Rope(10,{x:150,y:70})

  fruit = Bodies.circle(250,50,25)
  World.add(world,fruit)

  blinkani.frameDelay=10
  eatani.frameDelay=100
  eatani.looping=false
  
  sadani.frameDelay = 40
  sadani.looping = false
  bunny = createSprite(320,600)
  bunny.addAnimation('blink',blinkani)
  bunny.addAnimation('eat',eatani)
  bunny.addAnimation('sad',sadani)

  bunny.scale = 0.2
  bgs.play()
  bgs.setVolume(0.1)
  air = createImg('images/balloon.png')
  air.position(10,150)
  air.size(150,100)
  air.mouseClicked(function(){
    Matter.Body.applyForce(fruit,fruit.position,{x:0.01,y:0})
    if(bgs.isPlaying()){
      ais.play()
     } else {
       ais.stop()
     }
  })
  
  mb = createImg('images/mute.png')
  mb.position(450,20)
  mb.size(50,50)
  mb.mouseClicked(function(){
    if(bgs.isPlaying()){
      bgs.stop()
    }else{
      bgs.play()
    }

    
  })
  cut = createImg("images/cut_btn.png")
  cut.position(250,30)
  cut.size(50,50)
  cut.mouseClicked(function(){
    rope.break()
    link.remove()
    if(bgs.isPlaying()){
      cs.play()
     } else {
       cs.stop()
     }
  })

  cut2 = createImg("images/cut_btn.png")
  cut2.position(400,30)
  cut2.size(50,50)
  cut2.mouseClicked(function(){
    rope2.break()
    link2.remove()
    if(bgs.isPlaying()){
      cs.play()
     } else {
       cs.stop()
     }
  })

  cut3 = createImg("images/cut_btn.png")
  cut3.position(150,70)
  cut3.size(50,50)
  cut3.mouseClicked(function(){
    rope3.break()
    link3.remove()
    if(bgs.isPlaying()){
      cs.play()
     } else {
       cs.stop()
     }
    }) 

  link=new Link(rope,fruit)
  link2=new Link(rope2,fruit)
  link3=new Link(rope3,fruit)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}


function draw() 
{
  background(bg);
  Engine.update(engine);
  rope.display()
  rope2.display()
  rope3.display()
  
  if(fruit!==null){
   push()
   imageMode(CENTER)
   image(fruitimg,fruit.position.x,fruit.position.y,100,100)
   pop()
  //dist(x1,y1,x2,y2)
  
   if (dist(fruit.position.x,fruit.position.y,bunny.position.x,bunny.position.y)<80){
     bunny.changeAnimation('eat',eatani)
     World.remove(world,fruit)
     fruit = null
     if(bgs.isPlaying()){
      es.play()
     } else {
       es.stop()
     }
     
  }
  }
  if(fruit !== null&&fruit.position.y>650){
    bunny.changeAnimation('sad',sadani)
    if(bgs.isPlaying()){
      ss.play()
     } else {
       ss.stop()
     }
  }
  drawSprites()
}





