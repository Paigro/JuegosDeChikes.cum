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
    init(data) {
        this.coor = data;
        this.cameras.main.setBackgroundColor("#84E2FE");

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
        // Exclamacion:
        this.load.image('exclamacion', "/assets/juego/MetroSkaters/imagenes/exclamacion.jpg");
    }

    create() {

        this.hayAlgo = false;
        this.waitTime = true;
        this.puntFict = 0; // Puntuacion ficticia.
        this.avionAcc = false; // Booleano para saber la accion del avion.
        this.secuenciaAcc = false; // Booleano para saber la accion de la secuencia.
        this.decision = false; // Booleano para saber si hay decision.
        this.colision = false;
        this.playerSec = ""; // Secuencia del jugador.
        this.i = 0; // Para que se hagan 4 acciones: 4 obstaculos o 4 secuencias.
        this.j = 0; // Para las secuencias: que solo se lean 4 letras antes de comprobar.
        this.timer = 0;
        this.timer2 = 0;
        this.elapsedTime = 0;
        this.DetGen = 0; // Puntuacion del test
        this.secBien = 0;

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
        // Exclamaciones:
        this.exclamacion1 = this.add.sprite(0, 200, 'exclamacion').setOrigin(0, 0).setScale(0.4, 0.4).setVisible(false).setDepth(1);
        this.exclamacion2 = this.add.sprite(0, 200, 'exclamacion').setOrigin(0, 0).setScale(0.4, 0.4).setVisible(false).setDepth(1);
        // Ponemos los obstaculos con su fisicas:
        this.ovni = this.add.sprite(1080, 200, 'OVNI').setOrigin(0, 0).setScale(0.05, 0.05).setVisible(false).setDepth(1);
        this.nube1 = this.add.sprite(1080, 200, 'nube').setOrigin(0, 0).setScale(0.05, 0.05).setVisible(true).setDepth(1);
        //this.nube2 = this.add.sprite(1000, 100, 'nube').setOrigin(0, 0).setScale(0.2, 0.2).setVisible(true).setDepth(1);
        this.physics.add.existing(this.ovni);
        this.physics.add.existing(this.nube1);
        //this.physics.add.existing(this.nube2);

        this.ovni.body.setImmovable(true);
        this.nube1.body.setImmovable(true);
        //this.nube2.body.setImmovable(true);

        // Boton de volver atras:
        this.atras.on('pointerdown', (pointer) => {
            this.finalDelJuego()
        });

        this.posicionesSec = [200, 300, 400, 500]; // Posiciones en x para la aparicion de las letras de las secuencias.


        //RECUERDA ESTO PABLO:













        // Pablo no te olvides de esto:


        // Cambiar a 4 posiciones porque sino queda muy vacio.
        this.posicionesObs = [150, 400, 650];






        // Mas arriba. :/



        // Pablo mira arriba.









        let obstaculos = [[0, 0, 1], [0, 1, 0], [0, 1, 0], [0, 1, 2], [0, 2, 1], [1, 0, 2], [2, 0, 1], [1, 2, 0], [2, 1, 0]]; // Array de arrays de obstaculos: 0 no hay, 1 si hay.
        let secuencias = ["ASDF", "ASFD", "ADSF", "ADFS", "AFSD", "AFDS", "SDFA", "SDAF", "SFDA", "SFAD", "SAFD", "SADF", "DSFA", "DSAF", "DFSA", "DFAS", "DAFS", "DASF", "FSDA", "FSAD", "FDSA", "FDAS", "FADS"];
        //let secuencias2 = ["ALSK", "QPEB", "BNPM", "GHTY", "SVPM", "AZCR", "PHGT", "VGLK", "HTML", "SPQR", "VINO", "LSFR", "ERNT", "XRLQ", "POTE", "GOPZ", "AGMI", "FRIM", "COME", "FINA", "OKEY", "COKA", "ZULO"];  // Array de posibles combinaciones.

        // Creacion de las cosas que estaran en la escena:
        this.generador = new Generador(this, 0, 0, obstaculos, secuencias); // Generador de cosas.
        this.avion = new Avion(this, 400, 250); // El avion.
        this.secuenciaTeclas = new secuanciaTeclas(this, 0, 450); // La secuencia de teclas.

        // Detectar la eleccion de la accion del jugador.
        this.input.keyboard.on('keydown', (event) => { // Miramos cualquier tecla.
            if (!this.decision && this.hayAlgo) { // Solo si se permite una accion y hya una opcion que tomar miramos cual puede ser.
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") { // Accion 1: mover al avion.
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
    // Para pasarle keys a un objeto. this.akey=scene.input.keyboard.addkey(keysconfig.a); y el keys config se lo pasas desde la constructora del objeto.
    update(time, delta) {
        //console.log("Sec: " + this.sec);
        //console.log("Obs: " + this.obs);
        if (!this.hayAlgo && !this.waitTime && !this.decision) {
            console.log("Generado de cosas, esperando decision del jugador.");
            this.sec = this.generador.secuenciaGenerador();
            this.obs = this.generador.osbtaculoGenerador();
            this.mostrarSecuencia();
            this.mostrarObstaculos();
            this.hayAlgo = true;
        } else if (this.waitTime && !this.hayAlgo && !this.decision) {
            console.log("Tiempo que no hay nada.")
            if (this.elapsedTime >= 3000) {
                this.elapsedTime = 0;
                this.waitTime = false;
            } else this.elapsedTime += this.sys.game.loop.delta;
        }

        if (this.decision && this.avionAcc && !this.secuenciaAcc) // Accion avion.
        {
            this.mostrarObstaculos(); // Render de los obstaculos.
            this.movientoAvion() // Movimiento del avion.
            if (this.timer2 >= 5000) {
                this.puntFict += 100;
                this.DetGen++;
                if (this.DetGen === 0) { this.DetGen++; }
                console.log("PUNTUACION: " + this.puntFict);
                console.log("TEST: " + this.DetGen);
                this.reset();
            }
            // Colisiones del avion con los obstaculos:
            this.physics.world.collide(this.avion, this.ovni, () => {
                //console.log("Colision con ovni.");
                this.colision = true;
                this.puntFict -= 50;
                console.log("PUNTUACION: " + this.puntFict);
                console.log("TEST: " + this.DetGen);
                this.reset();
            });
            this.physics.world.collide(this.avion, this.nube1, () => {
                //console.log("Colision con nube.");
                this.colision = true;
                this.puntFict -= 50;
                console.log("PUNTUACION: " + this.puntFict);
                console.log("TEST: " + this.DetGen);
                this.reset();
            });
            this.timer2 += this.sys.game.loop.delta;
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
                            if (this.puntFict > 0) {
                                this.puntFict -= 10; // Solo resta puntuacion si hay puntuacion que restar.
                            }
                        }
                        this.j++; // Sumamos una letra.
                    }
                }
                else // Cuando la secuencia del jugador tiene ya 4 letras.
                {
                    if (this.j === 4) {
                        this.secBien++;
                        this.puntFict += 50;
                    }
                    this.j = 0; // Reseteamos el numero de letra.
                    this.i++; // Sumamos una secuencia.
                    this.playerSec = ""; // Reseteamos la secuencia.
                    this.sec = this.generador.secuenciaGenerador(); // Generamos otra secuencia aleatoria.
                    this.A2.setVisible(false);
                    this.S2.setVisible(false);
                    this.D2.setVisible(false);
                    this.F2.setVisible(false);
                }
            }
            else // Cuando haya hecho 4 secuencias.
            {
                //console.log("PUNTUACIONFICT: " + this.puntFict);
                if (this.secBien === 4) {
                    this.DetGen--;
                    if (this.DetGen === 0) { this.DetGen--; }
                }
                console.log("PUNTUACION: " + this.puntFict);
                console.log("TEST: " + this.DetGen);
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
        else if (this.rightKey.isDown) {
            this.avion.body.setVelocityX(this.avion.speed);
        }
        else if (this.leftKey.isDown) {
            this.avion.body.setVelocityX(-this.avion.speed);
        }
        else if (Phaser.Input.Keyboard.JustUp(this.upKey) || Phaser.Input.Keyboard.JustUp(this.downKey) || Phaser.Input.Keyboard.JustUp(this.rightKey) || Phaser.Input.Keyboard.JustUp(this.leftKey)) {
            this.avion.body.setVelocityY(0);
            this.avion.body.setVelocityX(0);
        }
    }

    teclasSecuencia() {

        if (Phaser.Input.Keyboard.JustUp(this.aKey)) {
            this.playerSec += "A";
            this.A2.x = this.posicionesSec[this.j];
            this.A2.setVisible(true);
            return true;
        }
        else if (Phaser.Input.Keyboard.JustUp(this.sKey)) {
            this.playerSec += "S";
            this.S2.x = this.posicionesSec[this.j];
            this.S2.setVisible(true);
            return true;
        }
        else if (Phaser.Input.Keyboard.JustUp(this.dKey)) {
            this.playerSec += "D";
            this.D2.x = this.posicionesSec[this.j];
            this.D2.setVisible(true);
            return true;
        }
        else if (Phaser.Input.Keyboard.JustUp(this.fKey)) {
            this.playerSec += "F";
            this.F2.x = this.posicionesSec[this.j];
            this.F2.setVisible(true);
            return true;
        }
        else return false;
    }

    mostrarSecuencia() {
        for (let i = 0; i < this.sec.length; i++) {
            // Hacemos visible la letra que toca en la posicion que toca:
            switch (this.sec[i]) {
                case 'A':
                    this.A.x = this.posicionesSec[i];
                    this.A.setVisible(true);
                    break;
                case 'S':
                    this.S.x = this.posicionesSec[i];
                    this.S.setVisible(true);
                    break;
                case 'D':
                    this.D.x = this.posicionesSec[i];
                    this.D.setVisible(true);
                    break;
                case 'F':
                    this.F.x = this.posicionesSec[i];
                    this.F.setVisible(true);
                    break;
                default:
                    break;
            }
        }
    }

    mostrarObstaculos() {
        for (let i = 0; i < this.obs.length; i++) {
            switch (this.obs[i]) {
                case 0:
                    break;
                case 1:
                    if (this.timer >= 2000) {
                        this.ovni.x = this.posicionesObs[i];
                        this.exclamacion1.setVisible(false);
                        this.ovni.setVisible(true);
                    }
                    else {
                        this.exclamacion1.x = this.posicionesObs[i];
                        this.exclamacion1.setVisible(true);
                        this.timer += this.sys.game.loop.delta;
                    }
                    break
                case 2:
                    if (this.timer >= 2000) {
                        this.nube1.x = this.posicionesObs[i];
                        this.exclamacion2.setVisible(false);
                        this.nube1.setVisible(true);
                    }
                    else {
                        this.exclamacion2.x = this.posicionesObs[i];
                        this.exclamacion2.setVisible(true);
                        this.timer += this.sys.game.loop.delta;
                    }
                    break;
                default:
                    break;
            }
        }

    }

    reset() {
        //if (this.secuenciaAcc && this.decision) {
        this.playerSec = "";
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
        this.secBien = 0;
        this.secuenciaAcc = false;
        this.decision = false;
        //console.log("Fin accion secuencias.");
        //}
        //else if (this.avionAcc && this.decision) {
        this.obs = [0, 0, 0];
        this.avion.body.setVelocityX(0);
        this.i = 0;
        this.exclamacion1.setVisible(false);
        this.exclamacion2.setVisible(false);
        this.ovni.setVisible(false);
        this.nube1.setVisible(false);
        this.ovni.x = 1080;
        this.nube1.x = 1080;
        this.colision = false;
        this.timer = 0;
        this.timer2 = 0;
        this.avionAcc = false;
        this.decision = false;
        //console.log("Fin accion avion.");
        this.hayAlgo = false;
        this.waitTime = true;
        //}
        //this.elapsedTime = 0;
    }

    finalDelJuego() {
        this.reset();
        this.coor.SaveScore("DetGen", this.DetGen);
        console.clear();
        this.scene.start("Hub");
    }
} 