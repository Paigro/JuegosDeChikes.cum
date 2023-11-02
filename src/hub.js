import Metro from "./Metro.js";

export default class Hub extends Phaser.Scene{

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'Hub' }); 
    }
  
    create(){               
      alert("aaaa");
      this.scene.add('Metro', Metro);
      this.scene.start("Metro");

    }
    
  } 