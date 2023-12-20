import coordinator from "../coordinator.js";
import CorteGalletas from "./CorteGalletas.js";
import GlaseadoGalletas from "./GlaseadoGalletas.js";

export default class Papas extends Phaser.Scene {

  constructor() {
    // Nombre de la escena para el SceneManager
    super({ key: 'Papas', active: false });

    this.points = 0;
  }

  init(data) {
    this.coor = data;
    //console.log(this.coor);
    //console.log(data);
  }

  preload() {
    this.load.image('atras', '/assets/juego/TruthOrDare/imagenes/VolverAtras.jpg'); // Cargamos la imagen de volver atras (provisional).

    //Carga de imagenes del juego
    this.load.image('BandejaCorte', '/assets/juego/PapasGalleteria/SpritesCorte/1.png');
    this.load.image('BordGallet', '/assets/juego/PapasGalleteria/Borde_Galleta.png');
    this.load.image('MarcaGallet', '/assets/juego/PapasGalleteria/Marca_Galleta.png');
    this.load.image('GlaseadoTut', '/assets/juego/PapasGalleteria/Tutorial_Glaseado.png');
    this.load.image('BandejaGlased', '/assets/juego/PapasGalleteria/Bandeja_Base.png');
    this.load.image('GlaseadoGallet', '/assets/juego/PapasGalleteria/Glaseado_Galleta.png');
    this.load.image('Fondo', '/assets/juego/PapasGalleteria/FondoDer.png');
    //this.load.image('FondoI', '/assets/juego/PapasGalleteria/FondoIzq.png');
    this.load.image('Separador', '/assets/juego/PapasGalleteria/Separacion.png');

    //Animacion de corte
    this.load.image('corte0', '/assets/juego/PapasGalleteria/SpritesCorte/1.png')
    this.load.image('corte1', '/assets/juego/PapasGalleteria/SpritesCorte/2.png')
    this.load.image('corte2', '/assets/juego/PapasGalleteria/SpritesCorte/3.png')
    this.load.image('corte3', '/assets/juego/PapasGalleteria/SpritesCorte/4.png')
    this.load.image('corte4', '/assets/juego/PapasGalleteria/SpritesCorte/5.png')
    this.load.image('corte5', '/assets/juego/PapasGalleteria/SpritesCorte/6.png')
    this.load.image('corte6', '/assets/juego/PapasGalleteria/SpritesCorte/7.png')
  }


  create() {

    //Contador en pantalla:
    this.contador = this.add.text(540, 20, "Time: 0", { fontSize: '40px', fill: '#fff', fontFamily: 'Comic Sans MS' }).setOrigin(0.5, 0).setDepth(4); // Texto para mostrar la puntuacion.

    //Fondo    
    this.fondoD = this.add.image(540, 0, 'Fondo').setOrigin(0, 0) // el fondo
    this.fondoI = this.add.image(0, -1440, 'Fondo').setOrigin(0, 0) // el fondo

    //Separador de Acciones    
    this.separador = this.add.image(540, 360, 'Separador').setOrigin(0.5, 0.5).setDepth(3); // el fondo

    //Tutorial glaseado
    this.tutGlaseado = this.add.sprite(800, 420,'GlaseadoTut').setScale(.7,.7).setDepth(3).setVisible(false);

    //Propiedades
    this.time = 10;
    this.endRound = false;

    // Elementos del juego
    this.bandeja1 = new CorteGalletas(this, 275, 800, 'BandejaCorte', 'MarcaGallet');
    this.bandeja2 = new GlaseadoGalletas(this, 800, 300, 'BandejaGlased', 'GlaseadoGallet').setScale(0.5, 0.1).setAlpha(0.01);
    this.tweenFondD1();
    this.tweenFondI1();


    //Bloquea la otra bandeja
    this.bandeja1.on('pointerdown', (pointer) => {
      //console.log("Start b1");
      this.bandeja2.BlockThisAction();
      this.bandeja1.StartAccion();
      this.endRound = false;
    })

    this.bandeja2.on('pointerdown', (pointer) => {
      //console.log("Start b2");
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
      this.contador.setText('Time: ' + this.time.toFixed(2))
      //console.log(this.time);
      this.time -= (delta / 1000);
    }
  }

  endAction(points) {
    //Reseteo logica
    this.points += points;
    this.endRound = true;
    console.log(this.points);

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
        alpha: 0.01,
        duration: 300,  // Duración de la animación en milisegundos
        ease: 'cubic',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        repeat: 0,    // Repetir infinitamente
        persist: true,
        onStart: (()=>{
          this.bandeja1.cortador.hide();
        })

      })
    //resetea posicion bandeja
    this.tweens.add
      ({
        targets: this.bandeja1,
        delay: 700,
        y: 800,
        x: 225,
        duration: 700,  // Duración de la animación en milisegundos
        ease: 'cubic',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        repeat: 0,    // Repetir infinitamente
        persist: true,
        onEnd: (() => {
          this.tweenFondI1();
          this.bandeja1.Reset();
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
        duration: 500,  // Duración de la animación en milisegundos
        ease: 'cubic',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
        repeat: 0,    // Repetir infinitamente
        persist: true

      })
    //resetea posicion bandeja
    this.tweens.add
      ({
        targets: this.bandeja2,
        delay: 800,
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
          this.bandeja2.Reset();
        })

      })
  }
  //#endregion
  //#endregion

  //Cambio sprite corte
  CambioSpriteCorte(cortes) {
    let textura = 'corte' + cortes;
    //console.log(textura);
    this.bandeja1.setTexture(textura);
  }

  //Vuelve a la escena del Hub
  finalDelJuego() {
    console.clear();
    this.coor.SaveScore("EspOrg", this.points);
    this.points = 0;
    this.scene.start("Hub");
  }
}