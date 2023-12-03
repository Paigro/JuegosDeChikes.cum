import Manager from "../manager.js";
import CorteGalletas from "./CorteGalletas.js";

export default class Papas extends Phaser.Scene {

  constructor() {
    // Nombre de la escena para el SceneManager
    super({ key: 'Papas', active: false });

    this.time = 10;
    this.points = 0;
  }

  preload() {
    this.load.image('atras', '/assets/juego/TruthOrDare/imagenes/VolverAtras.jpg'); // Cargamos la imagen de volver atras (provisional).

    //Carga de imagenes del juego
    this.load.image('BandejaCorte', '/assets/juego/PapasGalleteria/Bandeja_1.png'); // Cargamos la imagen de volver atras (provisional).
    this.load.image('BordGallet', '/assets/juego/PapasGalleteria/Borde_Galleta.png'); // Cargamos la imagen de volver atras (provisional).
    this.load.image('MarcaGallet', '/assets/juego/PapasGalleteria/Marca_Galleta.png'); // Cargamos la imagen de volver atras (provisional).
    this.load.image('Fondo', '/assets/juego/PapasGalleteria/Fondo.png'); // Cargamos la imagen de volver atras (provisional).
  }


  create() {
    //Fondo    
    this.add.image(0, 0, 'Fondo').setScale(2, 2).setOrigin(0, 0) // el fondo
    //Boton de salir
    this.atras = this.add.image(0, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive(); // Añadimos la imagen de volver atras.
    this.atras.on('pointerdown', (pointer) => {
      this.finalDelJuego();
    });

    this.time = 10;

    // Elementos del juego
    this.bandeja1 = new CorteGalletas(this, 330, 540, 'BandejaCorte', 'MarcaGallet');
    this.bandeja2 = new CorteGalletas(this, 750, 540, 'BandejaCorte', 'MarcaGallet');


    //Bloquea la otra bandeja
    this.bandeja1.on('pointerdown', (pointer) => {
      console.log("Start b1");
      this.bandeja2.BlockThisAction();
      this.bandeja1.StartAccion();
    })
    this.bandeja2.on('pointerdown', (pointer) => {
      console.log("Start b2");
      this.bandeja1.BlockThisAction();
      this.bandeja2.StartAccion();
    })
  }

  update(time, delta) {
    //cuenta atras para acabar el juego
    if (this.time <= 0) {
      //this.finalDelJuego();
      this.time = 10;
    }
    else {
      //console.log(this.time);
      this.time -= (delta / 1000);
    }
  }

  endAction(points) {
    this.points += points;
    this.bandeja1.Reset();
    this.bandeja2.Reset();

    console.log(this.points);
  }

  //Vuelve a la escena del Hub
  finalDelJuego(puntuacion) {
    this.scene.start("Hub");
  }
}