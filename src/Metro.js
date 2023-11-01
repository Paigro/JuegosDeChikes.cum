export default class Metro extends Phaser.Scene {

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'Metro' }); 
    }
  
    // Métodos init, preload, create, update
    preload(){        
		this.load.image("se", "Beluga2.png");
    }    
    create(){               
        this.baner = this.add.image(0, 0, "se").setScale(3);
    }
    
  } 