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
      this.load.image('fondo', '/assets/juego/BumKlak/fondo.png'); // cargamos fondo
    }    
    create(){
      this.atras = this.add.image(0, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive(); // Añadimos la imagen de volver atras.
      //this = this.add.image(0,0, 'fondo').setOrigin(0,0).setScale(1,1);
      this.add.text(100, 200, 'Escena del BumBumClack',  { fill: '#0f0' });
      this.atras.on('pointerdown', (pointer) => {
        this.finalDelJuego();
      });
    }
    finalDelJuego()
{    
    this.scene.start("Hub");
}
}