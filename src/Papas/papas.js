import coordinator from "../coordinator.js";
import CorteGalletas from "./CorteGalletas.js";
import GlaseadoGalletas from "./GlaseadoGalletas.js";

export default class Papas extends Phaser.Scene {

  constructor() {
    // Nombre de la escena para el SceneManager
    super({ key: 'Papas', active: false });

    this.time = 100;
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
    this.load.image('Fondo', '/assets/juego/PapasGalleteria/FondoDer.png'); // Cargamos la imagen de volver atras (provisional).
    //this.load.image('FondoI', '/assets/juego/PapasGalleteria/FondoIzq.png'); // Cargamos la imagen de volver atras (provisional).
  }


  create() {
    //Fondo    
    this.fondoD = this.add.image(540, 0, 'Fondo').setOrigin(0, 0) // el fondo
    this.fondoI = this.add.image(0, -1440, 'Fondo').setOrigin(0, 0) // el fondo

    //Boton de salir
    this.atras = this.add.image(0, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive(); // Añadimos la imagen de volver atras.
    this.atras.on('pointerdown', (pointer) => {
      this.finalDelJuego();
    });

    //Propiedades
    this.time = 1000;
    this.endRound = false;

    // Elementos del juego
    this.bandeja1 = new CorteGalletas(this, 300, 800, 'BandejaCorte', 'MarcaGallet');
    this.bandeja2 = new GlaseadoGalletas(this, 800, 300, 'BandejaGlased', 'GlaseadoGallet').setScale(0.5, 0.1).setAlpha(0.01);
    this.tweenFondD1();
    this.tweenFondI1();


    //Bloquea la otra bandeja
    this.bandeja1.on('pointerdown', (pointer) => {
      console.log("Start b1");
      this.bandeja2.BlockThisAction();
      this.bandeja1.StartAccion();
      this.endRound = false;
    })

    this.bandeja2.on('pointerdown', (pointer) => {
      console.log("Start b2");
      this.bandeja1.BlockThisAction();
      this.bandeja2.StartAccion();
      this.endRound = false;
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
    //Reseteo logica
    this.points += points;
    this.bandeja1.Reset();
    this.bandeja2.Reset();
    this.endRound = true

    //Reseteo animaciones
    this.tweenFondD3();
    this.tweenFondI3();
    
  }
//#region tweens
//#region Izquierdo
  tweenFondI1() {
    this.tweens.add
      ({
        targets: this.fondoI,
        delay: 0,
        y: -1440,          // Valor final de la posición en x
        duration: 300,  // Duración de la animación en milisegundos
        ease: 'cubic',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        repeat: 0,    // Repetir infinitamente
        persist: true,
        onEnd: (() => {
          this.tweenFondI2();
        })

      })

  }

  tweenFondI2() {
    this.tweens.add
      ({
        targets: this.bandeja1,
        delay: 900,
        y: 430,          // Valor final de la posición en x
        alpha: 1,
        scaleX: 0.75,
        scaleY: 0.75,
        duration: 400,  // Duración de la animación en milisegundos
        ease: 'cubic',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        repeat: 0,    // Repetir infinitamente
        persist: true

      })
    this.tweens.add
      ({
        targets: this.fondoI,
        delay: 1000,
        y: -720,          // Valor final de la posición en x
        duration: 400,  // Duración de la animación en milisegundos
        ease: 'cubic',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        repeat: 0,    // Repetir infinitamente
        persist: true

      })
  }
  tweenBandejaIFuera() {
    this.tweens.add
      ({
        targets: this.bandeja1,
        x: -300,          // Valor final de la posición en x
        alpha: 0.01,
        duration: 300,  // Duración de la animación en milisegundos
        ease: 'Cubic',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        yoyo: false,      // Hacer que la animación vuelva hacia atrás al final
        repeat: 0,    // Repetir infinitamente
        persist: true

      })

  } tweenFondI3() {
    //Parte de abajo
    this.tweens.add
      ({
        targets: this.fondoI,
        y: 0,          // Valor final de la posición en x
        duration: 300,  // Duración de la animación en milisegundos
        ease: 'Linear',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        repeat: 0,    // Repetir infinitamente
        persist: true

      })
      // bandeja sale
    this.tweens.add
      ({
        targets: this.bandeja1,
        y: 300,
        scaleX: 0.5,
        scaleY: 0.1,
        alpha: 0.01,
        duration: 300,  // Duración de la animación en milisegundos
        ease: 'cubic',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        repeat: 0,    // Repetir infinitamente
        persist: true

      })
      //resetea posicion bandeja
    this.tweens.add
      ({
        targets: this.bandeja1,
        delay: 700,
        y: 800,
        x: 275,
        duration: 700,  // Duración de la animación en milisegundos
        ease: 'cubic',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        repeat: 0,    // Repetir infinitamente
        persist: true,
        onEnd: (() => {
          this.tweenFondI1();
        })

      })
  }
  //#endregion
  
//#region Derecho
  tweenFondD1() {
    this.tweens.add
      ({
        targets: this.fondoD,
        delay: 0,
        y: 0,
        duration: 300,  // Duración de la animación en milisegundos
        ease: 'cubic',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        repeat: 0,    // Repetir infinitamente
        persist: true,
        onEnd: (() => {
          this.tweenFondD2();
        })

      })
  }
  tweenFondD2() {
    this.tweens.add
      ({
        targets: this.bandeja2,
        delay: 900,
        y: 430,          // Valor final de la posición en x
        alpha: 1,
        scaleX: 0.75,
        scaleY: 0.75,
        duration: 400,  // Duración de la animación en milisegundos
        ease: 'cubic',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        repeat: 0,    // Repetir infinitamente
        persist: true

      })
    this.tweens.add
      ({
        targets: this.fondoD,
        delay: 1000,
        y: -720,          // Valor final de la posición en x
        duration: 400,  // Duración de la animación en milisegundos
        ease: 'cubic',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        repeat: 0,    // Repetir infinitamente
        persist: true

      })
  }
  tweenBandejaDFuera() {
    this.tweens.add
      ({
        targets: this.bandeja2,
        x: 1380,          // Valor final de la posición en x
        alpha: 0.01,
        duration: 300,  // Duración de la animación en milisegundos
        ease: 'Cubic',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        repeat: 0,    // Repetir infinitamente
        persist: true

      })
  }
  tweenFondD3() {
    //Parte de abajo
    this.tweens.add
      ({
        targets: this.fondoD,
        y: -1440,          // Valor final de la posición en x
        duration: 300,  // Duración de la animación en milisegundos
        ease: 'Linear',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        repeat: 0,    // Repetir infinitamente
        persist: true

      })
      // bandeja sale
    this.tweens.add
      ({
        targets: this.bandeja2,
        y: 900,          // Valor final de la posición en x
        alpha: 0.01,
        duration: 300,  // Duración de la animación en milisegundos
        ease: 'cubic',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        repeat: 0,    // Repetir infinitamente
        persist: true

      })
      //resetea posicion bandeja
    this.tweens.add
      ({
        targets: this.bandeja2,
        delay: 700,
        y: 300,
        x: 800,
        scaleX: 0.5,
        scaleY: 0.1,
        duration: 700,  // Duración de la animación en milisegundos
        ease: 'cubic',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        repeat: 0,    // Repetir infinitamente
        persist: true,
        onEnd: (() => {
          this.tweenFondD1();
        })

      })
  }
//#endregion
//#endregion

  //Vuelve a la escena del Hub
  finalDelJuego() {
    console.clear();
    this.coor.SaveScore("EspOrg", this.points);
    this.points = 0;
    this.scene.start("Hub");
  }
}