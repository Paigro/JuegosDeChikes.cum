import Hub from "./hub.js";
import Metro from "./Metro.js";
import TruthOrDare from "./VerdadReto.js";

const config = {
  width: 1080,              
  height: 720,            
  parent: "game",
  type: Phaser.AUTO,      
  scene: [Hub, TruthOrDare, Metro]
}

var game = new Phaser.Game(config);