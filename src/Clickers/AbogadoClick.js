export default class AbogadoClick extends Phaser.Scene {

  constructor() {
    // Nombre de la escena para el SceneManager
    super({ key: 'AbogadoClick', active: false });

    this.record = 0;
    this.puntuacion = 0;
  }
  init() {
  }
  preload() {
    this.load.image('atras', '/assets/juego/TruthOrDare/imagenes/VolverAtras.jpg'); // Cargamos la imagen de volver atras (provisional).

    //Carga de imagenes del juego
    this.load.image('Abogado1Img', '/assets/juego/AbogadoClick/Abogado1.png');
    this.load.image('Abogado2Img', '/assets/juego/AbogadoClick/Abogado2.png');
    this.load.image('Abogado3Img', '/assets/juego/AbogadoClick/Abogado3.png');

    //fondo
    this.load.image('FondoAbogado', '/assets/juego/AbogadoClick/fondo.png');
  }

  create() {
    //fondo
    this.add.image(0, 0, 'FondoAbogado').setOrigin(0, 0) // Añadimos la imagen de volver atras.

    //Botones
    this.salir = this.add.text(0, 0, "SALIR", { fontSize: '40px', fill: '#fff', fontFamily: 'Comic Sans MS' }).setOrigin(0, 0).setInteractive(); // Texto que actua como boton de salir.
        this.salir.on('pointerdown', (pointer) => {
            this.finalDelJuego()
        });

    this.imgsAbogados = ['Abogado1Img', 'Abogado2Img', 'Abogado3Img'];
    this.Abogado = this.add.sprite(1080 / 2, -10, this.imgsAbogados[0]).setOrigin(.5, 0).setInteractive().on('pointerdown', () =>
      this.accion()

    )
    this.add.text(640, 150, 'Record: ' + this.record, { fill: '#FF0000' });
    this.puntText = this.add.text(640, 100, 'Abogados descolgados: ' + this.puntuacion, { fill: '#FF0000' });

  }

  accion() {
    this.Abogado.setInteractive(false);
    // Anticipacion
    this.tweens.add({
      targets: this.Abogado,
      angle: 10,          // Valor final de la posición en x
      duration: 50,  // Duración de la animación en milisegundos
      ease: 'Linear',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
      yoyo: false,      // Hacer que la animación vuelva hacia atrás al final
      repeat: 0,    // Repetir infinitamente
      persist: true
    })
    this.tweens.add({
      targets: this.Abogado,
      delay: 50,
      angle: -10,          // Valor final de la posición en x
      duration: 50,  // Duración de la animación en milisegundos
      ease: 'Linear',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
      yoyo: true,      // Hacer que la animación vuelva hacia atrás al final
      repeat: 0,    // Repetir infinitamente
      persist: true
    })
    this.tweens.add({
      targets: this.Abogado,
      delay: 100,
      angle: 0,          // Valor final de la posición en x
      duration: 50,  // Duración de la animación en milisegundos
      ease: 'Linear',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
      yoyo: false,      // Hacer que la animación vuelva hacia atrás al final
      repeat: 0,    // Repetir infinitamente
      persist: true
    })

    // Cae abogado
    this.tweens.add({
      targets: this.Abogado,
      delay: 200,
      y: 720,          // Valor final de la posición en x
      duration: 200,  // Duración de la animación en milisegundos
      ease: 'Linear',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
      yoyo: false,      // Hacer que la animación vuelva hacia atrás al final
      repeat: 0,    // Repetir infinitamente
      persist: true
    })

    // Resetea posicion
    this.tweens.add({
      targets: this.Abogado,
      delay: 500,
      x: 1100,
      y: -10,
      angle: -50,
      duration: 0,
      persist: true,
      onStart: (() => {
        //cambia imagen
        let i = Math.floor(Math.random() * this.imgsAbogados.length)
        this.Abogado.setTexture(this.imgsAbogados[i])
      })
    })


    // Vuelve a colgar
    this.tweens.add({
      targets: this.Abogado,
      delay: 600,
      x: 1080 / 2,          // Valor final de la posición en x
      duration: 200,  // Duración de la animación en milisegundos
      ease: 'Elastic',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
      yoyo: false,      // Hacer que la animación vuelva hacia atrás al final
      repeat: 0,    // Repetir infinitamente
      persist: true,

    })
    this.tweens.add({
      targets: this.Abogado,
      delay: 620,
      ease: 'Elastic',
      angle: 0,
      duration: 10,
      persist: true,
      onStart: (() => {
      })
    })
    this.puntuacion++
    this.puntText.text = 'Abogados descolgados: ' + this.puntuacion;
  }

  //Vuelve a la escena del Hub
  finalDelJuego() {
    console.clear();
    if (this.record < this.puntuacion) this.record = this.puntuacion;
    this.puntuacion = 0;
    this.scene.start("Hub");
  }
}