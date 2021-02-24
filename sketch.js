var aliens, p;
var fruit, fruitGroup, pp;
var levelup, levelupImage;
var  alien1Image;
var  alien2Image;
var  fruit1Image; 
var  fruit2Image;
var  fruit3Image;
var  fruit4Image;
var gameOverImage,gameOver,  gameOverSound;
var sword, swordImage, swordSound;
var score = 0;
var PLAY = 1;
var END= 0;

var gameState = PLAY;

function preload(){
    alien1Image = loadImage ("alien1.png");
    alien2Image = loadImage ("alien2.png");
    fruit1Image = loadImage ("fruit1.png");
    fruit2Image = loadImage ("fruit2.png");
    fruit3Image = loadImage ("fruit3.png");
    fruit4Image = loadImage ("fruit4.png");
    gameOverImage = loadImage ("gameover.png");
    swordImage = loadImage ("knife.png")
  gameOverSound = loadSound ("gameover.mp3");
    swordSound = loadSound("knifeSwoosh.mp3");
   levelupImage = loadImage ("level up.png");
  }

function setup(){
    createCanvas(400, 400);

    sword = createSprite (50, 200, 20, 20);
    sword.addImage("sword", swordImage);
    sword.scale = 0.5;

    alienGroup  = createGroup();

  fruitGroup = createGroup();

    score = 0;
}

function draw(){
  background("black");
    sword.y = World.mouseY;
    sword.x= World.mouseX;

    sword.depth = sword.depth+1;

    if(gameState === PLAY){
  fruits();

       monsters();   

    if(fruitGroup.isTouching(sword)){
       fruitGroup.destroyEach();
      score = score + 5;
        swordSound.play();
       }


         if(score % 100 === 0 && score>0){
         levelup = createSprite (200, 200, 40, 40);
        levelup.addImage ("level up", levelupImage);
        levelup.scale = 0.5;
           levelup.lifetime = 2;
         }

        if(alienGroup.isTouching(sword)){
         gameState = END;
          gameOver = createSprite (200, 200, 40, 40);
          gameOver.addImage("gameOver", gameOverImage);
          gameOver.lifetime = -1;
         gameOverSound.play();
       }



    }

    else if(gameState === END){

            score = 0;
     
       alienGroup.setLifetimeEach(0);
      fruitGroup.setLifetimeEach(0);



            }
    drawSprites();

    word();
       }

  function word(){
    fill("white");
     text ("Score :" +score, 300, 20);

    fill("white");
    text("Be aware of the aliens👾👽", 20, 20);

    console.log("Check a surprise after every 100 points");
   } 
 
function fruits(){
    if(World.frameCount % 40 == 0){
  fruit = createSprite (200, 200, 20, 20);
    fruit.scale = 0.2;

      r = Math.round (random(1,4))

      if(r === 1){
         fruit.addImage(fruit1Image);

         }else if(r === 2){
           fruit.addImage(fruit2Image);
         } else if(r === 3){
           fruit.addImage(fruit3Image);
         } else if(r === 4){
           fruit.addImage(fruit4Image);
         }
      fruit.y = Math.round(random(50,350));
      pp = Math.round(random(1,2));
      if(pp === 1){
         fruit.x = 400;
        fruit.velocityX = -(6 + score / 100);
         } else if(pp === 2){
           fruit.x = 0;
           fruit.velocityX = +(6 + score / 100);
         }
      fruit.setLifetime= 100;

       
   fruitGroup.add(fruit);
  }    
  
  
}  
 
function monsters(){
     if(World.frameCount % 200 == 0){
       aliens = createSprite(200, 200, 20, 20);

      var sa = Math.round(random(1,2));

       if(sa == 1){
          aliens.addImage(alien1Image);
          }
       if(sa == 2){
          aliens.addImage(alien2Image);
          }
        aliens.y = Math.round(random(50,350));

       p = Math.round(random(1,2));

       if(p === 1){
         aliens.x = 400;
        aliens.velocityX = -(6 + score / 100);
         } else if(p === 2){
           aliens.x = 0;
           aliens.velocityX = +(6 + score / 100);
         }

       aliens.setLifetime= 100;


   alienGroup.add(aliens);
     }

}

