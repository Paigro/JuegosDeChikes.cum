import Hub from "./hub.js";
import Metro from "./Metro/Metro.js";
import TruthOrDare from "./VerdadReto.js";
import Papas from "./Papas/papas.js";
import BumBumClack from "./Bum Bum Klak/bumKlak.js";
import AbogadoClick from "./Clickers/AbogadoClick.js";
import resultadoTest from "./resultadoTest.js";

const config = {
  width: 1080,              
  height: 720,            
  parent: "game",
  type: Phaser.AUTO,      
  scene: [Hub, TruthOrDare, Metro, Papas, BumBumClack, AbogadoClick, resultadoTest],
  physics: { 
    default: 'arcade', 
    arcade: { 
        debug: false 
    },
    checkCollision: {
        up: true,
        down: true,
        left: true,
        right: true
    }
}
}

var game = new Phaser.Game(config);