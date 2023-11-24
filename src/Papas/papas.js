import Manager from "../manager.js";
import CorteGalletas from "./CorteGalletas.js";

export default class Papas extends Phaser.Scene{

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'Papas', active: false  }); 
    }

    preload(){        
      this.load.image('atras', '/assets/juego/TruthOrDare/imagenes/VolverAtras.jpg'); // Cargamos la imagen de volver atras (provisional).

      //Carga de imagenes del juego
      this.load.image('BandejaCorte', '/assets/juego/PapasGalleteria/Bandeja_1.png'); // Cargamos la imagen de volver atras (provisional).
      this.load.image('BordGallet', '/assets/juego/PapasGalleteria/Borde_Galleta.png'); // Cargamos la imagen de volver atras (provisional).
      this.load.image('MarcaGallet', '/assets/juego/PapasGalleteria/Marca_Galleta.png'); // Cargamos la imagen de volver atras (provisional).
      this.load.image('Fondo', '/assets/juego/PapasGalleteria/Fondo.png'); // Cargamos la imagen de volver atras (provisional).
    }    
    create(){
      //Fondo    
	  	this.add.image(0, 0, 'Fondo').setScale(2, 2).setOrigin(0, 0) // el fondo
      //Boton de salir
      this.atras = this.add.image(0, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive(); // Añadimos la imagen de volver atras.
      this.atras.on('pointerdown', (pointer) => {
        this.finalDelJuego();
      });

      // Elementos del juego
      let bandeja1 = new CorteGalletas(this,330,540,'BandejaCorte', 'MarcaGallet');
      let bandeja2 = new CorteGalletas(this,750,540,'BandejaCorte', 'MarcaGallet');
      this.papasManager = new Manager(this.bandeja1, this.bandeja2);
      bandeja1.Manager = this.papasManager;
      bandeja2.Manager = this.papasManager;
    }

    update(time, delta){
      //console.log($('canvas').height());
      //Control del reloj del juego
      this.papasManager.UpdateTime(delta/1000);

      //Control final del juego
      if(this.papasManager.ReturnEndGame == true){
        this.finalDelJuego(this.papasManager.score);
      }
    }

    //Vuelve a la escena del Hub
    finalDelJuego(puntuacion)
    {    
      this.scene.start("Hub");
    }
}