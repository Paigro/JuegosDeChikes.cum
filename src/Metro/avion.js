export default class Avion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) // Constructora.
    {
        super(scene, x, y, 'avion'); // Llamada a la constructora padre.

        this.speed = 140; // Velocidad del avion.

        this.scene.add.existing(this).setScale(1.6, 1.6); // Añadir a la escena.

        console.log("Avion: Avion ha sido creado");

        this.timer = 0;
        this.timer2 = 0;

        // Creacion de las animaciones del avion:
        /*this.scene.anims.create({ // Anmimacion para cuando el avion esta volando y no pasa nada mas.
            key: 'flying',
            frames: scene.anims.generateFrameNumbers('knight', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });*/

        // Agregamos al avion las fisicas para que Phaser lo tenga en cuenta:
        scene.physics.add.existing(this);

        // Decimos que el avion colisiona con los limites del mundo (de momento choca con los limites).
        this.body.setCollideWorldBounds();
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    update() {
        // Colisiones del avion con los obstaculos:
        this.scene.physics.world.collide(this, this.scene.ovni, () => {
            this.scene.colision = true;
            //this.scene.puntFict -= 50;
            this.scene.changePuntFict(-50);
            this.reset();
        });
        this.scene.physics.world.collide(this, this.scene.nube1, () => {
            this.scene.colision = true;
            //this.scene.puntFict -= 50;
            this.scene.changePuntFict(-50);
            this.reset();
        });
        if (this.timer2 >= 5000) {
            this.scene.changePuntFict(100);
            this.scene.changeTestPunt(1);
            if (this.DetGen === 0) { this.DetGen++; }

            this.reset();

        }

        this.timer2 += this.scene.sys.game.loop.delta;
    }

    movientoAvion() {
        if (this.scene.upKey.isDown) {
            this.body.setVelocityY(-this.speed);
        }
        else if (this.scene.downKey.isDown) {
            this.body.setVelocityY(this.speed);
        }
        else if (this.scene.rightKey.isDown) {
            this.body.setVelocityX(this.speed);
        }
        else if (this.scene.leftKey.isDown) {
            this.body.setVelocityX(-this.speed);
        }
        else if (Phaser.Input.Keyboard.JustUp(this.scene.upKey) || Phaser.Input.Keyboard.JustUp(this.scene.downKey) || Phaser.Input.Keyboard.JustUp(this.scene.rightKey) || Phaser.Input.Keyboard.JustUp(this.scene.leftKey)) {
            this.body.setVelocityY(0);
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
                        this.scene.ovni.x = this.scene.posicionesObs[i];
                        this.scene.exclamacion1.setVisible(false);
                        this.scene.ovni.setVisible(true);
                    }
                    else {
                        this.scene.exclamacion1.x = this.scene.posicionesObs[i];
                        this.scene.exclamacion1.setVisible(true);
                        this.timer += this.scene.sys.game.loop.delta;
                    }
                    break
                case 2:
                    if (this.timer >= 2000) {
                        this.scene.nube1.x = this.scene.posicionesObs[i];
                        this.scene.exclamacion2.setVisible(false);
                        this.scene.nube1.setVisible(true);
                    }
                    else {
                        this.scene.exclamacion2.x = this.scene.posicionesObs[i];
                        this.scene.exclamacion2.setVisible(true);
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
    noMeToca(){
        
    }

    reset() {
        this.timer = 0;
        this.timer2 = 0;
        this.scene.reset();
    }
}