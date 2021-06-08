const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var arrow;

var rope;

var score = 0;

function preload()
{
 bg = loadImage("Images/Background.jpg");
 boyImg = loadImage("Images/Boy.png");
 shieldImg = loadImage("Images/Archery Shield.jpg");
 arrowImg = loadImage("Images/Arrow.png");
 D1Img = loadImage("Images/D1.jpg");
 D2Img = loadImage("Images/D2.png");
}

function setup()
{
  engine = Engine.create();
  world = engine.world;

  var options={
    isStatic : true
  }


  //arrow = Bodies.rectangle(295,320,135,50,options);

  //World.add(world,arrow);

 // Matter.Body.setAngle(arrow,PI);

 arrow = new Arrow(290,315,165,120,PI/2);

 d1 = new D1(720,100,100,100);

 d2 = new D2(1040,240,100,100);

 d3 = new D3(850,410,200,300);
 

 rope = new SlingShot(arrow.body,{x:290,y:315});

 rope1 = new SlingShot(d1.body,{x:766,y:60});

 rope2 = new SlingShot(d2.body,{x:1040,y:200});

 //rope3 = new SlingShot(d3.body,{x:860,y:360});
  
  
  
  
  createCanvas(1275,600);
  boy = createSprite(250, 400);
  boy.addImage(boyImg);
  boy.scale = 0.6;

  //shield = createSprite(950,375);
  //shield.addImage(shieldImg);
  //shield.scale = 0.8;
}

function draw() 
{
  Engine.update(engine);

  background(bg);  
  drawSprites();
  fill("Black");
  textSize(35);
  text("Score : "+ score,25,35);
  text("x : "+mouseX+"y :"+mouseY,mouseX,mouseY);


  arrow.display();

  rope1.display();

  d1.display();

  rope2.display();

  d2.display();

  //rope3.display();

  d3.display();



  var collision = Matter.SAT.collides(arrow.body,d1.body);
  if(collision.collided)
  {
    score = score + 50;
  }

  var collision1 = Matter.SAT.collides(arrow.body,d2.body);
  if(collision1.collided)
  {
    score = score + 100;
  }

  var collision2 = Matter.SAT.collides(arrow.body,d3.body);
  if(collision2.collided)
  {
    score = score + 25;
  }

  //imageMode(CENTER)
 // image(arrowImg,arrow.position.x,arrow.position.y,175,120);
}

function mouseDragged()
{
  //if (gameState!=="launched"){
      Matter.Body.setPosition(arrow.body, {x: mouseX , y: mouseY});
  //}
}

function mouseReleased()
{
    rope.fly();
}

function keyPressed()
{
  if(keyCode===32)
  {
      rope.attach(arrow.body);
      Matter.Body.setPosition(arrow.body,{x:290,y:315})
  }
}