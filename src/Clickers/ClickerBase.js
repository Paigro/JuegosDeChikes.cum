export default class Clicker extends Phaser.Scene {

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'Clicker', active: false });
    }
    init() {
      this.personalidad("");
    }
    preload() {
        
    }
  
    create() {}
}