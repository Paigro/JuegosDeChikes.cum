import AccionBase from "../accionBase.js";
import Corte from "./Corte.js"

export default class CorteGalletas extends AccionBase {
    constructor(scene, x, y, bandejaSpr, corteSpr) {
        super(scene, x, y, bandejaSpr);

        this.setScale(.85, .85);
        this.setInteractive();

        this.scene.add.existing(this);
        this.setDepth(1);
        /*this.cortador = new Corte(scene, x-100, y-50, corteSpr);
        this.cortador.hide();

        this.cortador.on('pointerdown', (pointer) => {
            this.cortador.move();
        })*/

        scene.input.enableDebug(this);
    };

    create() {
        var graphics = this.add.graphics();
    
        // Configurar el color y el grosor del pincel
        var color = 0x000000;
        var grosor = 100;
    
        // Variable para rastrear si el botón del ratón está presionado
        var pintando = false;
    
        // Configurar eventos de entrada del ratón
        this.input.on('pointerdown', function (pointer) {
            pintando = true;
            pintar(graphics, pointer.x, pointer.y, color, grosor);
        });
    
        this.input.on('pointerup', function () {
            pintando = false;
        });
    
        this.input.on('pointermove', function (pointer) {
            if (pintando) {
                pintar(graphics, pointer.x, pointer.y, color, grosor);
            }
        });
    }
    
    pintar(graphics, x, y, color, grosor) {
        console.log("Pintado");
        graphics.fillStyle(color);
        graphics.fillRect(x - grosor / 2, y - grosor / 2, grosor, grosor);
    }

    //startAccion
    StartAccion() {
        //this.input.enabled = false;
        //this.cortador.appear();
       //console.log("Start accion");

    }

    Reset() {
        //console.log("reset accion");
        //super.Reset();
        //this.input.enabled = true;
        //this.cortador.hide();
    }
}