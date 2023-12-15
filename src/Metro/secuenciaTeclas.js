export default class secuanciaTeclas extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) // Constructora.
    {
        super(scene, x, y, 'panel'); // Constructora padre.

        //this.speed = 140; // Nuestra velocidad de movimiento será 140

        this.scene.add.existing(this).setOrigin(0, 0); // Añadir a la escena.

        this.direction = 0; // Direccion del avión:s 1 = arriba, 0 = quieto,-1 = abajo.

        console.log("Secuencia: Secuencia ha sido creada");

        this.i = 0;
        this.j = 0;
        this.secBien; // Secuencias bien hechas.
        this.sec;
        this.playerSec;

        //scene.physics.add.existing(this);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    update() {
        if (this.i < 4) // Cuatro secuencias.
        {
            if (this.j < 4) // Cuatro letras de la secuencia.
            {
                if (this.teclasSecuencia()) {
                    if (this.sec[this.j] != this.playerSec[this.j]) {
                        this.j = 5; // Si falla una ponemos un numero mayor al de secuencias.
                        this.scene.changePuntFict(-10);
                    }
                    this.j++; // Sumamos una letra.
                }
            }
            else // Cuando la secuencia del jugador tiene ya 4 letras.
            {
                if (this.j === 4) {
                    this.scene.changePuntFict(50);
                    this.scene.changeTestPunt(1);
                }
                this.j = 0; // Reseteamos el numero de letra.
                this.i++; // Sumamos una secuencia.
                this.playerSec = ""; // Reseteamos la secuencia.
                this.sec = this.scene.generador.secuenciaGenerador(); // Generamos otra secuencia aleatoria.
                this.scene.A2.setVisible(false);
                this.scene.S2.setVisible(false);
                this.scene.D2.setVisible(false);
                this.scene.F2.setVisible(false);
            }
        }
        else // Cuando haya hecho 4 secuencias.
        {
            if (this.secBien === 4) {
                this.scene.changeTestPunt(-1); // Solo modifica la puntuacion del test si ha tenido las cuatro bien,
            }
            this.reset();
            this.scene.reset();
            //console.log("1: i: " + this.i + " j: " + this.j);
            //console.log("2: sec: " + this.sec + " playerSec: " + this.playerSec);
        }
    }

    mostrarSecuencia(sec) {
        for (let i = 0; i < sec.length; i++) {
            // Hacemos visible la letra que toca en la posicion que toca:
            switch (sec[i]) {
                case 'A':
                    this.scene.A.x = this.scene.posicionesSec[i];
                    this.scene.A.setVisible(true);
                    break;
                case 'S':
                    this.scene.S.x = this.scene.posicionesSec[i];
                    this.scene.S.setVisible(true);
                    break;
                case 'D':
                    this.scene.D.x = this.scene.posicionesSec[i];
                    this.scene.D.setVisible(true);
                    break;
                case 'F':
                    this.scene.F.x = this.scene.posicionesSec[i];
                    this.scene.F.setVisible(true);
                    break;
                default:
                    break;
            }
        }
    }

    teclasSecuencia() {

        if (Phaser.Input.Keyboard.JustUp(this.scene.aKey)) {
            this.playerSec += "A";
            this.scene.A2.x = this.scene.posicionesSec[this.j];
            this.scene.A2.setVisible(true);
            return true;
        }
        else if (Phaser.Input.Keyboard.JustUp(this.scene.sKey)) {
            this.playerSec += "S";
            this.scene.S2.x = this.scene.posicionesSec[this.j];
            this.scene.S2.setVisible(true);
            return true;
        }
        else if (Phaser.Input.Keyboard.JustUp(this.scene.dKey)) {
            this.playerSec += "D";
            this.scene.D2.x = this.scene.posicionesSec[this.j];
            this.scene.D2.setVisible(true);
            return true;
        }
        else if (Phaser.Input.Keyboard.JustUp(this.scene.fKey)) {
            this.playerSec += "F";
            this.scene.F2.x = this.scene.posicionesSec[this.j];
            this.scene.F2.setVisible(true);
            return true;
        }
        else return false;
    }

    meToca(sec) {
        this.sec = sec;
        this.mostrarSecuencia(sec);
        this.teclasSecuencia();
        this.update();
    }

    noMeToca() {

    }

    reset() {

    }
}