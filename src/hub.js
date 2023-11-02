
export default class Hub extends Phaser.Scene{

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'Hub', active: true}); 
    }
    
    preload(){
      this.load.image('ToDImage', "/assets/juego/Hub/TruthOrDare.jpg")
      this.load.image('BumClakImage', "/assets/juego/Hub/BumClack.jpg")
      this.load.image('PapasImage', "/assets/juego/Hub/Papas.jpg")
      this.load.image('Metro', "/assets/juego/Hub/Metro.jpeg")
    }

    create(){               
      this.ToDImg = this.add.image(0, 0, 'ToDImage').setOrigin(0,0).setScale(0.75,0.25)
      this.ToDImg.setInteractive().on('pointerdown', () => 
      this.scene.start("VerdadOReto")
      )
      this.BumClackImg = this.add.image(500, 0, 'BumClakImage').setOrigin(0,0).setScale(0.5)
      this.BumClackImg.setInteractive().on('pointerdown', () => 
      this.scene.start("BumKlak")
      )
      this.PapasImg = this.add.image(0, 300, 'PapasImage').setOrigin(0,0).setScale(0.5)
      this.PapasImg.setInteractive().on('pointerdown', () => 
      this.scene.start("Papas")
      )
      this.PapasImg = this.add.image(500, 300, 'Metro').setOrigin(0,0).setScale(0.3)
      this.PapasImg.setInteractive().on('pointerdown', () => 
      this.scene.start("Metro")
      )

    }
    
  } 