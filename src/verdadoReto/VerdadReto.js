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
        this.load.image('calle', 'assets/juego/TruthOrDare/imagenes/Calle.jpg'); // Cargamos la imagen de una calle para el fondo (provisional).
        this.load.image('mensaje', 'assets/juego/TruthOrDare/imagenes/mensaje.png'); // Cargamos la imagen del mensaje, de momento un Beluga.
        this.load.image('mensaje2', 'assets/juego/TruthOrDare/imagenes/mensaje2.png');
        this.load.image('llamada', 'assets/juego/TruthOrDare/imagenes/Llamada.png');
        this.load.image('score', 'assets/juego/TruthOrDare/imagenes/score.jpg'); // Cargamos la imagen del score.
    }
    create() {
        this.add.image(0, 0, 'calle').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.add.image(310, 10, 'telefono').setOrigin(0, 0).setScale(0.5, 0.4); // Añadimos la imagen del telefono.
        this.atras = this.add.image(0, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive(); // Añadimos la imagen de volver atras.
        this.puntuacion = this.add.image(800, 0, 'score').setOrigin(0, 0).setScale(0.2, 0.2).setInteractive(); // Añadimos la imagen del fondo.


        this.llamada = new PhoneCall(this, 420, 590);
        this.mensaje = new Message(this, 525, 160);
        this.secondMensaje;
        this.score = 0;

        //this.add.text(0, 200, this.ExtInt,{fill: '#FFA500'}).setOrigin(0, 0).setScale(3, 3);

        //metodos de la llamada
        this.llamada.on('pointerdown',  (pointer) => {
            this.desaparece(this.mensaje);
        });
        this.llamada.on('drag', (_, dragX, __) => this.llamada.DoAction(dragX));
        this.llamada.on('dragend', this.llamada.FinishAction);


        //metodo del mensaje
        this.mensaje.on('pointerdown', (pointer) => {
            this.mensaje.DoAction();
            this.desaparece(this.llamada);
        });
       

        this.atras.on('pointerdown', (pointer) => {
            this.finalDelJuego();
        });
        this.puntuacion.on('pointerdown', (pointer) => {
            alert("Score: " + this.ExtInt);
        });

    }


    init() {
        this.realTime = 0; // Tiempo real, ya se cambiara en un futuro que haya dos tiempos. Esto es para probar.
        this.finalTime = 100000; // Duracion del minijuego.
       // this.score = 0; // Puntuacion ficticia mostrada al jugador.
        this.limitTime = 500; // Timpo que tiene el jugador para responder a una llamada o a un mensaje.
        this.ExtInt = 0; // Puntuacion de extroversion (negativo) e introversion (positivo).
        this.timer;
        this.waitForAction();

    }
    update(){}

    waitForAction(){
        this.timer = this.time.addEvent( {
            delay: 20000, 
            callback: () => this.throwAction(),
            callbackScope: this 
    });
    }

    throwAction(){
        this.llamada.setActive(true);
        this.mensaje.setActive(true);
        this.llamada.setVisible(true);
        this.mensaje.setVisible(true);

        this.waitForAnswer();
    }

    waitForAnswer()
    {
        this.timer = this.time.addEvent( {
            delay: this.limitTime, 
            callback: () => this.cancelAction(),
            callbackScope: this
        } )
    }

    cancelAction()
    {
        if (this.score > 0)
        {
            score--;
        }
        this.desaparece(this.llamada);
        this.desaparece(this.mensaje);

        this.secondMensaje?.destroy();
        this.waitForAction();
    }

    finalDelJuego() {
        this.scene.start("Hub");
    }
    AddScore(num) {
        this.score += num;
    }
    AddExtIntScore(num){
        this.ExtInt += num;
    }
    desaparece(sprite) {
        sprite.setActive(false);
        sprite.setVisible(false);
    }
    resetTime(){
        this.time= 0;

    }

}
//this.scene.pause(this.scene.key);