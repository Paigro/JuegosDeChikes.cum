export default class Avion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) // Constructora.
    {
        super(scene, x, y, 'avion'); // Llamada a la constructora padre.

        console.log("Avion: avion ha sido creado");

        scene.physics.add.existing(this); // Agregamos las fisicas.

        this.scene.add.existing(this).setScale(1.6, 1.6); // Añadir a la escena.
        this.body.setSize(60, 60, true);

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
            this.scene.reset();
        });
        this.scene.physics.world.collide(this, this.scene.obstaculo1, () => {
            this.scene.changePuntFict(-50);
            this.anims.play('explosion', true);
            this.scene.reset();
        });
        this.scene.physics.world.collide(this, this.scene.obstaculo2, () => {
            this.scene.changePuntFict(-50);
            this.anims.play('explosion', true);
            this.scene.reset();
        });
        // Si el jugador no colisiona con ningun obstaculo:
        if (this.timer2 >= 4500) {
            this.scene.changePuntFict(100); // Sumamos puntuacion ficticia.
            this.scene.reset(); // Reseteamos todo. En vez de llamar al del avion llama al de la escena porque ese llama tanto al del avion como al de la secuencia.
        }
        this.timer2 += this.scene.sys.game.loop.delta;
    }

    movientoAvion() {
        if (this.scene.rightKey.isDown) { // Movimiento a la derecha.
            this.body.setVelocityX(this.speed);
            this.scene.tweens.add({ // Twink hacia la derecha.
                targets: this,
                angle: 20, // Angulo cuando se mueve a la derecha.
                duration: 500, // Duración del tween en milisegundos
                ease: 'Linear',
                onComplete: () => {
                    this.scene.tweens.add({ // Cuando acabe el avion vuelve a su angulo original.
                        targets: this,
                        angle: 0,  // Angulo del avion sin movimiento.
                        duration: 500, // Duracion.
                        ease: 'Linear',
                        onCompleteScope: this
                    });
                },
                onCompleteScope: this
            });
        }
        else if (this.scene.leftKey.isDown) { // Movimiento a la izquierda.
            this.body.setVelocityX(-this.speed);
            this.scene.tweens.add({ // Twink hacia la izquierda.
                targets: this,
                angle: -20, // Angulo cuando se mueve a la izquierda.
                duration: 500, // Duración.
                ease: 'Linear',
                onComplete: () => { // Cuando acabe el avion vuelve a su angulo original.
                    this.scene.tweens.add({
                        targets: this,
                        angle: 0,  // Angulo del avion sin movimiento.
                        duration: 500, // Duracion.
                        ease: 'Linear',
                        onCompleteScope: this
                    });
                },
                onCompleteScope: this
            });
        }
        // Cuando se deje de pulsar una tecla.
        else if (Phaser.Input.Keyboard.JustUp(this.scene.rightKey) || Phaser.Input.Keyboard.JustUp(this.scene.leftKey)) {
            this.body.setVelocityX(0);
            this.scene.tweens.add({
                targets: this,
                angle: 0,  // Angulo del avion sin movimiento.
                duration: 500, // Duracion.
                ease: 'Linear',
                onCompleteScope: this
            });
        }
    }

    mostrarObstaculos(obs) {
        for (let i = 0; i < obs.length; i++) {
            switch (obs[i]) {
                case 0:
                    break;
                case 1:
                    if (this.timer >= 2000) {
                        this.scene.obstaculo1.setX(this.posicionesObs[i]).setVisible(true);
                        this.scene.exclamacion1.setVisible(false);
                        if (!this.scene.obstaculo1.yaEjecutado) {
                            this.scene.obstaculo1.yaEjecutado = true;
                            this.scene.obstaculo1.emit('setvisible');
                        }
                    }
                    else {
                        this.scene.exclamacion1.setX(this.posicionesObs[i]).setVisible(true);
                        this.timer += this.scene.sys.game.loop.delta;
                    }
                    break;
                case 2:
                    if (this.timer >= 2000) {
                        this.scene.obstaculo2.setX(this.posicionesObs[i]).setVisible(true);
                        this.scene.exclamacion2.setVisible(false);
                        if (!this.scene.obstaculo2.yaEjecutado) {
                            this.scene.obstaculo2.yaEjecutado = true;
                            this.scene.obstaculo2.emit('setvisible');
                        }
                    }
                    else {
                        this.scene.exclamacion2.setX(this.posicionesObs[i]).setVisible(true);
                        this.timer += this.scene.sys.game.loop.delta;
                    }
                    break;
                case 3:
                    if (this.timer >= 2000) {
                        this.scene.ovni.setX(this.posicionesObs[i]).setVisible(true);
                        this.scene.exclamacion3.setVisible(false);
                        if (!this.scene.ovni.yaEjecutado) {
                            this.scene.ovni.yaEjecutado = true;
                            this.scene.ovni.emit('setvisible');
                        }
                    }
                    else {
                        this.scene.exclamacion3.setX(this.posicionesObs[i]).setVisible(true);
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
    
    reset() {
        this.scene.obstaculo1.yaEjecutado = false;
        this.scene.obstaculo2.yaEjecutado = false;
        this.scene.ovni.yaEjecutado = false;
        this.timer = 0;
        this.timer2 = 0;
        this.body.setVelocityX(0);
    }
}