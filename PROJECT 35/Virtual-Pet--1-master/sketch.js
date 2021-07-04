//Create variables here
var dog, happyDog, database;
var food,foodStock;
var dog_img,happyDog_img;

function preload(){
	//load images here
  dog_img= loadImage("images/dogImg.png");
  happyDog_img= loadImage("images/dogImg1.png");

}

function setup() {
	createCanvas(500, 500);
  database= firebase.database();
  
  dog= createSprite(230,100);
  dog.addImage("dog",dog_img);
  dog.scale=0.15;

 // happyDog=createSprite(200,200);
  //happyDog.addImage("happyDog",happyDog_img);
  //happyDog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);


}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(happyDog_img);
  }

  drawSprites();
  //add styles here
  
  textSize(13);
  fill("white");
  text("food remaining :"+food,170,200)
  text("press up arrow key to feed dragomilk",130 ,10,300,20)

}

function readStock(data){
  food=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0
  } else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}

