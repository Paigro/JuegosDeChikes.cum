export default class Papas extends Phaser.Scene{

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'Papas', active: false  }); 
    }

    preload(){        
      this.load.image('atras', '/assets/juego/TruthOrDare/imagenes/VolverAtras.jpg'); // Cargamos la imagen de volver atras (provisional).
    }    
    create(){
      this.atras = this.add.image(0, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive(); // Añadimos la imagen de volver atras.
      this.add.text(100, 200, 'Escena del Papas',  { fill: '#0f0' });
      this.atras.on('pointerdown', (pointer) => {
        this.finalDelJuego();
      });
    }
    finalDelJuego(puntuacion)
{    
    this.scene.start("Hub");
}
}