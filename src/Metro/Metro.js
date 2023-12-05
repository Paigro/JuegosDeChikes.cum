import Generador from "./Generador.js";
import Avion from "./avion.js";
import secuanciaTeclas from "./secuenciaTeclas.js";
//import teclasArribaAbajo from "./teclasArribaAbajo.js";

export default class Metro extends Phaser.Scene // Manager de la escena del Metro Skaters.
{
    constructor() {
        // Nombre de la escena para el SceneManager
        super({ key: 'Metro', active: false });
    }

    // Metodos init, preload, create, update:
    init() {

    }

    preload() {
        // Imagenes:
        this.load.image('beluga', "/assets/juego/MetroSkaters/imagenes/Beluga2.png"); // Cargamos la imagen del avion.
        this.load.image('cielo', "/assets/juego/MetroSkaters/imagenes/cielo.jpg") // Cargamos la imagen del fondo.
        this.load.image('atras', "/assets/juego/TruthOrDare/imagenes/VolverAtras.jpg"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('panel', "/assets/juego/MetroSkaters/imagenes/Panel.PNG") // Cargamos la imagen del panel inferior.
    }

    create() {
        this.avionAcc = false;
        this.secuenciaAcc = false;
        this.decision = false;
        this.actSec = "";

        // Nuevos bordes del mundo para el movimiento del avion:
        this.physics.world.setBounds(0, 0, 1080, 450);
        // Teclas para mover el avion:
        this.upKey = this.input.keyboard.addKey('UP'); // Flecha arriba.
        this.downKey = this.input.keyboard.addKey('DOWN'); // Flecha abajo.
        this.rightKey = this.input.keyboard.addKey('RIGHT'); // Flecha derecha.
        this.leftKey = this.input.keyboard.addKey('LEFT'); // Flecha izquierda.
        // Teclas para la secuencia.
        this.aKey = this.input.keyboard.addKey("A"); // Tecla A.
        this.sKey = this.input.keyboard.addKey("S"); // Tecla S.
        this.dKey = this.input.keyboard.addKey("D"); // Tecla D.
        this.fKey = this.input.keyboard.addKey("F"); // Tecla F.

        this.add.image(0, 0, 'cielo').setOrigin(0, 0).setScale(10, 10); // Ponemos la imagen del fondo.
        this.atras = this.add.image(0, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive(); // Ponemos la imagen de volver atras.

        // Boton de volver atras:
        this.atras.on('pointerdown', (pointer) => {
            this.finalDelJuego()
        });

        //let obstaculos = [opcion1 = [0, 0, 1], opcion2 = [0, 1, 0], opcion3 = [0, 1, 1], opcion4 = [1, 0, 0], opcion5 = [1, 0, 1], opcion6 = [1, 1, 0]]; // Array de arrays de obstaculos: 0 no hay, 1 si hay.
        let secuencias = ["ASDF", "ASFD", "ADSF", "ADFS", "AFSD", "AFDS", "SDFA", "SDAF", "SFDA", "SFAD", "SAFD", "SADF", "DSFA", "DSAF", "DFSA", "DFAS", "DAFS", "DASF", "FSDA", "FSAD", "FDSA", "FDAS", "FADS"];
        let secuencias2 = ["ALSK", "QPEB", "BNPM", "GHTY", "SVPM", "AZCR", "PHGT", "VGLK", "HTML", "SPQR", "VINO", "LSFR", "ERNT", "XRLQ", "POTE", "GOPZ", "AGMI", "FRIM", "COME", "FINA", "OKEY", "COKA", "ZULO"];  // Array de posibles combinaciones.


        //Creacion de las cosas que estaran en la escena:
        this.generador = new Generador(this, 0, 0, secuencias2, secuencias); // Generador de cosas.
        this.avion = new Avion(this, 400, 250); // El avion.
        this.secuenciaTeclas = new secuanciaTeclas(this, 0, 450); // La secuencia de teclas.

        // Detectar la eleccion de la accion del jugador.
        this.input.keyboard.on('keydown', (event) => { // Miramos cualquier tecla.
            if (!this.decision) { // Solo si se permite una accion miramos cual puede ser.
                if (event.key == "ArrowUp" || event.key == "ArrowDown") { // Accion 1: mover al avion.
                    console.log("Seleccion: avion.");
                    this.avionAcc = true;
                    this.decision = true;
                }
                else if (event.key == "a" || event.key == "s" || event.key == "d" || event.key == "f") { // Accion 2: secuancia de teclas.
                    console.log("Selecion: teclas.");
                    this.secuenciaAcc = true;
                    this.decision = true;
                }
            }
        });
    }

    update() {
        if (!this.decision) {
            this.sec = this.generador.secuenciaGenerador();
            console.log(this.sec);
        }



        if (this.decision && this.avionAcc && !this.secuenciaAcc) {
            this.movientoAvion()
        }
        else if (this.decision && this.secuenciaAcc && !this.avionAcc) {
            this.teclasSecuencia();
        }
    }

    movientoAvion() {
        if (this.upKey.isDown) {
            this.avion.body.setVelocityY(-this.avion.speed);
        }
        else if (this.downKey.isDown) {
            this.avion.body.setVelocityY(this.avion.speed);
        }
        // De este if habra que quitar las cosas de los 4 ejes despues.
        else if (Phaser.Input.Keyboard.JustUp(this.upKey) || Phaser.Input.Keyboard.JustUp(this.downKey) /*|| Phaser.Input.Keyboard.JustUp(this.rightKey) || Phaser.Input.Keyboard.JustUp(this.leftKey)*/) {
            this.avion.body.setVelocityY(0);
            this.avion.body.setVelocityX(0);
        }
        /*else if (this.rightKey.isDown) {
            this.avion.body.setVelocityX(this.avion.speed);
        }
        else if (this.leftKey.isDown) {
            this.avion.body.setVelocityX(-this.avion.speed);
        }*/
    }

    teclasSecuencia() {
        if (Phaser.Input.Keyboard.JustUp(this.aKey)) {
            this.actSec += "A";
            console.log(this.actSec);
        }
        else if (Phaser.Input.Keyboard.JustUp(this.sKey)) {
            this.actSec += "S";
            console.log(this.actSec);
        }
        else if (Phaser.Input.Keyboard.JustUp(this.dKey)) {
            this.actSec += "D";
            console.log(this.actSec);
        }
        else if (Phaser.Input.Keyboard.JustUp(this.fKey)) {
            this.actSec += "F";
            console.log(this.actSec);
        }
    }
    finalDelJuego() {
        console.clear();
        this.scene.start("Hub");
    }
} 