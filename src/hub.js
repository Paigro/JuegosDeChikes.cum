import Coordinator from "./coordinator.js";

export default class Hub extends Phaser.Scene {

  constructor() {
    // Nombre de la escena para el SceneManager
    super({ key: 'Hub', active: true });

    //coordinator
    this.coordinator = new Coordinator(this);

    //Desbloqueo de minijuegos
    this.juegsDesbloq = 1;
  }
  init() {
    this.personalidad("");
  }
  preload() {
    this.load.image('ToDImage', "assets/Bocetos/TruthOrDare.PNG")
    this.load.image('BumClakImage', "assets/Bocetos/BumBumKlak.PNG")
    this.load.image('PapasImage', "assets/Bocetos/PappasGalleteria.PNG")
    this.load.image('Metro', "assets/Bocetos/MetroSkaters.PNG")
  }

  create() {
    //calcula personalidad cuando vuelves al hub
    this.coordinator.CalcularPersonalidad();

    //Botones a juegos
    this.ToDImg = this.add.image(0, 0, 'ToDImage').setOrigin(0, 1).setScale(1, 0.71).setVisible(false);
    this.BumClackImg = this.add.image(0, 0, 'BumClakImage').setOrigin(0, 1).setScale(.8).setVisible(false);
    this.PapasImg = this.add.image(0, 0, 'PapasImage').setOrigin(0, 1).setScale(.8).setVisible(false);
    this.MetroImg = this.add.image(0, 0, 'Metro').setOrigin(0, 1).setScale(.8).setVisible(false);

    this.hola = [this.ToDImg, this.BumClackImg, this.PapasImg, this.MetroImg];

    //muestra los juegos desbloqueados
    let cols = 0;
    for (let i = 1; i <= this.juegsDesbloq; i++) {
      this.hola[i - 1].setVisible(true);
      this.hola[i - 1].x = ((1080 / 2) * (cols))+10;
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

  }

  desbloqMinij(){ this.juegsDesbloq++;}

  personalidad(pers) {
    console.log(pers)
    let color;
    //Morado.
    if (pers === "IROG" || pers === "IREG" || pers === "EROG" || pers === "EREG") { color = "#E16EDD"; }
    //Verde.
    else if (pers === "ISOG" || pers === "ISEG" || pers === "ESOG" || pers === "ESEG") { color = "#73E16E"; }
    //Azul.
    else if (pers === "IROD" || pers === "ISOD" || pers === "EROD" || pers === "EROD") { color = "#77EAF5"; }
    //Amarillo.
    else if (pers === "IRED" || pers === "ISED" || pers === "ERED" || pers === "ESED") { color = "#F5FA57"; }
    //Naranja.
    else { color = "#ff9933" }
    document.body.style.backgroundColor = color;
    console.log(color);
    this.cameras.main.setBackgroundColor(color);
  }

} 