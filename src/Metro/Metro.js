import Generador from "./Generador.js";
import Avion from "./avion.js";
import secuenciaTeclas from "./secuenciaTeclas.js";

export default class Metro extends Phaser.Scene // Manager de la escena del Metro Skaters.
{
    constructor() {
        super({ key: 'Metro', active: false }); // Nombre de la escena para el SceneManager
    }

    // Metodos init, preload, create, update:
    init(data) {
        this.coor = data;
        this.cameras.main.setBackgroundColor("#84E2FE");
    }

    preload() {
        // IMAGENES:
        // Boton:
        this.load.image('atras', "/assets/juego/TruthOrDare/imagenes/VolverAtras.jpg"); // Cargamos la imagen de volver atras (provisional).
        // Avion:
        this.load.image('avion', "/assets/juego/MetroSkaters/imagenes/Avion.png"); // Cargamos la imagen del avion.
        // Panel:
        this.load.image('panel', "/assets/juego/MetroSkaters/imagenes/Panel.png"); // Cargamos la imagen del panel inferior.
        // Letras:
        this.load.image('A', "/assets/juego/MetroSkaters/imagenes/A.png");
        this.load.image('S', "/assets/juego/MetroSkaters/imagenes/S.png");
        this.load.image('D', "/assets/juego/MetroSkaters/imagenes/D.png");
        this.load.image('F', "/assets/juego/MetroSkaters/imagenes/F.png");
        // Obstaculos:
        this.load.image('OVNI', "/assets/juego/MetroSkaters/imagenes/ovni2.png");
        this.load.image('nube', "/assets/juego/MetroSkaters/imagenes/Nube.jpg");
        // Exclamacion:
        this.load.image('exclamacion', "/assets/juego/MetroSkaters/imagenes/Exclamacion.png");
    }

    create() {
        // Booleanos para controlar el juego:
        this.hayAlgo = false; // Para saber si hay cosas generadas.
        this.waitTime = true; // Para que hay un tiempo de espera entre acciones.
        this.avionAcc = false; // Para saber si esta en la accion del avion.
        this.secuenciaAcc = false; // Para saber si esta en la accion de la secuencia.
        this.decision = false; // Para saber si hay decision del jugador.
        // Puntuacion:
        this.puntFict = 0; // Puntuacion ficticia.
        this.DetGen = 0; // Puntuacion del test
        this.marcador = this.add.text(16, 16, "Score: 0", { fontSize: '40px', fill: '#fff' }); // Texto para mostrar la puntuacion.
        this.marcador.setPosition(0, 10);//1080 - this.marcador.width
        // Otros:
        this.sec = ""; // Secuencia generada aleatoriamente.
        this.elapsedTime = 0; // Para calcular el tiempo de espera.

        // Nuevos bordes del mundo para el movimiento del avion:
        this.physics.world.setBounds(0, 0, 1080, 450);

        // Boton de volver atras (provisional):
        this.atras = this.add.image(1000, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive();
        this.atras.on('pointerdown', (pointer) => {
            this.finalDelJuego()
        });
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

        // Letras (ocultas al principio):
        this.A = this.add.sprite(0, 500, 'A').setOrigin(0, 0).setScale(1.3, 1.4).setVisible(false).setDepth(1);
        this.S = this.add.sprite(0, 500, 'S').setOrigin(0, 0).setScale(1.3, 1.4).setVisible(false).setDepth(1);
        this.D = this.add.sprite(0, 500, 'D').setOrigin(0, 0).setScale(1.3, 1.4).setVisible(false).setDepth(1);
        this.F = this.add.sprite(0, 500, 'F').setOrigin(0, 0).setScale(1.3, 1.4).setVisible(false).setDepth(1);
        this.A2 = this.add.sprite(0, 610, 'A').setOrigin(0, 0).setScale(1.3, 1.4).setVisible(false).setDepth(1);
        this.S2 = this.add.sprite(0, 610, 'S').setOrigin(0, 0).setScale(1.3, 1.4).setVisible(false).setDepth(1);
        this.D2 = this.add.sprite(0, 610, 'D').setOrigin(0, 0).setScale(1.3, 1.4).setVisible(false).setDepth(1);
        this.F2 = this.add.sprite(0, 610, 'F').setOrigin(0, 0).setScale(1.3, 1.4).setVisible(false).setDepth(1);
        // Exclamaciones (ocultas al principio):
        this.exclamacion1 = this.add.sprite(0, 200, 'exclamacion').setOrigin(0, 0).setVisible(false).setDepth(1);
        this.exclamacion2 = this.add.sprite(0, 200, 'exclamacion').setOrigin(0, 0).setVisible(false).setDepth(1);
        this.exclamacion3 = this.add.sprite(0, 200, 'exclamacion').setOrigin(0, 0).setVisible(false).setDepth(1);
        // Obstaculos con sus fisicas (ocultos al principio):
        this.ovni = this.add.sprite(1080, 200, 'OVNI').setOrigin(0, 0).setScale(0.05, 0.05).setVisible(false).setDepth(1);
        this.nube1 = this.add.sprite(1080, 200, 'nube').setOrigin(0, 0).setScale(0.05, 0.05).setVisible(true).setDepth(1);
        this.nube2 = this.add.sprite(1080, 200, 'nube').setOrigin(0, 0).setScale(0.05, 0.05).setVisible(true).setDepth(1);
        this.physics.add.existing(this.ovni);
        this.physics.add.existing(this.nube1);
        this.physics.add.existing(this.nube2);

        this.ovni.body.setImmovable(true);
        this.nube1.body.setImmovable(true);
        this.nube2.body.setImmovable(true);

        // Arrays de cosas:
        //let obstaculos = [[0, 0, 1], [0, 1, 0], [0, 1, 0], [0, 1, 2], [0, 2, 1], [1, 0, 2], [2, 0, 1], [1, 2, 0], [2, 1, 0]]; // Array de arrays de obstaculos: 0 no hay, 1 si hay.
        let obstaculos = [[0, 1, 2, 0], [0, 1, 3, 2], [0, 2, 1, 0], [0, 2, 0, 1], [0, 0, 1, 2], [0, 0, 2, 1], [1, 0, 2, 0], [1, 0, 0, 2], [1, 2, 0, 0], [1, 0, 2, 0], [2, 0, 1, 0], [2, 0, 0, 1], [2, 1, 0, 0], [2, 3, 1, 0], [0, 1, 0, 2]];
        let secuencias = ["asdf", "asfd", "adsf", "adfs", "afsd", "afds", "sdfa", "sdaf", "sfda", "sfad", "safd", "sadf", "dsfa", "dsaf", "dfsa", "dfas", "dafs", "dasf", "fsda", "fsad", "fdsa", "fdas", "fads"];
        //let secuencias2 = ["ALSK", "QPEB", "BNPM", "GHTY", "SVPM", "AZCR", "PHGT", "VGLK", "HTML", "SPQR", "VINO", "LSFR", "ERNT", "XRLQ", "POTE", "GOPZ", "AGMI", "FRIM", "COME", "FINA", "OKEY", "COKA", "ZULO"];  // Array de posibles combinaciones.

        // Creacion de las cosas que estaran en la escena:
        this.generador = new Generador(this, 0, 0, obstaculos, secuencias); // Generador de cosas.
        this.avion = new Avion(this, 400, 250); // El avion.
        this.secuencia = new secuenciaTeclas(this, 0, 450); // La secuencia de teclas.

        // INPUT:
        // Input para detectar la seleccion de la accion del jugador:
        this.input.keyboard.on('keydown', (event) => { // Miramos cualquier tecla.
            if (!this.decision && this.hayAlgo) { // Solo si se permite una accion y hya una opcion que tomar miramos cual puede ser.
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") { // Accion 1: mover al avion.
                    console.log("Seleccion: avion.");
                    this.avionAcc = true;
                    this.decision = true;
                }
                else if (event.key === "a" || event.key === "s" || event.key === "d" || event.key === "f") { // Accion 2: secuancia de teclas.
                    console.log("Selecion: teclas.");
                    this.secuencia.setSec(this.sec);
                    this.secuenciaAcc = true;
                    this.decision = true;
                }
            }
        });
        // Input para las secuencias:
        this.input.keyboard.on('keydown', (event) => {
            if (this.decision && this.hayAlgo && this.secuenciaAcc) {
                if (event.key === "a" || event.key === "s" || event.key === "d" || event.key === "f") {
                    this.secuencia.teclasSecuencia(event.key);
                }
            }
        });
    }

    update(time, delta) {
        // GENERACION DE COSAS Y TIEMPO DE ESPERA:
        if (!this.hayAlgo && !this.waitTime && !this.decision) {
            // Logs:
            console.log("Generado de cosas, esperando decision del jugador.");
            console.log("PUNTUACION: " + this.puntFict);
            console.log("TEST: " + this.DetGen);
            // Generacion aleatoria:
            this.sec = this.generador.secuenciaGenerador();
            this.obs = this.generador.osbtaculoGenerador();
            // Mostrarlo:
            this.secuencia.mostrarSecuencia(this.sec);
            this.avion.mostrarObstaculos(this.obs);
            // Poner que hay algo para que no se generen mas cosas:
            this.hayAlgo = true;
        }
        else if (this.waitTime && !this.hayAlgo && !this.decision) {
            console.log("Tiempo que no hay nada.")
            if (this.elapsedTime >= 3000) {
                this.elapsedTime = 0;
                this.waitTime = false;
            }
            else this.elapsedTime += this.sys.game.loop.delta;
        }
        // ACCIONES:
        if (this.decision && this.avionAcc && !this.secuenciaAcc) // Accion avion.
        {
            this.avion.meToca(this.obs);
            this.secuencia.noMeToca();
        }
        else if (this.decision && this.secuenciaAcc && !this.avionAcc) // Accion secuencia.
        {
            this.avion.noMeToca(this.obs);
        }
    }

    changePuntFict(pun) {
        this.puntFict += pun;
        this.marcador.setText('Puntuación: ' + this.puntFict);
    }

    changeTestPunt(pun) {
        this.DetGen += pun;
        if (this.DetGen === 0) { this.DetGen += pun; }
    }

    reset() {
        // Reseteo de las cosas de la accion de las secuencias:
        this.A.setVisible(false);
        this.S.setVisible(false);
        this.D.setVisible(false);
        this.F.setVisible(false);
        this.A2.setVisible(false);
        this.S2.setVisible(false);
        this.D2.setVisible(false);
        this.F2.setVisible(false);
        // Reseteo de las cosas de la accion del avion:
        this.obs = [0, 0, 0];
        this.avion.body.setVelocityX(0);
        this.exclamacion1.setVisible(false);
        this.exclamacion2.setVisible(false);
        this.exclamacion3.setVisible(false);
        this.ovni.setVisible(false);
        this.nube1.setVisible(false);
        this.nube2.setVisible(false);
        this.ovni.x = 1080;
        this.nube1.x = 1080;
        this.nube2.x = 1080;
        // Reseteo de los booleanos:
        this.secuenciaAcc = false;
        this.avionAcc = false;
        this.decision = false;
        this.hayAlgo = false;
        this.waitTime = true;
    }

    finalDelJuego() {
        this.avion.reset();
        this.secuencia.reset();
        this.reset();
        this.coor.SaveScore("DetGen", this.DetGen);
        console.clear();
        this.scene.start("Hub");
    }
} 