export default class Avion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) // Constructora.
    {
        super(scene, x, y, 'avion'); // Llamada a la constructora padre.

        console.log("Avion: Avion ha sido creado");

        scene.physics.add.existing(this); // Agregamos las fisicas.

        this.scene.add.existing(this).setScale(1.6, 1.6); // Añadir a la escena.

        this.body.setCollideWorldBounds(); // El avion colisiona con los limites del mundo.

        this.speed = 300; // Velocidad del avion.
        this.timer = 0;
        this.timer2 = 0;
        this.posicionesObs = [75, 325, 575, 825]; // Array de posiciones en las que pueden aparecer los obstaculos.
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    update() {
        // Colisiones del avion con los obstaculos:
        this.scene.physics.world.collide(this, this.scene.ovni, () => {
            this.scene.changePuntFict(-50);
            this.anims.play('explosion', true);
            this.reset();
        });
        this.scene.physics.world.collide(this, this.scene.nube1, () => {
            this.scene.changePuntFict(-50);
            this.anims.play('explosion', true);
            this.reset();
        });
        this.scene.physics.world.collide(this, this.scene.nube2, () => {
            this.scene.changePuntFict(-50);
            this.anims.play('explosion', true);
            this.reset();
        });
        // Si el jugador no colisiona con ningin obstaculo:
        if (this.timer2 >= 5000) {
            this.scene.changePuntFict(100);
            this.scene.changeTestPunt(1);
            this.reset();
        }
        this.timer2 += this.scene.sys.game.loop.delta;
    }

    movientoAvion() {
        if (this.scene.rightKey.isDown) {
            this.body.setVelocityX(this.speed);
        }
        else if (this.scene.leftKey.isDown) {
            this.body.setVelocityX(-this.speed);
        }
        else if (Phaser.Input.Keyboard.JustUp(this.scene.upKey) || Phaser.Input.Keyboard.JustUp(this.scene.downKey) || Phaser.Input.Keyboard.JustUp(this.scene.rightKey) || Phaser.Input.Keyboard.JustUp(this.scene.leftKey)) {
            this.body.setVelocityX(0);
        }
    }

    mostrarObstaculos(obs) {
        for (let i = 0; i < obs.length; i++) {
            switch (obs[i]) {
                case 0:
                    break;
                case 1:
                    if (this.timer >= 2000) {
                        this.scene.nube2.x = this.posicionesObs[i];
                        this.scene.exclamacion3.setVisible(false);
                        this.scene.nube2.setVisible(true);
                    }
                    else {
                        this.scene.exclamacion3.x = this.posicionesObs[i];
                        this.scene.exclamacion3.setVisible(true);
                        this.timer += this.scene.sys.game.loop.delta;
                    }
                    break;
                case 2:
                    if (this.timer >= 2000) {
                        this.scene.nube1.x = this.posicionesObs[i];
                        this.scene.exclamacion2.setVisible(false);
                        this.scene.nube1.setVisible(true);
                    }
                    else {
                        this.scene.exclamacion2.x = this.posicionesObs[i];
                        this.scene.exclamacion2.setVisible(true);
                        this.timer += this.scene.sys.game.loop.delta;
                    }
                    break;
                case 3:
                    if (this.timer >= 2000) {
                        this.scene.ovni.x = this.posicionesObs[i];
                        this.scene.exclamacion1.setVisible(false);
                        this.scene.ovni.setVisible(true);
                    }
                    else {
                        this.scene.exclamacion1.x = this.posicionesObs[i];
                        this.scene.exclamacion1.setVisible(true);
                        this.timer += this.scene.sys.game.loop.delta;
                    }
                    break;
                default:
                    break;
            }
        }
    }

    meToca(obs) {
        this.mostrarObstaculos(obs);
        this.movientoAvion();
        this.update();
    }

    noMeToca() {





        //oscurecer parte de arriba y hacer que el avion se mueva solo a un hueco sin obstaculo.







    }

    reset() {
        this.timer = 0;
        this.timer2 = 0;
        this.scene.reset();
    }
}