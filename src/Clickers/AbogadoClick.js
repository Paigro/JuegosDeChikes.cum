export default class AbogadoClick extends Phaser.Scene {

  constructor() {
    // Nombre de la escena para el SceneManager
    super({ key: 'AbogadoClick', active: false });

    this.puntuacion = 0;
  }
  init() {
  }
  preload() {

    //Carga de imagenes del juego
    this.load.image('Abogado1Img', '/assets/juego/AbogadoClick/Abogado1.png');
    this.load.image('Abogado2Img', '/assets/juego/AbogadoClick/Abogado2.png');
    this.load.image('Abogado3Img', '/assets/juego/AbogadoClick/Abogado3.png');
  }

  create() {
    this.imgsAbogados = ['Abogado1Img', 'Abogado2Img', 'Abogado3Img'];
    this.Abogado = this.add.sprite(0, 0, this.imgsAbogados[0]).setInteractive().on('pointerdown', () =>
      this.accion()

    )
  }

  accion() {
    //Animacion de descolgar
    //console.log("wada")
    this.tweens.add({
      targets: this.imgsAbogados,
      y: 400,          // Valor final de la posición en x
      duration: 2000,  // Duración de la animación en milisegundos
      ease: 'Linear',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
      yoyo: true,      // Hacer que la animación vuelva hacia atrás al final
      repeat: 0       // Repetir infinitamente
    }),
      this.puntuacion++
    //Nuevo Abogado
    //Animacion de colgar
  }
}