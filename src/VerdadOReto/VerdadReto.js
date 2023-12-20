import coordinator from "../coordinator.js";
import PhoneCall from './llamada.js';
import Hub from '../hub.js';
import Message from './mensaje.js';

export default class TruthOrDare extends Phaser.Scene {
    constructor() {
        super({ key: 'VerdadOReto', active: false });
    }

    preload() {
        this.load.image('telefono', 'assets/juego/TruthOrDare/imagenes/Telefono.png'); // Cargamos la imagen de un movil (provisional).
        this.load.image('calle', 'assets/juego/TruthOrDare/imagenes/fondo.png'); // Cargamos la imagen de una calle para el fondo (provisional).

        //cargar Mensajes
        this.load.image('mensajeMadre', 'assets/juego/TruthOrDare/imagenes/mensajeMadre.png');
        this.load.image('mensaje2Madre', 'assets/juego/TruthOrDare/imagenes/mensaje2Madre.png');
        this.load.image('mensajeMatias', 'assets/juego/TruthOrDare/imagenes/mensajeMatias.png');
        this.load.image('mensaje2Matias', 'assets/juego/TruthOrDare/imagenes/mensaje2Matias.png');
        this.load.image('mensajeMatias2', 'assets/juego/TruthOrDare/imagenes/mensajeMatias2.png');
        this.load.image('mensaje2Matias2', 'assets/juego/TruthOrDare/imagenes/mensaje2Matias2.png');
        this.load.image('mensajeLeo', 'assets/juego/TruthOrDare/imagenes/mensajeLeo.png');
        this.load.image('mensaje2Leo', 'assets/juego/TruthOrDare/imagenes/mensaje2Leo.png');
        this.load.image('mensajeEx', 'assets/juego/TruthOrDare/imagenes/mensajeEx.png');
        this.load.image('mensaje2Ex', 'assets/juego/TruthOrDare/imagenes/mensaje2Ex.png');


        this.load.image('llamada', 'assets/juego/TruthOrDare/imagenes/Llamada.png');
        this.load.image('score', 'assets/juego/TruthOrDare/imagenes/score.jpg'); // Cargamos la imagen del score.
    }
    create() {
        this.add.image(0, 0, 'calle').setOrigin(0, 0).setScale(0.5, 0.5); // Añadimos la imagen del fondo.
        this.add.image(310, 10, 'telefono').setOrigin(0, 0).setScale(0.5, 0.4); // Añadimos la imagen del telefono.
        this.marcador = this.add.text(16, 16, "Score: 0", { fontSize: '40px', fill: '#fff', fontFamily: 'Comic Sans MS' }).setPosition(0, 60).setDepth(3); // Texto para mostrar la puntuacion.

        this.contador = this.add.text(16, 16, "Time: 0", { fontSize: '40px', fill: '#fff', fontFamily: 'Comic Sans MS' }).setPosition(0, 0).setDepth(3); // Texto para mostrar la puntuacion.

        this.llamada = new PhoneCall(this, 420, 540);
        this.llamada.angle = 10;    //para q vibre en el tween
        this.llamada.texto = this.add.text(13, 13, "Tu Abuela", { fontSize: '40px', fill: '#8D2AB4', fontFamily: 'Comic Sans MS', boundsAlignV: "center" }).setPosition(460, 600).setDepth(3).setOrigin(0, 0.5); // Texto para mostrar la puntuacion.
        this.mensaje = new Message(this, 525, 160);
        this.mensaje.angle = 10     //para q vibre en el tween
        this.secondMensaje;
        this.score;

        //this.add.text(0, 200, this.ExtInt,{fill: '#FFA500'}).setOrigin(0, 0).setScale(3, 3);

        //metodos de la llamada
        this.llamada.on('pointerdown', (pointer) => {
            this.desapareceMensaje();
        });
        this.llamada.on('drag', (_, dragX, __) => this.llamada.DoAction(dragX));
        this.llamada.on('dragend', this.llamada.FinishAction);


        //metodo del mensaje
        this.mensaje.on('pointerdown', (pointer) => {
            this.mensaje.DoAction();
            this.desapareceLLamada();
        });

        this.tween = this.tweens.add({
            targets: [this.llamada, this.mensaje],
            delay: 0,
            angle: -10,          // Valor final de la posición en x
            duration: 110,  // Duración de la animación en milisegundos
            ease: 'Linear',  // Función de interpolación (puedes probar 'Cubic', 'Elastic', 'Bounce', etc.)
            yoyo: true,      // Hacer que la animación vuelva hacia atrás al final
            repeat: -1,    // Repetir infinitamente
            persist: true
        });


        //Salir al hub
        this.input.keyboard.on('keydown', (event) => { // Miramos cualquier tecla.

            if (event.key === "0") this.finalDelJuego()
        })
    }


    init(data) {
        this.Time = 10;
        this.score = 0;
        this.coor = data; //coordinador
        this.ExtInt = 0; // Puntuacion de extroversion (negativo) e introversion (positivo).
        this.timer;


        this.waitForAnswer();
    }
    update(time, delta) {
        if (this.Time <= 0 && this.ExtInt != 0) {
            this.finalDelJuego();
        }
        else if (this.Time <= 0 && this.ExtInt === 0) {
            this.contador.setText('Time: ' + "realice una accion");
        }
        else if (this.Time >= 0) {
            this.contador.setText('Time: ' + this.Time.toFixed(2));
        }
        this.Time -= (delta / 1000);
    }

    waitForAction() {
        this.timer = this.time.addEvent({
            delay: Math.floor(Math.random() * (6000 - 2000 + 1)) + 2000, //para coger un random
            callback: () => this.throwAction(),
            callbackScope: this
        });
    }

    throwAction() {
        this.apareceLLamada();
        this.apareceMensaje();
        this.tween.resume();

        this.waitForAnswer();
    }

    waitForAnswer() {
        this.timer = this.time.addEvent({
            delay: 5000,
            callback: () => this.cancelAction(),
            callbackScope: this
        })
    }

    cancelAction() {
        if (this.score > 0) {
            this.AddScore(-1);
        }
        this.desapareceLLamada();
        this.desapareceMensaje();
        this.tween.pause();

        this.secondMensaje?.destroy();
        this.waitForAction();
    }

    AddScore(num) {
        this.score += num;
        this.marcador.setText('Score: ' + this.score);
        console.log(this.score);
    }

    AddExtIntScore(num) {
        this.ExtInt += num;
        if (this.ExtInt == 0) { this.ExtInt += num; }
    }

    desapareceLLamada() {
        this.llamada.setActive(false);
        this.llamada.setVisible(false);
        this.llamada.texto.setVisible(false);
    }

    desapareceMensaje() {
        this.mensaje.setActive(false);
        this.mensaje.setVisible(false);
    }

    apareceLLamada() {
        this.llamada.setActive(true);
        this.llamada.setVisible(true);

        this.llamada.texto.setVisible(true);
    }

    apareceMensaje() {
        this.mensaje.setActive(true);
        this.mensaje.setVisible(true);
    }

    finalDelJuego() {
        console.clear();
        this.coor.SaveScore("ExtInt", this.ExtInt);
        this.points = 0;
        this.scene.start("Hub");
    }
}
