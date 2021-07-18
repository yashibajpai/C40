var database;
var gameState = 0
var playerCount;
var form, player, game
var allPlayers
var car1, car2, car3, car4, cars
var car1IMG, car2IMG, car3IMG, car4IMG, groundIMG, trackIMG

function preload (){
    car1IMG = loadImage ("images/car1.png") 
    car2IMG = loadImage ("images/car2.png")
    car3IMG = loadImage ("images/car3.png")
    car4IMG = loadImage ("images/car4.png")  
    groundIMG = loadImage ("images/ground.png")
    trackIMG = loadImage ("images/track.jpeg")
}
function setup(){
    createCanvas(displayWidth -20, displayHeight -30);
    database = firebase.database()
    game = new Game()
    game.getState()
    game.start()
}

function draw(){
if(playerCount === 4){
    game.update(1)
} 
if(gameState === 1){
    clear()
    game.play()
}  
 if(gameState === 2){
     game.end()
 }   
}

