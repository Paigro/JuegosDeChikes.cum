export default class secuanciaTeclas extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) // Constructora.
    {
        super(scene, x, y, 'panel'); // Constructora padre.

        //this.speed = 140; // Nuestra velocidad de movimiento será 140

        this.scene.add.existing(this).setOrigin(0, 0); // Añadir a la escena.

        this.direction = 0; // Direccion del avión:s 1 = arriba, 0 = quieto,-1 = abajo.

        console.log("Secuencia: Secuencia ha sido creada");

        this.posicionesSec = [330, 450, 580, 690]; // Posiciones en x para la aparicion de las letras de las secuencias.

        this.i = 0;
        this.j = 0;
        this.secBien; // Secuencias bien hechas.
        this.sec = "";
        this.playerSec = "";

        //scene.physics.add.existing(this);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    update() {

        //console.log(this.sec);
        if (this.i < 4) // Cuatro secuencias.
        {
            console.log("1: i: " + this.i + " j: " + this.j);
            console.log("2: sec: " + this.sec + " playerSec: " + this.playerSec);
            if (this.j >= 4) // Cuatro letras de la secuencia.
            {

                if (this.j === 4) {
                    this.scene.changePuntFict(50);
                    this.secBien++;
                }
                this.j = 0; // Reseteamos el numero de letra.
                this.playerSec = ""; // Reseteamos la secuencia.
                this.sec = this.scene.generador.secuenciaGenerador(); // Generamos otra secuencia aleatoria.
                this.i++; // Sumamos una secuencia.
                this.scene.A2.setVisible(false);
                this.scene.S2.setVisible(false);
                this.scene.D2.setVisible(false);
                this.scene.F2.setVisible(false);
                this.mostrarSecuencia(this.sec);
            }
        }
        if (this.i >= 4) {
            if (this.secBien === 4) {
                this.scene.changeTestPunt(-1); // Solo modifica la puntuacion del test si ha tenido las cuatro bien.
            }
            this.reset();
        }
    }

    mostrarSecuencia(sec) {
        console.log("Eyeyey");
        for (let i = 0; i < sec.length; i++) {
            // Hacemos visible la letra que toca en la posicion que toca:
            switch (sec[i]) {
                case 'a':
                    this.scene.A.x = this.posicionesSec[i];
                    this.scene.A.setVisible(true);
                    break;
                case 's':
                    this.scene.S.x = this.posicionesSec[i];
                    this.scene.S.setVisible(true);
                    break;
                case 'd':
                    this.scene.D.x = this.posicionesSec[i];
                    this.scene.D.setVisible(true);
                    break;
                case 'f':
                    this.scene.F.x = this.posicionesSec[i];
                    this.scene.F.setVisible(true);
                    break;
                default:
                    break;
            }
        }
    }

    teclasSecuencia(tecla) {
        console.log(tecla);
        console.log("buenos dias1");

        if (tecla == this.sec[this.j]) {
            console.log("buenos dias2");

            switch (tecla) {
                case 'a':
                    console.log("buenos dias3");

                    this.playerSec += "a";
                    this.scene.A2.x = this.posicionesSec[this.j];
                    this.scene.A2.setVisible(true);
                    break;
                case 's':
                    this.playerSec += "s";
                    this.scene.S2.x = this.posicionesSec[this.j];
                    this.scene.S2.setVisible(true);
                    break;
                case 'd':
                    this.playerSec += "d";
                    this.scene.D2.x = this.posicionesSec[this.j];
                    this.scene.D2.setVisible(true);
                    break;
                case 'f':
                    this.playerSec += "f";
                    this.scene.F2.x = this.posicionesSec[this.j];
                    this.scene.F2.setVisible(true);
                    break;
                default:
                    break;
            }
            this.j++;
        }
        else {
            this.j = 5; // Si falla una ponemos un numero mayor al de secuencias.
            this.scene.changePuntFict(-10);
        }
        this.update();
    }

    meToca(sec) {
        this.sec = sec;
        //this.mostrarSecuencia(sec);
        //this.update();
    }

    noMeToca() {

    }

    reset() {
        this.i = 0;
        this.j = 0;
        this.secBien = 0;
        this.playerSec = "";
        this.scene.reset();
    }
}