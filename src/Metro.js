import Hub from "./hub.js";

export default class Metro extends Phaser.Scene {

    constructor() {
        // Nombre de la escena para el SceneManager
        super({ key: 'Metro', active: false }); 
    }
  
    // Métodos init, preload, create, update
    preload(){        
		this.load.image("beluga", "/assets/juego/TruthOrDare/imagenes/Beluga2.png");
    }    
    create(){               
        this.cosaClickeable = this.add.image(0, 0, "beluga").setInteractive().on('pointerdown', () => 
            this.scene.start("Hub")
            //alert("sssssssss")
        )
        
        
    }
    
   } 