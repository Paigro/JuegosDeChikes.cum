export default class Hub extends Phaser.Scene{

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'Hub' }); 
    }
  
    create(){               
        alert("aaaa");
    }
    
    changeScene(key) {
      
    }
  } 