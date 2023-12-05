import AccionBase from "../accionBase.js";
import Galletas from "./Galletas.js"

export default class CorteGalletas extends AccionBase {
    constructor(scene, x, y, bandejaSpr, glasSpr) {
        super(scene, x, y, bandejaSpr);

        this.setScale(.75, .75);
        this.setInteractive();

        this.scene.add.existing(this);
        this.setDepth(1);

        this.glaseado = new Galletas(scene, x, y, glasSpr);

        this.pulsado = false;
        this.move = false;

        this.porcentaje = 0.001;

        this.glaseado.on('pointerdown', (pointer) => {
            this.pulsado = true;
            console.log("Pulsado" + this.pulsado);
        })

        this.glaseado.on('pointermove', (pointer) => {
            if (this.pulsado) {

                this.move = true;
                console.log("mueve: " + this.move);
            } 
            else {
                this.move = false;
            }
        })

        this.glaseado.on('pointerup', (pointer) => {
            this.move = false;
            this.pulsado = false;
        })

        scene.input.enableDebug(this);
    };

    //startAccion
    StartAccion() {
        this.input.enabled = false;
        //this.cortador.appear();
        //console.log("Start accion");

    }

    updateGlassed() {
        if (this.move && this.pulsado) {
            this.porcentaje += .01;
            this.glaseado.setAlpha(this.porcentaje);
            console.log(this.porcentaje);
            if (this.porcentaje >= 1) {
                this.scene.endAction(-1);
            }
        }
    }

    Reset() {
        //console.log("reset accion");
        super.Reset();
        this.input.enabled = true;
        this.porcentaje = .001;
        this.contador = false;
    }
}