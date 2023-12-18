export default class BumKlak extends Phaser.Scene{

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'BumKlak', active: false  }); 
    }
    
    init(data) {
      this.coor = data;
      this.cameras.main.setBackgroundColor("#99FF99");
  }

    preload(){        
      this.load.image('atras', '/assets/juego/TruthOrDare/imagenes/VolverAtras.jpg'); // Cargamos la imagen de volver atras (provisional).
      this.load.image('bocadillo', '/assets/juego/BumKlak/bocadillo.png'); // Cargamos la imagen del bocadillo
      this.load.image('cerebro', '/assets/juego/BumKlak/cerebro.png'); // Cargamos la imagen del cerebro
      this.load.image('corazon', '/assets/juego/BumKlak/corazon.png'); // Cargamos la imagen del corazón
      this.load.image('escuchador', '/assets/juego/BumKlak/persona escuchadora.png'); // Cargamos la imagen del moñeco que escucha
      this.load.image('parlanchin', '/assets/juego/BumKlak/persona parlanchina.png'); // Cargamos la imagen del moñeco que habla
    }    
    create(){
      this.atras = this.add.image(0, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive(); // Añadimos la imagen de volver atras.
      this.atras.on('pointerdown', (pointer) => {
        this.finalDelJuego();
      });
      this.escuchador = this.add.image(50, 350, 'escuchador').setOrigin(0,0).setScale(1, 1);
      this.escuchador = this.add.image(750, 350, 'parlanchin').setOrigin(0,0).setScale(0.3, 0.3);
    }
    finalDelJuego()
{    
    this.scene.start("Hub");
}
}