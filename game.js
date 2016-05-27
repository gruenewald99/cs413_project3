var gameport = document.getElementById("gameport");
var renderer = PIXI.autoDetectRenderer(608,608, {BackgroundColor: 0x3344ee});

var stage = new PIXI.Container();
var player = new PIXI.Container();

PIXI.loader
  .add('assets.json')
  .add('map','map.json')
  .add('tiles','map.png')
  .load(ready);
  function ready()
  {
  var tu =new TileUtilities(PIXI);
  world = tu.makeTiledWorld("map", 'map.png');
  stage.addChild(world);


  player.moving_frame = new PIXI.Sprite.fromFrame("leroy2.png");
  player.still_frame = new PIXI.Sprite.fromFrame("leroy1.png");
  player.addChild(player.moving_frame);
  player.addChild(player.still_frame);
  player.moving_frame.visible = false;
  player.position.x = 540;
  player.position.y = 580;


  var entity_layer = world.getObject("Tile Layer 1");
  entity_layer.addChild(player);
    animate();
  }
gameport.appendChild(renderer.view);

var world;
var player;



  function move_player() {
    player.moving_frame.visible = true;
    player.still_frame.visible = false;
    // do any other move logic
  }

  function still_player() {
    player.moving_frame.visible = false;
    player.still_frame.visible = true;
    // do any other still logic
  }

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
function animate(timestamp) {
  requestAnimationFrame(animate);
  renderer.render(stage);
}
function onKeyUp(key)
{
  still_player();


}
function onKeyDown(key)
{
  move_player();
 if(key.keyCode ===87 || key.keyCode === 38)
 {
   //checks to make sure you arent at the edge of the world
   if(player.position.y >= 0)
   {
     player.position.y -=20;

   }
 }
   if (key.keyCode === 83 || key.keyCode === 40)
   {
       //checks to make sure you arent at the edge of the world
       if(player.position.y <= 560)
       {
           player.position.y += 20;
       }

   }
   //65 and 37 are A and the left arrow in ascii
   if (key.keyCode === 65 || key.keyCode === 37)
   {
       //checks to make sure you arent at the edge of the world
       if (player.position.x >= 10)
       {//moves player
           player.position.x -= 20;
       }
   }

   // D Key is 68
   // Right arrow is 39
   if (key.keyCode === 68 || key.keyCode === 39)
   {
       //checks to make sure you arent at the edge of the world
       if (player.position.x <= 560)
       {
           // Don't move to the right if the player is at the right side of the stage
           player.position.x += 20;
       }
   }//end of keydown
}
