class Game {
    constructor (){
    }
    getState (){
        var gamestateref = database.ref ("gamestate")
        gamestateref.on ("value",function(data){
            gameState = data.val ()
        })
    }
    update (state){
        database.ref("/").update({
            gamestate: state
        })
    }
    async start(){
        if(gameState === 0){
            player = new Player ()
            var playerCountRef = await database.ref ("playercount").once("value")
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val()
                player.getCount()
            }
            form = new Form ()
            form.display ()
        }
        car1 = createSprite(100, 200)
        car2 = createSprite(300, 200)
        car3 = createSprite(500, 200)
        car4 = createSprite(700, 200)
        car1.addImage (car1IMG)
        car2.addImage (car2IMG)
        car3.addImage (car3IMG)
        car4.addImage (car4IMG)
        cars = [car1, car2, car3, car4]
    }
    play (){
        form.disappear()
        textSize(30)
        text("Game Start", 120, 100);
        Player.getPlayerInfo()
        player.getCarsAtEnd()

        if(allPlayers!==undefined){
            background("#c68767")
            image(trackIMG,0,-displayHeight*4,displayWidth,displayHeight*5)
           var index = 0
           var x = 200
           var y
            for(var plr in allPlayers){
                index += 1 
                x = x + 200
                y = displayHeight - allPlayers[plr].distance
                cars[index-1].x=x
                cars[index-1].y=y
                if(index===player.index){
                    stroke(10)
                    fill("red")
                    ellipse(x,y,60,60)
                    cars[index-1].shapeColor = "red"
                    camera.position.x = displayWidth/2
                    camera.position.y = cars[index-1].y
                }
            }
            if(keyIsDown(UP_ARROW)&&player.index!==null){
                player.distance+=50
                player.update()
            }
            if(player.distance > 4300){
                gameState = 2
                player.rank += 1
                Player.updateCarsAtEnd(player.rank)
            }
        }
        console.log(player.distance)
        drawSprites()
    } 
    end(){
        console.log("gameEnded")
        console.log(player.rank)
    }
}