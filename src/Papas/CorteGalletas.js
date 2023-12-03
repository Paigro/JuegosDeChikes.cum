import AccionBase from "../accionBase.js";
import Corte from "./Corte.js"

export default class CorteGalletas extends AccionBase {
    constructor(scene, x, y, bandejaSpr, corteSpr) {
        super(scene, x, y, bandejaSpr);

        this.setScale(.85, .85);
        this.setInteractive();

        this.cortador = new Corte(scene, x-100, y-50, corteSpr);
        this.scene.add.existing(this);
        this.setDepth(1);
        this.cortador.hide();

        this.cortador.on('pointerdown', (pointer) => {
            this.cortador.move();
        })

        scene.input.enableDebug(this);
    };


    //startAccion
    StartAccion() {
        this.input.enabled = false;
        this.cortador.appear();
       //console.log("Start accion");

    }

    Reset() {
        //console.log("reset accion");
        super.Reset();
        this.input.enabled = true;
        this.cortador.hide();
    }
}