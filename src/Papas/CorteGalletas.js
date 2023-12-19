import Corte from "./Corte.js"

export default class CorteGalletas extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, bandejaSpr, corteSpr) {
        super(scene, x, y, bandejaSpr);

        this.setScale(.75, .75);
        this.setInteractive();

        this.cortador = new Corte(scene, 140, 330, corteSpr);
        this.scene.add.existing(this);
        this.setDepth(1);
        this.cortador.hide();

        this.cortador.on('pointerdown', (pointer) => {
            this.cortador.move();
        })

        //scene.input.enableDebug(this);
    };


    //startAccion
    StartAccion() {
        this.input.enabled = false;
        this.cortador.appear();
       //console.log("Start accion");

    }
    BlockThisAction() {
        this.scene.tweenBandejaIFuera();
        //console.log("ha entrado");
      }

    Reset() {
        //console.log("reset accion");
        this.input.enabled = true;
        this.cortador.hide();
    }
}