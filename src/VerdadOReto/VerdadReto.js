import coordinator from "../coordinator.js";
import PhoneCall from './llamada.js';
import Hub from '../hub.js';
import Message from './mensaje.js';

export default class TruthOrDare extends Phaser.Scene {
    constructor() {
        super({ key: 'VerdadOReto', active: false });
    }

    preload() {
        this.load.image('atras', 'assets/juego/TruthOrDare/imagenes/VolverAtras.jpg'); // Cargamos la imagen de volver atras (provisional).
        this.load.image('telefono', 'assets/juego/TruthOrDare/imagenes/Telefono.png'); // Cargamos la imagen de un movil (provisional).
        this.load.image('calle', 'assets/juego/TruthOrDare/imagenes/fondo.png'); // Cargamos la imagen de una calle para el fondo (provisional).
        this.load.image('mensaje', 'assets/juego/TruthOrDare/imagenes/mensaje.png'); // Cargamos la imagen del mensaje, de momento un Beluga.
        this.load.image('mensaje2', 'assets/juego/TruthOrDare/imagenes/mensaje2.png');
        this.load.image('llamada', 'assets/juego/TruthOrDare/imagenes/Llamada.png');
        this.load.image('score', 'assets/juego/TruthOrDare/imagenes/score.jpg'); // Cargamos la imagen del score.
    }
    create() {
        this.add.image(0, 0, 'calle').setOrigin(0, 0).setScale(0.5, 0.5); // Añadimos la imagen del fondo.
        this.add.image(310, 10, 'telefono').setOrigin(0, 0).setScale(0.5, 0.4); // Añadimos la imagen del telefono.
        this.atras = this.add.image(0, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive(); // Añadimos la imagen de volver atras.
        this.puntuacion = this.add.image(800, 0, 'score').setOrigin(0, 0).setScale(0.2, 0.2).setInteractive(); // Añadimos la imagen del fondo.


        this.llamada = new PhoneCall(this, 420, 590);
        this.mensaje = new Message(this, 525, 160);
        this.secondMensaje;
        this.score;

        //this.add.text(0, 200, this.ExtInt,{fill: '#FFA500'}).setOrigin(0, 0).setScale(3, 3);

        //metodos de la llamada
        this.llamada.on('pointerdown',  (pointer) => {
            this.desapareceMensaje();
        });
        this.llamada.on('drag', (_, dragX, __) => this.llamada.DoAction(dragX));
        this.llamada.on('dragend', this.llamada.FinishAction);


        //metodo del mensaje
        this.mensaje.on('pointerdown', (pointer) => {
            this.mensaje.DoAction();
            this.desapareceLLamada();
        });
       

        this.atras.on('pointerdown', (pointer) => {
            this.finalDelJuego();
        });
        this.puntuacion.on('pointerdown', (pointer) => {
            alert("Score: " + this.ExtInt);
        });

    }


    init(data) {
        this.Time = 0;
        this.finalTime = 100000; // Duracion del minijuego.
        this.score = 0;
        this.coor = data; //coordinador
        this.ExtInt = 0; // Puntuacion de extroversion (negativo) e introversion (positivo).
        this.timer;

        this.waitForAnswer();
    }
    update(time, delta){

        if (this.Time <= 0) {
            if (this.endRound && this.ExtInt !=0) {
              this.Time = 10;
              this.finalDelJuego();
            }
          else {
            this.Time -= (delta / 1000);
          }
        }
    }

    waitForAction() {
        this.timer = this.time.addEvent( {
            delay: Math.floor(Math.random() * (6000 - 2000 + 1) ) + 2000, //para coger un random
            callback: () => this.throwAction(),
            callbackScope: this 
    });
    console.log(this.timer.delay);
    }

    throwAction(){
        this.apareceLLamada();
        this.apareceMensaje();

        this.waitForAnswer();
    }

    waitForAnswer()
    {
        this.timer = this.time.addEvent( {
            delay: 5000, 
            callback: () => this.cancelAction(),
            callbackScope: this
        } )
    }

    cancelAction()
    {
        if ( () =>this.score > 0)
        {
            ()=> this.score--;
        }
        this.desapareceLLamada();
        this.desapareceMensaje();

        this.secondMensaje?.destroy();
        this.waitForAction();
    }

    finalDelJuego() {
        this.coor.SaveScore("EspOrg", this.ExtInt);
        this.points = 0;
        this.scene.start("Hub");
    }
    AddScore(num) {
        this.score += num;
    }
    AddExtIntScore(num){
        this.ExtInt += num;
    }
    desapareceLLamada() {
        this.llamada.setActive(false);
        this.llamada.setVisible(false);
    }
    desapareceMensaje() {
        this.mensaje.setActive(false);
        this.mensaje.setVisible(false);
    }
    apareceLLamada() {
        this.llamada.setActive(true);
        this.llamada.setVisible(true);
    }
    apareceMensaje() {
        this.mensaje.setActive(true);
        this.mensaje.setVisible(true);
    }
}
//this.scene.pause(this.scene.key);