import Galletas from "./Galletas.js"

export default class CorteGalletas extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, bandejaSpr, glasSpr) {
        super(scene, x, y, bandejaSpr);
        this.setScale(.75, .75);
        this.setInteractive();

        this.scene.add.existing(this);
        this.setDepth(1);

        this.glaseado = new Galletas(scene, x, 430, glasSpr).setOrigin(.5,.5);
        this.glaseado.hide();

        //Variables y propiedades
        this.pulsado = false;
        this.move = false;
        //Porcentaje de glaseado
        this.porcentaje = 0.001;

        //Asuncion de cursor no moviendose
        this.timer = 1;
        this.elapsedTime = this.timer;

        //Deteccion de inputs
        this.glaseado.on('pointerdown', (pointer) => {
            this.pulsado = true;
            //console.log("Pulsado" + this.pulsado);
        })

        this.glaseado.on('pointermove', (pointer) => {
            if (this.pulsado) {

                this.move = true;
                //console.log("mueve: " + this.move);
            }
            else {
                this.move = false;
            }
        })

        this.glaseado.on('pointerup', (pointer) => {
            this.move = false;
            this.pulsado = false;
        })

        //scene.input.enableDebug(this);
    };
    BlockThisAction() {
        this.scene.tweenFondD2();
        //console.log("ha entrado");
      }
    reiniciarTemporizador() {
        this.elapsedTime = this.timer;
    }

    updateGlassed(delta) {
        //Temporizador para ver si se esta moviendo el cursor
        if (this.elapsedTime <= 0) {
            this.move = false;
            //console.log("Reinicio." + this.elapsedTime);
            this.reiniciarTemporizador();
        }
        else if (this.move) {
            this.elapsedTime -= (delta / 1000);
        }

        //console.log("Move: " + this.move + ", Pulsado: " + this.pulsado)
        //Updatea el glaseado
        if (this.move && this.pulsado) {
            this.scene.tutGlaseado.setVisible(false);
            this.porcentaje += .01;
            this.glaseado.setAlpha(this.porcentaje);
            //console.log(this.porcentaje);

            if (this.porcentaje >= 1) {
                this.glaseado.hide();
                this.move = false;
                this.pulsado = false;
                this.scene.endAction(-1);
            }
        }
    }

    BlockThisAction() {
        //this.visible = false;
        this.scene.tweenBandejaDFuera();
        this.glaseado.hide();
        this.scene.tutGlaseado.setVisible(false);
        //console.log("ha entrado");
    }


    //startAccion
    StartAccion() {
        this.input.enabled = false;
        this.glaseado.appear();
        this.scene.tutGlaseado.setVisible(true);
        //this.cortador.appear();
        //console.log("Start accion");

    }

    SetGlaseadoPosition(){
        this.glaseado.x = this.x;
        this.glaseado.y = this.y;
    }

    Reset() {
        //console.log("reset accion");
        this.input.enabled = true;
        this.porcentaje = .001;
        this.contador = false;
    }
}