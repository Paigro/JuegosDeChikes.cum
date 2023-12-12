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
        // Letras:
        this.load.image('A', "/assets/juego/MetroSkaters/imagenes/A.jpg")
        this.load.image('S', "/assets/juego/MetroSkaters/imagenes/S.jpg")
        this.load.image('D', "/assets/juego/MetroSkaters/imagenes/D.jpg")
        this.load.image('F', "/assets/juego/MetroSkaters/imagenes/F.jpg")


    }

    create() {
        this.puntFict = 0;
        this.genDet = 0;
        this.avionAcc = false;
        this.secuenciaAcc = false;
        this.decision = false;
        this.playerSec = ""; // Secuencia del jugador.
        this.i = 0; // Para que se hagan 4 acciones: 4 obstaculos o 4 secuencias.
        this.j = 0; // Para las secuencias: que solo se lean 4 letras antes de comrpobar.

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

        // Ponemos las letras.
        this.A = this.add.sprite(0, 600, 'A').setOrigin(0, 0).setScale(0.2, 0.2).setVisible(false).setDepth(1);
        this.S = this.add.sprite(0, 600, 'S').setOrigin(0, 0).setScale(0.1, 0.08).setVisible(false).setDepth(1);
        this.D = this.add.sprite(0, 600, 'D').setOrigin(0, 0).setScale(0.2, 0.2).setVisible(false).setDepth(1);
        this.F = this.add.sprite(0, 600, 'F').setOrigin(0, 0).setScale(0.2, 0.2).setVisible(false).setDepth(1);

        // Boton de volver atras:
        this.atras.on('pointerdown', (pointer) => {
            this.finalDelJuego()
        });

        let obstaculos = [[0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 0], [1, 0, 1], [1, 1, 0]]; // Array de arrays de obstaculos: 0 no hay, 1 si hay.
        let secuencias = ["ASDF", "ASFD", "ADSF", "ADFS", "AFSD", "AFDS", "SDFA", "SDAF", "SFDA", "SFAD", "SAFD", "SADF", "DSFA", "DSAF", "DFSA", "DFAS", "DAFS", "DASF", "FSDA", "FSAD", "FDSA", "FDAS", "FADS"];
        //let secuencias2 = ["ALSK", "QPEB", "BNPM", "GHTY", "SVPM", "AZCR", "PHGT", "VGLK", "HTML", "SPQR", "VINO", "LSFR", "ERNT", "XRLQ", "POTE", "GOPZ", "AGMI", "FRIM", "COME", "FINA", "OKEY", "COKA", "ZULO"];  // Array de posibles combinaciones.
        this.posiciones = [200, 300, 400, 500];

        // Creacion de las cosas que estaran en la escena:
        this.generador = new Generador(this, 0, 0, obstaculos, secuencias); // Generador de cosas.
        this.avion = new Avion(this, 400, 250); // El avion.
        this.secuenciaTeclas = new secuanciaTeclas(this, 0, 450); // La secuencia de teclas.

        // Detectar la eleccion de la accion del jugador.
        this.input.keyboard.on('keydown', (event) => { // Miramos cualquier tecla.
            if (!this.decision) { // Solo si se permite una accion miramos cual puede ser.
                if (event.key === "ArrowUp" || event.key === "ArrowDown") { // Accion 1: mover al avion.
                    console.log("Seleccion: avion.");
                    this.avionAcc = true;
                    this.decision = true;
                }
                else if (event.key === "a" || event.key === "s" || event.key === "d" || event.key === "f") { // Accion 2: secuancia de teclas.
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
            //console.log(this.sec);
        }



        if (this.decision && this.avionAcc && !this.secuenciaAcc) // Accion avion.
        {
            this.movientoAvion()
        }
        else if (this.decision && this.secuenciaAcc && !this.avionAcc) // Accion secuencia.
        {
            this.mostrarSecuencia();
            if (this.i < 4) // Cuatro secuencias.
            {
                if (this.j < 4) // Cuatro letras de la secuencia.
                {
                    if (this.teclasSecuencia()) {
                        this.j++;
                        console.log("1: j: " + this.j + " i: " + this.i);
                        console.log("2: sec: " + this.sec + " playerSec: " + this.playerSec);
                    }
                }
                else // Cuando la secuencia del jugador tiene ya 4 letras.
                {
                    if (this.comprobarSecuencias(this.sec, this.playerSec)) // Si es correcta suma puntuacion ficticia y lo correspondiente a la del test.
                    {
                        //puntuacionofiacial++;
                        this.puntFict++;
                    }
                    else // Si no es correcta se resta puntuacion ficticia.
                    {
                        if (this.puntFict > 0) {
                            this.puntFict--;
                        }
                    }
                    this.j = 0; // Ponemos el contador de letras a 0 otra vez.
                    this.i++; // Sumamos al contador de secuencias.
                    this.playerSec = ""; // Reseteamos la secuencia.
                    this.sec = this.generador.secuenciaGenerador(); // Generamos otra secuencia aleatoria.
                    console.log("3: j: " + this.j + " i: " + this.i);
                    console.log("4: sec: " + this.sec + " playerSec: " + this.playerSec);
                    console.log("PUNTUACIONFICT: " + this.puntFict);
                }
            }
            else // Cuando haya hecho 4 secuencias.
            {
                this.reset();
                console.log("5: i: " + this.i + " j: " + this.j);
                console.log("6: sec: " + this.sec + " playerSec: " + this.playerSec);
            }
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
            this.playerSec += "A";
            //console.log(this.playerSec);
            return true;
        }
        else if (Phaser.Input.Keyboard.JustUp(this.sKey)) {
            this.playerSec += "S";
            //console.log(this.playerSec);
            return true;
        }
        else if (Phaser.Input.Keyboard.JustUp(this.dKey)) {
            this.playerSec += "D";
            //console.log(this.playerSec);
            return true;
        }
        else if (Phaser.Input.Keyboard.JustUp(this.fKey)) {
            this.playerSec += "F";
            //console.log(this.playerSec);
            return true;
        }
        else return false;
    }

    comprobarSecuencias(sec1, sec2) {
        console.log("Comprobacion: " + sec1 === sec2);
        return sec1 === sec2;
    }
    mostrarSecuencia() {
        for (let i = 0; i < 4; i++) {
            switch (this.sec[i]) {
                case 'A':
                    this.A.x = this.posiciones[i];
                    this.A.setVisible(true);
                    break;
                case 'S':
                    this.S.x = this.posiciones[i];
                    this.S.setVisible(true);
                    break;
                case 'D':
                    this.D.x = this.posiciones[i];
                    this.D.setVisible(true);
                    break;
                case 'F':
                    this.F.x = this.posiciones[i];
                    this.F.setVisible(true);
                    break;
                default:
                    break;
            }
        }

    }

    reset() {
        if (this.secuenciaAcc && this.decision) {
            console.log("Fin accion secuencias.");
            this.playerSec = "";
            this.secuenciaAcc = false;
            this.decision = false;
            this.i = 0;
            this.j = 0;
        } else if (this.avionAcc && this.decision) {
            console.log("Fin accion avion.");
            this.avionAcc = false;
            this.decision = false;
            this.i = 0;
        }

    }

    finalDelJuego() {
        console.clear();
        this.scene.start("Hub");
    }
} 