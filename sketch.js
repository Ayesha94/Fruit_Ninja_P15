var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;
var monster
function preload(){
  f1=loadImage("fruit1.png");
  f2=loadImage("fruit2.png");
  f3=loadImage("fruit3.png");
  f4=loadImage("fruit4.png");
  m1=loadImage("alien1.png");
  m2=loadImage("alien2.png")
  swordImage=loadAnimation("sword.png");
  gameOver=loadAnimation("gameover.png");
  whoosh=loadSound("knifeSwooshSound.mp3")
  overSound=loadSound("gameover.mp3");
}
function setup()
{
    createCanvas(600, 600);
    fruitGroup=createGroup();
    enemyGroup=createGroup();

    sword=createSprite(40, height/2)
    sword.scale=0.8
    sword.addAnimation("sword",swordImage);
    sword.addAnimation("gameOver",gameOver);

}
function draw(){
    background("#000033");
    drawSprites();

    if(gameState==PLAY)
    {
        fruits();
        Enemy();

        sword.y=mouseY;
        sword.x=mouseX;

        if(fruitGroup.isTouching(sword))
        {
            fruitGroup.destroyEach();
            score+=2;
            whoosh.play();
        }
        if(enemyGroup.isTouching(sword))
        {
            gameState=END;
            overSound.play();
        }
        
    }
    else if(gameState==END)
    {
       
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();

        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);

        sword.changeAnimation("gameOver", gameOver);
        sword.x=width/2;
        sword.y=height/2;
    }
    fill("yellow")
    textSize(20)
    text("Score:"+score, width-100,50 )
}
function fruits()
{
    if(frameCount%100==0)
    {
        var position=Math.round(random(1,2))
        var fruit=createSprite(width, Math.round(random(20, height-20)));
        //fruit.velocityX=-6;
         
        var rand=Math.round(random(1,4));
        fruitGroup.add(fruit);
        fruit.scale=0.3;
        switch(rand)
        {
            case 1: fruit.addImage(f1);
                    break;
            case 2: fruit.addImage(f2);
                    break;
            case 3: fruit.addImage(f3);
                    break;  
            case 4: fruit.addImage(f4);
                    break; 
            default: break;                                     
        }

        if(position==1)
        {
            fruit.x=0;
            fruit.velocityX=7+(score/4);
        }
        else
        {
            fruit.x=width;
            fruit.velocityX=-7-(score/4);    
        }
        fruit.lifetime=200;
    }
}
function Enemy()
{
    if(frameCount%120==0)
    {
        monster=createSprite(width, Math.round(random(20, height-20)));
        monster.velocityX=-8-(score/10);

       
        var rand=Math.round(random(1,2));
        enemyGroup.add(monster);
        switch(rand)
        {
            case 1: monster.addImage(m1);
                    break;
            case 2: monster.addImage(m2);
                    break;
            default: break;                                      
        }
        monster.lifetime=200;
    } 
}
