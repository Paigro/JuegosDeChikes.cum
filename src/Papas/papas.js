import coordinator from "../coordinator.js";
import CorteGalletas from "./CorteGalletas.js";
import GlaseadoGalletas from "./GlaseadoGalletas.js";

export default class Papas extends Phaser.Scene {

  constructor() {
    // Nombre de la escena para el SceneManager
    super({ key: 'Papas', active: false });

    this.time = 10;
    this.points = 0;
  }

  init(data) {
    this.coor = data;
    //console.log(this.coor);
    console.log(data);
  }

  preload() {
    this.load.image('atras', '/assets/juego/TruthOrDare/imagenes/VolverAtras.jpg'); // Cargamos la imagen de volver atras (provisional).

    //Carga de imagenes del juego
    this.load.image('BandejaCorte', '/assets/juego/PapasGalleteria/Bandeja_1.png'); // Cargamos la imagen de volver atras (provisional).
    this.load.image('BordGallet', '/assets/juego/PapasGalleteria/Borde_Galleta.png'); // Cargamos la imagen de volver atras (provisional).
    this.load.image('MarcaGallet', '/assets/juego/PapasGalleteria/Marca_Galleta.png'); // Cargamos la imagen de volver atras (provisional).
    this.load.image('BandejaGlased', '/assets/juego/PapasGalleteria/Bandeja_Base.png'); // Cargamos la imagen de volver atras (provisional).
    this.load.image('GlaseadoGallet', '/assets/juego/PapasGalleteria/Glaseado_Galleta.png'); // Cargamos la imagen de volver atras (provisional).
    this.load.image('FondoD', '/assets/juego/PapasGalleteria/FondoDer.png'); // Cargamos la imagen de volver atras (provisional).
    this.load.image('FondoI', '/assets/juego/PapasGalleteria/FondoIzq.png'); // Cargamos la imagen de volver atras (provisional).
  }


  create() {
    //Fondo    
    this.fondoD = this.add.image(540, 720, 'FondoD').setOrigin(0, 1) // el fondo
    this.fondoI = this.add.image(0, 0, 'FondoI').setOrigin(0, 0) // el fondo

    this.tweenFondD1();
    this.tweenFondI1();

    //Boton de salir
    this.atras = this.add.image(0, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive(); // Añadimos la imagen de volver atras.
    this.atras.on('pointerdown', (pointer) => {
      this.finalDelJuego();
    });

    //Propiedades
    this.time = 10;
    this.endRound = false;

    // Elementos del juego
    this.bandeja1 = new CorteGalletas(this, 300, 540, 'BandejaCorte', 'MarcaGallet');
    this.bandeja2 = new GlaseadoGalletas(this, 800, 540, 'BandejaGlased', 'GlaseadoGallet');


    //Bloquea la otra bandeja
    this.bandeja1.on('pointerdown', (pointer) => {
      console.log("Start b1");
      this.bandeja2.BlockThisAction();
      this.bandeja1.StartAccion();
      this.endRound = false;
      this.tweenFondD2();
      this.tweenFondI2();
    })

    this.bandeja2.on('pointerdown', (pointer) => {
      console.log("Start b2");
      this.bandeja1.BlockThisAction();
      this.bandeja2.StartAccion();
      this.endRound = false;
      this.tweenFondD2();
      this.tweenFondI2();
    })
  }

  update(time, delta) {
    this.bandeja2.updateGlassed(delta);
    //cuenta atras para acabar el juego
    if (this.time <= 0) {
      if (this.endRound && this.points != 0) {
        this.time = 10;
        this.finalDelJuego();
      } else {
        this.endRound = false;
      }
      //console.log(this.time);
      //console.log(this.endRound);
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

    this.tweenFondD3();
    this.tweenFondI3();

    this.endRound = true
  }

  tweenFondI1() {
    this.tweens.add
      ({
        targets: this.fondoI,
        y: 0,          // Valor final de la posición en x
        duration: 500,  // Duración de la animación en milisegundos
        ease: 'Linear',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        yoyo: false,      // Hacer que la animación vuelva hacia atrás al final
        repeat: 0,    // Repetir infinitamente
        persist: true

      })
  }
  tweenFondI2() {
    this.tweens.add
      ({
        targets: this.fondoI,
        y: -720,          // Valor final de la posición en x
        duration: 500,  // Duración de la animación en milisegundos
        ease: 'Linear',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        yoyo: false,      // Hacer que la animación vuelva hacia atrás al final
        repeat: 0,    // Repetir infinitamente
        persist: true

      })
  } tweenFondI3() {
    this.tweens.add
      ({
        targets: this.fondoI,
        y: -1440,          // Valor final de la posición en x
        duration: 50,  // Duración de la animación en milisegundos
        ease: 'Linear',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        yoyo: false,      // Hacer que la animación vuelva hacia atrás al final
        repeat: 0,    // Repetir infinitamente
        persist: true

      })
      
    this.tweens.add
    ({
      targets: this.fondoI,
      y: -1440, 
      delay:500,         // Valor final de la posición en x
      duration: 500,  // Duración de la animación en milisegundos
      ease: 'Linear',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
      yoyo: false,      // Hacer que la animación vuelva hacia atrás al final
      repeat: 0,    // Repetir infinitamente
      persist: true

    })
  }
  tweenFondD1() {
    this.tweens.add
      ({
        targets: this.fondoD,
        y: 720,          // Valor final de la posición en x
        duration: 500,  // Duración de la animación en milisegundos
        ease: 'Linear',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        yoyo: false,      // Hacer que la animación vuelva hacia atrás al final
        repeat: 0,    // Repetir infinitamente
        persist: true

      })
  }
  tweenFondD2() {
    this.tweens.add
      ({
        targets: this.fondoD,
        y: 1440,          // Valor final de la posición en x
        duration: 500,  // Duración de la animación en milisegundos
        ease: 'Linear',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        yoyo: false,      // Hacer que la animación vuelva hacia atrás al final
        repeat: 0,    // Repetir infinitamente
        persist: true

      })
  }
  tweenFondD3() {
    this.tweens.add
      ({
        targets: this.fondoD,
        y: 2160,          // Valor final de la posición en x
        duration: 500,  // Duración de la animación en milisegundos
        ease: 'Linear',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        yoyo: false,      // Hacer que la animación vuelva hacia atrás al final
        repeat: 0,    // Repetir infinitamente
        persist: true

      })
      
  }

  //Vuelve a la escena del Hub
  finalDelJuego() {
    console.clear();
    this.coor.SaveScore("EspOrg", this.points);
    this.points = 0;
    this.scene.start("Hub");
  }
}