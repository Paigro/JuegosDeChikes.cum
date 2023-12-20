import corazon from "./corazon.js";
import cerebro from "./cerebro.js";
import bocadillo from "./bocadillos.js";
import generadorDialogo from "./generadorDialogos.js";
import aviso from "./aviso.js";

export default class BumKlak extends Phaser.Scene{

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'BumKlak', active: false  }); 
    }
    
    init(data) {
      this.coor = data;
      this.cameras.main.setBackgroundColor("#99FF99");
  }

    preload(){        
      this.load.image('atras', '/assets/juego/TruthOrDare/imagenes/VolverAtras.jpg'); // Cargamos la imagen de volver atras (provisional).
      this.load.image('bocadillo', '/assets/juego/BumKlak/bocadillo.png'); // Cargamos la imagen del bocadillo
      this.load.image('cerebro', '/assets/juego/BumKlak/cerebro.png'); // Cargamos la imagen del cerebro
      this.load.image('corazon', '/assets/juego/BumKlak/corazon.png'); // Cargamos la imagen del corazón
      this.load.image('escuchador', '/assets/juego/BumKlak/persona escuchadora.png'); // Cargamos la imagen del moñeco que escucha
      this.load.image('parlanchin', '/assets/juego/BumKlak/persona parlanchina.png'); // Cargamos la imagen del moñeco que habla
      this.load.image('aviso', '/assets/juego/BumKlak/aviso.png'); // Cargamos la imagen del moñeco que habla
    }    
    create(){
      this.atras = this.add.image(950, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive(); // Añadimos la imagen de volver atras.
      this.atras.on('pointerdown', (pointer) => {
        this.finalDelJuego();
      });
      
      //elementos
      this.escuchador = this.add.image(50, 350, 'escuchador').setOrigin(0,0).setScale(1, 1);
      this.parlante = this.add.image(850, 350, 'parlanchin').setOrigin(0,0).setScale(0.3, 0.3);
      this.corazon = new corazon(this, 165, 550);
      this.cerebro = new cerebro(this, 135, 400);
      this.aviso = new aviso(this, 1000, 550); // indicador de aviso
      this.bocadilloHablador = new bocadillo(this, 600, 170, 0.7, 0);     // bocata de respuesta
      this.bocadilloRespondedor = new bocadillo(this, 450, 360, 0.7, 1);  // bocata parlanchin
      this.generadorDialogo = new generadorDialogo(this);
      //texto
      this.textohablador = this.add.text(350, 100, "blablablabla", {fontSize: '20px', fill: '#1CAF56', fontFamily: 'Comic Sans MS'});  // bocata parlanchin
      this.textorespondedor = this.add.text(200, 300, "blablablablababla", {fontSize: '20px', fill: '#1CAF56', fontFamily: 'Comic Sans MS'}); // bocata de respuesta
      this.puntuador = this.add.text(0, 0, "69420", {fontSize: '20px', fill: '#1CAF56', fontFamily: 'Comic Sans MS'});  // indica la puntuacion
      // puntuaciones
      this.punTest = 0;  // puntuación test
      this.puntuacion = 0;  // puntuación del juego perse
      //cosas del debug
      this.debug = 1; // variable usada para debug
      //this.debugtext = this.add.text(0, 0, "0", {fontSize: '40px', fill: '#000000', fontFamily: 'Comic Sans MS'}).setPosition(200, 0);
      this.debugMov = 0;
      // inputs
      this.spaceKey = this.input.keyboard.addKey('W');
      this.Gkey = this.input.keyboard.addKey('G');
      // constantes
      this._apparitionVel = 0.05;
      // variables
      this.dialognum;
      this.habladortrans = 0;
      this.avisoExiste = true;
      this._avisoVel = Phaser.Math.Between(2,10);
      // setup
      this.bocadilloRespondedor.alpha = 0;
      this.textorespondedor.alpha = 0;
    }

    update()
    {
        this.avisoUpdate();




      // tener en cuenta para hacer visibles luego
      this.debug = this.debug - 0.03;
      if(this.debug < 0) this.debug = 0;
    }

    setHablador() // cambia el texto del muñeco parlanchin
    {
      this.dialognum = Phaser.Math.Between(0,6);
      this.generadorDialogo.GeneraTextoIni(this.dialognum);
      this.textohablador.setText(this.generadorDialogo.texto);
    }

    setRespondedor(CoC) // cambia el texto de la respuesta
    {
      this.generadorDialogo.GeneraTextoRes(this.dialognum, CoC);
      this.textorespondedor.setText(this.generadorDialogo.texto);
    }

    avisoUpdate()
    {
      if(this.avisoExiste)
      {
        this.aviso.setX(this.aviso.x - this._avisoVel);
        if(this.aviso.x + 50 < 0)
        {
          //this.aviso.alpha = 0;
          //this.avisoExiste = false;
          this._avisoVel = Phaser.Math.Between(3,10);
          this.aviso.setX(1000);
        }
      }
    }

    finalDelJuego()
    {    
      this.scene.start("Hub");
    }
}