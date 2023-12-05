import Coordinator from "./coordinator.js";

export default class Hub extends Phaser.Scene {

  constructor() {
    // Nombre de la escena para el SceneManager
    super({ key: 'Hub', active: true });
    
    //coordinator
    this.coordinator = new Coordinator(this);
  }
  init(){
    this.coordinator.CalcularPersonalidad();
  }
  preload() {
    this.load.image('ToDImage', "assets/Bocetos/TruthOrDare.PNG")
    this.load.image('BumClakImage', "assets/Bocetos/BumBumKlak.PNG")
    this.load.image('PapasImage', "assets/Bocetos/PappasGalleteria.PNG")
    this.load.image('Metro', "assets/Bocetos/MetroSkaters.PNG")
  }

  create() {
    this.ToDImg = this.add.image(0, 0, 'ToDImage').setOrigin(0, 0).setScale(1, 0.71)
    this.ToDImg.setInteractive().on('pointerdown', () =>
      this.scene.start("VerdadOReto", this.coordinator)
    )
    this.BumClackImg = this.add.image(500, 0, 'BumClakImage').setOrigin(0, 0).setScale(.8)
    this.BumClackImg.setInteractive().on('pointerdown', () =>
      this.scene.start("BumKlak", this.coordinator)
    )
    this.PapasImg = this.add.image(0, 300, 'PapasImage').setOrigin(0, 0).setScale(.8)
    this.PapasImg.setInteractive().on('pointerdown', () =>
      this.scene.start("Papas", this.coordinator)
    )
    this.PapasImg = this.add.image(500, 300, 'Metro').setOrigin(0, 0).setScale(.8)
    this.PapasImg.setInteractive().on('pointerdown', () =>
      this.scene.start("Metro", this.coordinator)
    )

  }

  personalidad(pers){
    console.log(pers)
  }

} 