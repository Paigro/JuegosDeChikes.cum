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
       // this.load.image('atras', "./assets/juego/TruthOrDare/imagenes/VolverAtras.jpg"); // Cargamos la imagen de volver atras (provisional).
        // Avion:
        this.load.image('avion', "./assets/juego/MetroSkaters/imagenes/Avion.png"); // Cargamos la imagen del avion.
        this.load.image('avionAparece', "./assets/juego/MetroSkaters/imagenes/AvionAparece.png"); // Cargamos la imagen del avion.
        // Panel:
        this.load.image('panel', "./assets/juego/MetroSkaters/Panel.png"); // Cargamos la imagen del panel inferior.
        // Letras:
        this.load.image('a', "./assets/juego/MetroSkaters/imagenes/A.png");
        this.load.image('s', "./assets/juego/MetroSkaters/imagenes/S.png");
        this.load.image('d', "./assets/juego/MetroSkaters/imagenes/D.png");
        this.load.image('f', "./assets/juego/MetroSkaters/imagenes/F.png");
        this.load.image('g', "./assets/juego/MetroSkaters/imagenes/G.png");
        this.load.image('h', "./assets/juego/MetroSkaters/imagenes/H.png");
        this.load.image('i', "./assets/juego/MetroSkaters/imagenes/I.png");
        this.load.image('j', "./assets/juego/MetroSkaters/imagenes/J.png");
        this.load.image('k', "./assets/juego/MetroSkaters/imagenes/K.png");
        this.load.image('l', "./assets/juego/MetroSkaters/imagenes/L.png");
        this.load.image('m', "./assets/juego/MetroSkaters/imagenes/M.png");
        this.load.image('p', "./assets/juego/MetroSkaters/imagenes/P.png");
        this.load.image('q', "./assets/juego/MetroSkaters/imagenes/Q.png");
        this.load.image('r', "./assets/juego/MetroSkaters/imagenes/R.png");
        this.load.image('v', "./assets/juego/MetroSkaters/imagenes/V.png");
        // Obstaculos:
        this.load.image('OVNI', "./assets/juego/MetroSkaters/imagenes/Ovni.png");
        this.load.image('obstaculo', "./assets/juego/MetroSkaters/imagenes/Avion2.png");
        // Exclamacion:
        this.load.image('exclamacion', "./assets/juego/MetroSkaters/imagenes/Exclamacion.png");
        // Animaciones:
        this.load.spritesheet("explosion", "./assets/juego/MetroSkaters/imagenes/Explosion.png", { frameWidth: 120, frameHeight: 120 });
        // Cosas para mostrar como tutorial:
        this.load.image('derecha', "./assets/juego/MetroSkaters/imagenes/tecladerecha.png")
        this.load.image('izquierda', "./assets/juego/MetroSkaters/imagenes/teclaizquierda.png")
        this.load.image('teclado', "./assets/juego/MetroSkaters/imagenes/teclado.png")
    }

    create() {
        //#region parametros.
        // Tiempo:
        this.time = 60;
        this.contador = this.add.text(16, 16, "Time: 0", { fontSize: '40px', fill: '#fff', fontFamily: 'Comic Sans MS' }).setPosition(0, 60).setDepth(3); // Texto para mostrar la puntuacion.
        // Booleanos para controlar el juego:
        this.hayAlgo = false; // Para saber si hay cosas generadas.
        this.waitTime = true; // Para que hay un tiempo de espera entre acciones.
        this.avionAcc = false; // Para saber si esta en la accion del avion.
        this.secuenciaAcc = false; // Para saber si esta en la accion de la secuencia.
        this.decision = false; // Para saber si hay decision del jugador.
        // Puntuacion:
        this.puntFict = 0; // Puntuacion ficticia.
        this.DetGen = 0; // Puntuacion del test.
        this.marcador = this.add.text(16, 16, "Score: 0", { fontSize: '40px', fill: '#fff', fontFamily: 'Comic Sans MS' }).setPosition(0, 10).setDepth(3); // Texto para mostrar la puntuacion.
        // Otros:
        this.sec = ""; // Secuencia generada aleatoriamente.
        this.elapsedTime = 0; // Para calcular el tiempo de espera.
        /*// Boton de volver atras (provisional):
        this.atras = this.add.image(1000, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive().setDepth(3);
        this.atras.on('pointerdown', (pointer) => {
            this.finalDelJuego()
        });*/
        // Para cubrir la accion que no has elegido.
        this.rectNegro = this.add.graphics();
        this.rectNegro.fillStyle(0x000000, 0.5).fillRect(0, 0, 1080, 450).setDepth(2).setVisible(false);
        //#endregion
        //#region sprites
        // Teclas para mover el avion:
        this.rightKey = this.input.keyboard.addKey('RIGHT'); // Flecha derecha.
        this.leftKey = this.input.keyboard.addKey('LEFT'); // Flecha izquierda.
        // Letras (ocultas al principio):
        this.letra1 = this.add.sprite(330, 500, 'a').setOrigin(0, 0).setScale(1.3, 1.4).setVisible(false).setDepth(1);
        this.letra2 = this.add.sprite(450, 500, 's').setOrigin(0, 0).setScale(1.3, 1.4).setVisible(false).setDepth(1);
        this.letra3 = this.add.sprite(580, 500, 'd').setOrigin(0, 0).setScale(1.3, 1.4).setVisible(false).setDepth(1);
        this.letra4 = this.add.sprite(690, 500, 'f').setOrigin(0, 0).setScale(1.3, 1.4).setVisible(false).setDepth(1);
        this.letraP1 = this.add.sprite(330, 610, 'a').setOrigin(0, 0).setScale(1.3, 1.4).setVisible(false).setDepth(1);
        this.letraP2 = this.add.sprite(450, 610, 's').setOrigin(0, 0).setScale(1.3, 1.4).setVisible(false).setDepth(1);
        this.letraP3 = this.add.sprite(580, 610, 'd').setOrigin(0, 0).setScale(1.3, 1.4).setVisible(false).setDepth(1);
        this.letraP4 = this.add.sprite(690, 610, 'f').setOrigin(0, 0).setScale(1.3, 1.4).setVisible(false).setDepth(1);
        // Exclamaciones (ocultas al principio):
        this.exclamacion1 = this.add.sprite(0, 200, 'exclamacion').setOrigin(0, 0).setVisible(false).setDepth(1);
        this.exclamacion2 = this.add.sprite(0, 200, 'exclamacion').setOrigin(0, 0).setVisible(false).setDepth(1);
        this.exclamacion3 = this.add.sprite(0, 200, 'exclamacion').setOrigin(0, 0).setVisible(false).setDepth(1);
        // Obstaculos con sus fisicas (ocultos al principio) e inmovibles:
        this.ovni = this.add.sprite(1080, 200, 'OVNI').setOrigin(0, 0).setVisible(false).setDepth(1).setInteractive();
        this.obstaculo1 = this.add.sprite(1080, 200, 'obstaculo').setScale(1.5, 1.5).setOrigin(0, 0).setVisible(true).setDepth(1).setInteractive();
        this.obstaculo2 = this.add.sprite(1080, 200, 'obstaculo').setScale(1.5, 1.5).setOrigin(0, 0).setVisible(true).setDepth(1).setInteractive();
        this.physics.add.existing(this.ovni);
        this.physics.add.existing(this.obstaculo1);
        this.physics.add.existing(this.obstaculo2);
        this.ovni.body.setImmovable(true).setSize(60, 60, true);
        this.obstaculo1.body.setImmovable(true).setSize(60, 60, true);
        this.obstaculo2.body.setImmovable(true).setSize(60, 60, true);
        this.obstaculo1.yaEjecutado = false;
        this.obstaculo2.yaEjecutado = false;
        this.ovni.yaEjecutado = false;
        // Cosas para mostrar al jugador al principio:
        this.tecladerecha = this.add.image(740, 300, 'derecha').setScale(0.5, 0.5).setDepth(4);
        this.teclaizquierda = this.add.image(300, 300, 'izquierda').setScale(0.5, 0.5).setDepth(4);
        this.teclado = this.add.image(185, 597, 'teclado').setScale(0.9, 0.9).setDepth(4);
        //#endregion
        //#region objetos del juego
        // Arrays de posibles combinaciones de obstaculos y secuencias:
        let obstaculos = [[0, 1, 2, 0], [1, 0, 3, 2], [0, 2, 1, 0], [0, 2, 0, 1], [0, 0, 1, 2], [0, 0, 2, 1], [1, 0, 2, 0], [1, 0, 0, 2], [1, 2, 0, 0], [1, 0, 2, 0], [2, 0, 1, 0], [2, 0, 0, 1], [2, 1, 0, 0], [2, 3, 1, 0], [2, 3, 0, 1], [0, 1, 0, 2]];
        let secuencias = ["adfj", "adfs", "adsf", "afgh", "afkd", "aghd", "agmi", "ajgf", "akfj", "aldf", "alfs", "dagk", "dalk", "dfas", "dflk", "dsfa", "fdka", "fdks", "fsda", "gafk", "gldk", "glah", "glhf", "hflk", "hafl", "jaja", "java", "jdsa", "jsjs", "kahd", "kafd", "kalh", "kjhl", "klgj", "lgas", "lhkf", "ljah", "lpgr", "sgha", "sglf", "sjga", "sjha", "spqr"];        // Creacion de las cosas que estaran en la escena:
        // Cosas de la escena:
        this.generador = new Generador(this, 0, 0, obstaculos, secuencias); // Generador de cosas.
        this.avion = new Avion(this, 520, 270); // El avion.
        this.secuencia = new secuenciaTeclas(this, 0, 450); // La secuencia de teclas.
        //#endregion
        //#region animacions y twinks
        // Animaciones:
        this.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNumbers("explosion", { start: 0, end: 4 }),
            frameRate: 6,
            repeat: 0
        });
        // Twinks:
        this.avion.on('animationcomplete-explosion', () => {
            this.avion.setY(750).setX(520).setScale(3, 3).setTexture('avionAparece');
            this.tweens.add({
                targets: this.avion,
                y: 270,
                duration: 1500, // Duracion.
                ease: 'Out', // No veo diferencia entre las diferentes opciones asi que se queda esta.
                yoyo: false, // No es yoyo.
                repeat: 0, // Solo se hace una vez.
                persist: true,
                onComplete: () => { // Cuando se acaba volvemos a poner el avion desde atras.
                    this.avion.setTexture('avion');
                }
            })
            this.tweens.add({
                targets: this.avion,
                scaleX: 1.6,
                scaleY: 1.6,
                duration: 2000, // Duracion.
                ease: 'Out', // No veo diferencia entre las diferentes opciones asi que se queda esta.
                yoyo: false, // No es yoyo.
                repeat: 0, // Solo se hace una vez.
                persist: true
            })
        }, this);
        // Para cuando aparezcan los obstaculos:
        this.obstaculo1.on('setvisible', () => {
            this.obstaculo1.setScale(0.6, 0.6);
            this.tweens.add({
                targets: this.obstaculo1,
                scaleX: 1.6,
                scaleY: 1.6,
                duration: 1500,
                ease: 'Linear'
            });
        });
        this.obstaculo2.on('setvisible', () => {
            this.obstaculo2.setScale(0.6, 0.6);
            this.tweens.add({
                targets: this.obstaculo2,
                scaleX: 1.6,
                scaleY: 1.6,
                duration: 1500,
                ease: 'Linear'
            });
        });
        this.ovni.on('setvisible', () => {
            this.ovni.setScale(0.6, 0.6);
            this.tweens.add({
                targets: this.ovni,
                scaleX: 1.6,
                scaleY: 1.6,
                duration: 500,
                ease: 'Linear'
            });
        });
        // Twinks de las cosas que se le muestran al jugador al inicio:
        this.tweens.add({
            targets: this.tecladerecha,
            scale: 0.6,
            duration: 700, // Duracion.
            ease: 'Out', // No veo diferencia entre las diferentes opciones asi que se queda esta.
            yoyo: true, // No es yoyo.
            repeat: 1, // Solo se hace una vez.
            persist: true,
            onComplete: () => { // Cuando se acaba volvemos a poner el avion desde atras.
                this.tecladerecha.setVisible(false);
            }
        })
        this.tweens.add({
            targets: this.teclaizquierda,
            scale: 0.6,
            duration: 700, // Duracion.
            ease: 'Out', // No veo diferencia entre las diferentes opciones asi que se queda esta.
            yoyo: true, // No es yoyo.
            repeat: 1, // Solo se hace una vez.
            persist: true,
            onComplete: () => { // Cuando se acaba volvemos a poner el avion desde atras.
                this.teclaizquierda.setVisible(false);
            }
        })
        this.tweens.add({
            targets: this.teclado,
            scale: 1,
            duration: 700, // Duracion.
            ease: 'Out', // No veo diferencia entre las diferentes opciones asi que se queda esta.
            yoyo: true, // No es yoyo.
            repeat: 1, // Solo se hace una vez.
            persist: true,
            onComplete: () => { // Cuando se acaba volvemos a poner el avion desde atras.
                this.teclado.setVisible(false);
            }
        })
        //#endregion
        //#region input
        // Input para detectar la seleccion de la accion del jugador:
        this.input.keyboard.on('keydown', (event) => { // Miramos cualquier tecla.
            if (!this.decision && this.hayAlgo) { // Solo si se permite una accion y hya una opcion que tomar miramos cual puede ser.
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") { // Accion 1: mover al avion.
                    //log("Seleccion: avion.");
                    this.rectNegro.setPosition(0, 450).setVisible(true);
                    this.changeTestPunt(1);
                    this.avionAcc = true;
                    this.decision = true;
                }
                else if (event.key === "a" || event.key === "s" || event.key === "d" || event.key === "f" || event.key === "g" || event.key === "h" || event.key === "i" || event.key === "j" || event.key === "k" || event.key === "l" || event.key === "m" || event.key === "p" || event.key === "q" || event.key === "r" || event.key === "v") { // Accion 2: secuencia de teclas.
                    //console.log("Selecion: teclas.");
                    this.rectNegro.setPosition(0, 0).setVisible(true);
                    this.changeTestPunt(-1);
                    this.secuencia.setSec(this.sec);
                    this.secuenciaAcc = true;
                    this.decision = true;
                }
            }
        });
        // Input para las secuencias:
        this.input.keyboard.on('keydown', (event) => {
            if (this.decision && this.hayAlgo && this.secuenciaAcc) {
                if (event.key === "a" || event.key === "s" || event.key === "d" || event.key === "f" || event.key === "g" || event.key === "h" || event.key === "i" || event.key === "j" || event.key === "k" || event.key === "l" || event.key === "m" || event.key === "p" || event.key === "q" || event.key === "r" || event.key === "v") {
                    this.secuencia.teclasSecuencia(event.key);
                }
            }
        });

        //Salir al hub
        this.input.keyboard.on('keydown', (event) => { // Miramos cualquier tecla.

                if (event.key === "0" ) this.finalDelJuego()
            })
        //#endregion
    }

    update(time, delta) {
        // GENERACION DE COSAS, TIEMPO DE ESPERA Y TIEMPO FINAL:
        if (!this.hayAlgo && !this.waitTime && !this.decision) {
            // Logs:
            //console.log("Generado de cosas, esperando decision del jugador.");
            // Generacion aleatoria:
            this.sec = this.generador.secuenciaGenerador();
            this.obs = this.generador.osbtaculoGenerador();
            // Mostrarlo:
            this.secuencia.mostrarSecuencia(this.sec);
            this.avion.mostrarObstaculos(this.obs);
            // Poner que hay algo para que no se generen mas cosas:
            this.hayAlgo = true;
        }
        else if (this.waitTime && !this.hayAlgo && !this.decision && this.time >= 0) {
            //console.log("Tiempo que no hay nada.");
            if (this.elapsedTime >= 2500) {
                this.elapsedTime = 0;
                this.waitTime = false;
            }
            else this.elapsedTime += this.sys.game.loop.delta;
        }
        else if (!this.decision && this.time <= 0) {
            this.finalDelJuego();
        }
        // ACCIONES:
        if (this.decision && this.avionAcc && !this.secuenciaAcc) // Accion avion.
        {
            this.avion.meToca(this.obs);
        }
        // TIEMPO:
        this.time -= (delta / 1000);
        if (this.time >= 0) {
            this.contador.setText('Time: ' + this.time.toFixed(2));
        }
        else {
            this.contador.setText('Time: ' + "acabe usted la accion.");
        }

    }

    changePuntFict(pun) {
        this.puntFict += pun;
        this.marcador.setText('Puntuación: ' + this.puntFict);
        //console.log("PUNTUACION: " + this.puntFict);
    }

    changeTestPunt(pun) {
        this.DetGen += pun;
        if (this.DetGen == 0) { this.DetGen += pun; }
        console.log("TEST: " + this.DetGen);
    }

    reset() {
        this.rectNegro.setVisible(false);
        // Reseteo de las cosas de la secuencia:
        this.letra1.setVisible(false);
        this.letra2.setVisible(false);
        this.letra3.setVisible(false);
        this.letra4.setVisible(false);
        this.secuencia.reset();
        // Reseteo de las cosas de la accion del avion:
        this.exclamacion1.setVisible(false);
        this.exclamacion2.setVisible(false);
        this.exclamacion3.setVisible(false);
        this.ovni.setVisible(false);
        this.obstaculo1.setVisible(false);
        this.obstaculo2.setVisible(false);
        this.ovni.x = 1080;
        this.obstaculo1.x = 1080;
        this.obstaculo2.x = 1080;
        this.avion.reset();
        // Reseteo de los booleanos:
        this.secuenciaAcc = false;
        this.avionAcc = false;
        this.decision = false;
        this.hayAlgo = false;
        this.waitTime = true;
        //console.log("Reseteo de buenos dias.");
    }

    finalDelJuego() {
        this.reset();
        this.coor.SaveScore("DetGen", this.DetGen);
        console.clear();
        this.scene.start("resultadoTest", this.coor);
    }
}