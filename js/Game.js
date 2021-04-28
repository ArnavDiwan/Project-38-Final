class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car = createSprite(50, 200, 20, 30);
    bike = createSprite(700, 200, 20, 30);
    cars = [car, bike];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
  
      var index = 0;

      var x = 0;
      var y;

      for(var plr in allPlayers){
        
        index = index + 1 ;

        x = x + 500;
        
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
      
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    drawSprites();
  }
}
