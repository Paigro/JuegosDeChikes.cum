import Coordinator from "./coordinator.js";

export default class Hub extends Phaser.Scene {

  constructor() {
    // Nombre de la escena para el SceneManager
    super({ key: 'Hub', active: true });

    //coordinator
    this.coordinator = new Coordinator(this);

    //Desbloqueo de minijuegos
    this.juegsDesbloq = 0;
  }

  init() {
    this.personalidad("");
  }
  
  preload() {
    console.log("0");
    this.load.image('Scroll', "assets/juego/Hub/BarritaScroll.png")
    this.load.image('ToDImage', "assets/Bocetos/TruthOrDare.PNG")
    this.load.image('BumClakImage', "assets/Bocetos/BumBumKlak.PNG")
    this.load.image('PapasImage', "assets/Bocetos/PappasGalleteria.PNG")
    this.load.image('AbogadoImage', "assets/Bocetos/ElqueTengoAquiColgado.PNG")
    this.load.image('MetroImage', "assets/Bocetos/Metro.jpg")
    this.load.image('resultado', "assets/Bocetos/Metro.jpg")
  }

  create() {

    //Desbloqueo de minijuego
    if(this.juegsDesbloq<5){ this.juegsDesbloq++; }

    //Scroll minijuegos
    this.scroll = this.add.image(0, 0, 'Scroll').setInteractive({draggable: true}).setScale(1,100).setDepth(2);
    this.scroll.on('drag', (evento) =>
    {
      //console.log(this.input.y);
      //console.log("we"),
      this.scroll.y = this.input.y;
      this.cameras.main.setScroll(0, this.scroll.y)
    }
    )

    //this.cameras.main.setBounds(0, 0, 2, 2); // Establecer los límites del mundo
    //this.cameras.main.startFollow(this.scroll); // Hacer que la cámara siga al fondo

    //Botones a juegos
    this.ToDImg = this.add.image(0, 0, 'ToDImage').setOrigin(0, 1).setScale(.8).setVisible(false);
    this.BumClackImg = this.add.image(0, 0, 'BumClakImage').setOrigin(0, 1).setScale(.8).setVisible(false);
    this.PapasImg = this.add.image(0, 0, 'PapasImage').setOrigin(0, 1).setScale(.8).setVisible(false);
    this.MetroImg = this.add.image(0, 0, 'MetroImage').setOrigin(0, 1).setScale(.8).setVisible(false);
    this.AbogadoImg = this.add.image(0, 0, 'AbogadoImage').setOrigin(0, 1).setScale(.8).setVisible(false);
    this.resultadoImagen = this.add.image(0, 0, 'resultado').setOrigin(0, 1).setScale(.8).setVisible(false);

    this.hola = [this.ToDImg, this.BumClackImg, this.PapasImg, this.MetroImg, this.AbogadoImg, this.resultadoImagen];

    //muestra los juegos desbloqueados
    let cols = 0;
    for (let i = 1; i <= this.juegsDesbloq; i++) {
      this.hola[i - 1].setVisible(true);
      this.hola[i - 1].x = ((1080 / 2) * (cols)) + 10;
      this.hola[i - 1].y = 300 * (Math.round((i / 2)));

      //contadores
      cols++;
      if (cols > 1) cols = 0;
    }

    //listers
    this.ToDImg.setInteractive().on('pointerdown', () =>
      this.scene.start("VerdadOReto", this.coordinator)
    )
    this.BumClackImg.setInteractive().on('pointerdown', () =>
      this.scene.start("BumKlak", this.coordinator)
    )
    this.PapasImg.setInteractive().on('pointerdown', () =>
      this.scene.start("Papas", this.coordinator)
    )
    this.MetroImg.setInteractive().on('pointerdown', () =>
      this.scene.start("Metro", this.coordinator)
    )
    this.AbogadoImg.setInteractive().on('pointerdown', () =>
      this.scene.start("AbogadoClick")
    )
    this.resultadoImagen.setInteractive().on('pointerdown', () =>
      this.scene.start("resultadoTest", this.coordinator)
    )
  }

  desbloqMinij() { this.juegsDesbloq++; }

  personalidad() {
    let pers =this.coordinator.returnPersonalidad();
    //console.log(pers)
    let color;
    // Este color se lo pasara el coordinator dependiendo de la personalidad.
        //Morado.
        if (pers === "IROG" || pers === "IREG" || pers === "EROG" || pers === "EREG") { color = "#E16EDD"; }
        //Verde.
        else if (pers === "ISOG" || pers === "ISEG" || pers === "ESOG" || pers === "ESEG") { color = "#73E16E"; }
        //Azul.
        else if (pers === "IROD" || pers === "ISOD" || pers === "EROD" || pers === "ESOD") { color = "#77EAF5"; }
        //Amarillo.
        else if (pers === "IRED" || pers === "ISED" || pers === "ERED" || pers === "ESED") { color = "#FFC300"; }
        //Naranja.
        else { color = "#ff9933" }
    document.body.style.backgroundColor = color;
    console.log(color);
    this.cameras.main.setBackgroundColor(color);
  }
} 