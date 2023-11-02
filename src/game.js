import Hub from "./hub.js";
import Metro from "./Metro.js";
import TruthOrDare from "./VerdadReto.js";
import Papas from "./papas.js";
import BumBumClack from "./bumKlak.js";

const config = {
  width: 1080,              
  height: 720,            
  parent: "game",
  type: Phaser.AUTO,      
  scene: [Hub, TruthOrDare, Metro, Papas, BumBumClack]
}

var game = new Phaser.Game(config);