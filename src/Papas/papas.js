import Manager from "../manager.js";
import CorteGalletas from "./CorteGalletas.js";

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
      let bandeja1 = new CorteGalletas();
      let bandeja2 = new CorteGalletas();
      this.papasManager = new Manager(bandeja1, bandeja2);
      this.papasManager.ResetActions();
    }

    update(time, delta){
      this.papasManager.UpdateTime(delta/1000);
      if(this.papasManager.ReturnEndGame == true){
        this.finalDelJuego(this.papasManager.score);
      }
    }

    finalDelJuego(puntuacion)
{    
    this.scene.start("Hub");
}
}