import Metro from "./Metro.js";

export default class Hub extends Phaser.Scene{

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'Hub', active: true}); 
    }
    
    preload(){
      this.load.image('ToDImage', "/assets/juego/Hub/TruthOrDare.png")
    }

    create(){               
      alert("aaaa");
      this.ToDImg = this.add.image(0, 0, 'ToDImage').setInteractive().on('pointerdown', () => 
      this.scene.start("VerdadOReto")
      )

    }
    
  } 