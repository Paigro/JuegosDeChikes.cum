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
        // IMAGENES:
        // Avion:
        this.load.image('beluga', "/assets/juego/MetroSkaters/imagenes/Beluga2.png"); // Cargamos la imagen del avion.
        // Fondo:
        this.load.image('cielo', "/assets/juego/MetroSkaters/imagenes/cielo.jpg") // Cargamos la imagen del fondo.
        //Boton:
        this.load.image('atras', "/assets/juego/TruthOrDare/imagenes/VolverAtras.jpg"); // Cargamos la imagen de volver atras (provisional).
        // Panel:
        this.load.image('panel', "/assets/juego/MetroSkaters/imagenes/Panel.PNG"); // Cargamos la imagen del panel inferior.
        // Letras:
        this.load.image('A', "/assets/juego/MetroSkaters/imagenes/A.jpg");
        this.load.image('S', "/assets/juego/MetroSkaters/imagenes/S.jpg");
        this.load.image('D', "/assets/juego/MetroSkaters/imagenes/D.jpg");
        this.load.image('F', "/assets/juego/MetroSkaters/imagenes/F.jpg");
        // Obstaculos:
        this.load.image('OVNI', "/assets/juego/MetroSkaters/imagenes/ovni2.png");
        this.load.image('nube', "/assets/juego/MetroSkaters/imagenes/Nube.jpg");
    }

    create() {
        this.puntFict = 0; // Puntuacion ficticia.
        this.avionAcc = false; // Booleano para saber la accion del avion.
        this.secuenciaAcc = false; // Booleano para saber la accion de la secuencia.
        this.decision = false; // Booleano para saber si hay decision.
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
        this.A = this.add.sprite(0, 500, 'A').setOrigin(0, 0).setScale(0.2, 0.2).setVisible(false).setDepth(1);
        this.S = this.add.sprite(0, 500, 'S').setOrigin(0, 0).setScale(0.1, 0.08).setVisible(false).setDepth(1);
        this.D = this.add.sprite(0, 500, 'D').setOrigin(0, 0).setScale(0.2, 0.2).setVisible(false).setDepth(1);
        this.F = this.add.sprite(0, 500, 'F').setOrigin(0, 0).setScale(0.2, 0.2).setVisible(false).setDepth(1);
        this.A2 = this.add.sprite(0, 620, 'A').setOrigin(0, 0).setScale(0.2, 0.2).setVisible(false).setDepth(1);
        this.S2 = this.add.sprite(0, 620, 'S').setOrigin(0, 0).setScale(0.1, 0.08).setVisible(false).setDepth(1);
        this.D2 = this.add.sprite(0, 620, 'D').setOrigin(0, 0).setScale(0.2, 0.2).setVisible(false).setDepth(1);
        this.F2 = this.add.sprite(0, 620, 'F').setOrigin(0, 0).setScale(0.2, 0.2).setVisible(false).setDepth(1);

        // Ponemos los obstaculos con su fisicas:
        this.ovni = this.add.sprite(500, 200, 'OVNI').setOrigin(0, 0).setScale(0.2, 0.2).setVisible(true).setDepth(1);
        //this.nube1 = this.add.sprite(1000, 100, 'nube').setOrigin(0, 0).setScale(0.2, 0.2).setVisible(true).setDepth(1);
        //this.nube2 = this.add.sprite(1000, 100, 'nube').setOrigin(0, 0).setScale(0.2, 0.2).setVisible(true).setDepth(1);
        this.physics.add.existing(this.ovni);
        //this.physics.add.existing(this.nube1);
        //this.physics.add.existing(this.nube2);

        // Boton de volver atras:
        this.atras.on('pointerdown', (pointer) => {
            this.finalDelJuego()
        });

        this.posiciones = [200, 300, 400, 500]; // Posiciones en x para la aparicion de las letras de las secuencias.
        let obstaculos = [[0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 0], [1, 0, 1], [1, 1, 0]]; // Array de arrays de obstaculos: 0 no hay, 1 si hay.
        let secuencias = ["ASDF", "ASFD", "ADSF", "ADFS", "AFSD", "AFDS", "SDFA", "SDAF", "SFDA", "SFAD", "SAFD", "SADF", "DSFA", "DSAF", "DFSA", "DFAS", "DAFS", "DASF", "FSDA", "FSAD", "FDSA", "FDAS", "FADS"];
        //let secuencias2 = ["ALSK", "QPEB", "BNPM", "GHTY", "SVPM", "AZCR", "PHGT", "VGLK", "HTML", "SPQR", "VINO", "LSFR", "ERNT", "XRLQ", "POTE", "GOPZ", "AGMI", "FRIM", "COME", "FINA", "OKEY", "COKA", "ZULO"];  // Array de posibles combinaciones.

        // Creacion de las cosas que estaran en la escena:
        this.generador = new Generador(this, 0, 0, obstaculos, secuencias); // Generador de cosas.
        this.avion = new Avion(this, 400, 250); // El avion.
        this.secuenciaTeclas = new secuanciaTeclas(this, 0, 450); // La secuencia de teclas.

        // Detectar la eleccion de la accion del jugador.
        this.input.keyboard.on('keydown', (event) => { // Miramos cualquier tecla.
            if (!this.decision) { // Solo si se permite una accion miramos cual puede ser.
                if (event.key === "ArrowUp" || event.key === "ArrowDown") { // Accion 1: mover al avion.
                    console.log("Seleccion: avion.");
                    this.obs = this.generador.osbtaculoGenerador();
                    this.avionAcc = true;
                    this.decision = true;
                }
                else if (event.key === "a" || event.key === "s" || event.key === "d" || event.key === "f") { // Accion 2: secuancia de teclas.
                    console.log("Selecion: teclas.");
                    this.sec = this.generador.secuenciaGenerador();
                    this.secuenciaAcc = true;
                    this.decision = true;
                }
            }
        });
    }

    update() {
        //console.log("Sec: " + this.sec);
        console.log("Obs: " + this.obs);

        if (this.decision && this.avionAcc && !this.secuenciaAcc) // Accion avion.
        {
            this.movientoAvion()
           if(this.ovni.x>0){
            this.ovni.body.setVelocityX(-50);
           
           }else if(true){

           }
            this.physics.world.collide(this.avion, this.ovni, function() {
                console.log('Colisión entre sprite1 y sprite2');
                // Aquí puedes realizar acciones adicionales cuando hay colisión
            });
        }
        else if (this.decision && this.secuenciaAcc && !this.avionAcc) // Accion secuencia.
        {
            this.mostrarSecuencia(); // Render de la secuencia.
            if (this.i < 4) // Cuatro secuencias.
            {
                if (this.j < 4) // Cuatro letras de la secuencia.
                {
                    if (this.teclasSecuencia()) {
                        if (this.sec[this.j] != this.playerSec[this.j]) {
                            this.j = 5;
                            this.puntFict--;
                        }
                        this.j++;
                        //console.log("1: j: " + this.j + " i: " + this.i);
                        //console.log("2: sec: " + this.sec + " playerSec: " + this.playerSec);
                    }
                }
                else // Cuando la secuencia del jugador tiene ya 4 letras.
                {
                    if (this.j === 4) {
                        this.puntFict++;
                        //puntuacionofiacial++;
                    }
                    this.j = 0; // Ponemos el contador de letras a 0 otra vez.
                    this.i++; // Sumamos al contador de secuencias.
                    this.playerSec = ""; // Reseteamos la secuencia.
                    this.sec = this.generador.secuenciaGenerador(); // Generamos otra secuencia aleatoria.
                    //console.log("3: j: " + this.j + " i: " + this.i);
                    //console.log("4: sec: " + this.sec + " playerSec: " + this.playerSec);
                    console.log("PUNTUACIONFICT: " + this.puntFict);
                    this.A2.setVisible(false);
                    this.S2.setVisible(false);
                    this.D2.setVisible(false);
                    this.F2.setVisible(false);
                }
            }
            else // Cuando haya hecho 4 secuencias.
            {
                this.reset();
                //console.log("5: i: " + this.i + " j: " + this.j);
                //console.log("6: sec: " + this.sec + " playerSec: " + this.playerSec);
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
            this.A2.x = this.posiciones[this.j];
            this.A2.setVisible(true);
            return true;
        }
        else if (Phaser.Input.Keyboard.JustUp(this.sKey)) {
            this.playerSec += "S";
            this.S2.x = this.posiciones[this.j];
            this.S2.setVisible(true);
            return true;
        }
        else if (Phaser.Input.Keyboard.JustUp(this.dKey)) {
            this.playerSec += "D";
            this.D2.x = this.posiciones[this.j];
            this.D2.setVisible(true);
            return true;
        }
        else if (Phaser.Input.Keyboard.JustUp(this.fKey)) {
            this.playerSec += "F";
            this.F2.x = this.posiciones[this.j];
            this.F2.setVisible(true);
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
            this.A.setVisible(false);
            this.S.setVisible(false);
            this.D.setVisible(false);
            this.F.setVisible(false);
            this.A2.setVisible(false);
            this.S2.setVisible(false);
            this.D2.setVisible(false);
            this.F2.setVisible(false);
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