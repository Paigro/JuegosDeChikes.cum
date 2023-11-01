export default class Hub extends Phaser.Scene {

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'hub' }); 
    }
  
    // Métodos init, preload, create, update
    preload(){        
		this.load.image('banner', 'assets/pagina/images/banner.jpg');
    }    
    create(){               
		this.add.image(0, 0, 'banner').setOrigin(0, 0);
    }
    
  } 