import Hub from "./hub.js";
import Metro from "./Metro.js";

const config = {
  width: 1080,              
  height: 720,            
  parent: "game",
  type: Phaser.AUTO,      
  scene: [Hub]
}

var game = new Phaser.Game(config);