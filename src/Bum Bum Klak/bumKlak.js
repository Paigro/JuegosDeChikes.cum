import corazon from "./corazon.js";
import cerebro from "./cerebro.js";
import bocadillo from "./bocadillos.js";
import generadorDialogo from "./generadorDialogos.js";
import aviso from "./aviso.js";

export default class BumKlak extends Phaser.Scene {

  constructor() {
    // Nombre de la escena para el SceneManager
    super({ key: 'BumKlak', active: false });
  }

  init(data) {
    this.coor = data;
    this.cameras.main.setBackgroundColor("#99FF99");
  }

  preload() {
    this.load.image('atras', '/assets/juego/TruthOrDare/imagenes/VolverAtras.jpg'); // Cargamos la imagen de volver atras (provisional).
    this.load.image('bocadillo', '/assets/juego/BumKlak/bocadillo.png'); // Cargamos la imagen del bocadillo
    this.load.image('cerebro', '/assets/juego/BumKlak/cerebro.png'); // Cargamos la imagen del cerebro
    this.load.image('corazon', '/assets/juego/BumKlak/corazon.png'); // Cargamos la imagen del corazón
    this.load.image('escuchador', '/assets/juego/BumKlak/persona escuchadora.png'); // Cargamos la imagen del moñeco que escucha
    this.load.image('parlanchin', '/assets/juego/BumKlak/persona parlanchina.png'); // Cargamos la imagen del moñeco que habla
    this.load.image('aviso', '/assets/juego/BumKlak/aviso.png'); // Cargamos la imagen del moñeco que habla
  }
  create() {
    this.atras = this.add.image(950, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive(); // Añadimos la imagen de volver atras.
    this.atras.on('pointerdown', (pointer) => {
      this.finalDelJuego();
    });

    //elementos
    this.escuchador = this.add.image(50, 350, 'escuchador').setOrigin(0, 0).setScale(1, 1);
    this.parlante = this.add.image(850, 350, 'parlanchin').setOrigin(0, 0).setScale(0.3, 0.3);
    this.corazon = new corazon(this, 165, 550);
    this.cerebro = new cerebro(this, 135, 400);
    this.aviso = new aviso(this, 1000, 550); // indicador de aviso
    this.bocadilloHablador = new bocadillo(this, 600, 170, 0.7, 0);     // bocata de respuesta
    this.bocadilloRespondedor = new bocadillo(this, 450, 360, 0.7, 1);  // bocata parlanchin
    this.generadorDialogo = new generadorDialogo(this);
    //texto
    this.textohablador = this.add.text(350, 100, "", { fontSize: '20px', fill: '#1CAF56', fontFamily: 'Comic Sans MS' });  // bocata parlanchin
    this.textorespondedor = this.add.text(200, 300, "", { fontSize: '20px', fill: '#1CAF56', fontFamily: 'Comic Sans MS' }); // bocata de respuesta
    this.textopuntuador = this.add.text(0, 0, "69420", { fontSize: '30px', fill: '#1CAF56', fontFamily: 'Comic Sans MS' });  // indica la puntuacion
    // puntuaciones
    this.punTest = 0;  // puntuación test
    this.puntuacion = 0;  // puntuación del juego perse
    //cosas del debug
    this.debug = 1; // variable usada para debug
    //this.debugtext = this.add.text(0, 0, "0", {fontSize: '40px', fill: '#000000', fontFamily: 'Comic Sans MS'}).setPosition(200, 0);
    this.debugMov = 0;
    // inputs
    this.spaceKey = this.input.keyboard.addKey('SPACE');
    // constantes
    this._aavisoApparitionVel = 0.05; // velocidad de aparición del aviso
    this._numDialogos = 7;            // numero de dialogos disponibles
    // variables
    this.dialognum;                             // indice del dialogo elegido
    this.avisoActivo = false;                   // indica si el aviso está activo
    this.avisoVel = Phaser.Math.Between(2, 10);  // velocidad random del aviso
    this.alreadySanctioned = false;                 // indica si ya se ha sancionado el fallo
    this.alreadyGiven = false;
    // setup
    this.bocadilloRespondedor.alpha = 0;
    this.textorespondedor.alpha = 0;
    this.aviso.alpha = 0;
  }

  update() {
    if (Phaser.Math.Between(0, 100) == 100 && this.avisoActivo == false)  // coloca el aviso en su sitio al comenzar
    {
      this.avisoActivo = true;
      this.setHablador();
      this.textohablador.alpha = 1;
      this.aviso.setX(1000);
      this.alreadyGiven = false;
    }
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      if (this.avisoActivo) {
        this.executeAction();
      }
    }
    this.failChecker();
    this.avisoUpdate();
    this.puntuadorUpdate();
  }

  setHablador() // cambia el texto del muñeco parlanchin
  {
    this.dialognum = Phaser.Math.Between(0, this._numDialogos);
    this.generadorDialogo.GeneraTextoIni(this.dialognum);
    this.textohablador.setText(this.generadorDialogo.texto);
  }

  setRespondedor(CoC) // cambia el texto de la respuesta, si CoC = 0, se usa el corazón
  {
    this.generadorDialogo.GeneraTextoRes(this.dialognum, CoC);
    this.textorespondedor.setText(this.generadorDialogo.texto);
  }

  avisoUpdate() {
    if (this.avisoActivo)  // mientras este activo
    {
      this.aviso.setX(this.aviso.x - this.avisoVel);              // lo hace avanzar 
      this.aviso.alpha = this.aviso.alpha + this._aavisoApparitionVel;  // lo hace destransparentarse poco a poco
      if (this.aviso.x + 50 < 0) // una vez queda fuera de pantalla...
      {
        this.avisoActivo = false;                   // se desactiva
        this.avisoVel = Phaser.Math.Between(3, 10);  // se crea una velocidad aleatoria para el siguiente aviso
      }
    }
    else {
      this.aviso.alpha = this.aviso.alpha - this._aavisoApparitionVel;  // se le hace ir desapareciendo gradualmente
      if (this.aviso.alpha < 0) {
        this.aviso.setX(1000);  // lo coloca en su sitio
      }
    }
    if (this.alreadySanctioned && this.aviso.x == 1000) this.alreadySanctioned = false;
  }

  puntuacionManager(SoR, PoP, cantidad)   // suma o resta las puntuaciones, SoR = 0, se resta, else se suma, si PoP es 0, se suma a la puntuación del juego...
  {
    // si SoR = 0, se resta, else se suma
    let auxsig;
    if (SoR == 0) auxsig = 1;
    else auxsig = -1;

    if (PoP == 0) // si es 0, se suma a la puntuación del juego...
    {
      this.puntuacion = this.puntuacion + auxsig * cantidad
    }
    else  // de lo contrario se suma al test
    {
      this.punTest = this.punTest + auxsig * cantidad;
    }
  }

  puntuadorUpdate() // actualiza el puntuador
  {
    this.textopuntuador.setText("Puntuación: " + this.puntuacion);
  }

  failChecker() // checkea si el aviso se ha saltado
  {
    if (this.aviso.x <= 0 && !this.alreadySanctioned) {
      this.alreadySanctioned = true;
      this.puntuacionManager(1, 0, 20);
    }
  }

  executeAction() {
    if (!this.alreadyGiven) {
      if (this.aviso.x > this.corazon.x - 100 && this.aviso.x < this.corazon.x + 100)  // coloca la respuesta de corazon
      {
        this.setRespondedor(0);
        this.isResActive = true;
        this.bocadilloRespondedor.alpha = 1;
        this.textorespondedor.alpha = 1;
        this.alreadyGiven = true;
        this.alreadySanctioned = true;
        this.puntuacionManager(0, 0, 20);
      }
      else if (this.aviso.x > this.corazon.x + 100) // coloca la respuesta de cerebro
      {
        this.setRespondedor(1);
        this.isResActive = true;
        this.bocadilloRespondedor.alpha = 1;
        this.textorespondedor.alpha = 1;
        this.alreadyGiven = true;
        this.alreadySanctioned = true;
        this.puntuacionManager(0, 0, 20);
      }
    }
  }

  respuestaUpdate() {



  }

  finalDelJuego() {
    this.scene.start("Hub");
  }
}