export default class Avion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) // Constructora.
    {
        super(scene, x, y, 'avion'); // Llamada a la constructora padre.

        this.speed = 140; // Velocidad del avion.

        this.scene.add.existing(this).setScale(1.6, 1.6); // Añadir a la escena.

        console.log("Avion: Avion ha sido creado");

        // Creacion de las animaciones del avion:
        /*this.scene.anims.create({ // Anmimacion para cuando el avion esta volando y no pasa nada mas.
            key: 'flying',
            frames: scene.anims.generateFrameNumbers('knight', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({ // Animacion para cuando el avion este ascendiendo.
            key: 'up',
            frames: scene.anims.generateFrameNumbers('knight', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({ // Animacion para cuando el avion este descendiendo.
            key: 'down',
            frames: scene.anims.generateFrameNumbers('knight', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({ // Animacion para cuando el avion choque contra algo.
            key: 'crash',
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

        // ANIMACIONES DEL AVION (DEBERIAN DE SER TWINKS MAS QUE ANIMACIONES)
        /*if(this.upKey.isDown)
        {
            if(this.anims.currentAnim.key !== 'up'){
                this.play('up');
            }
        }
        if(this.downKey.isDown)
        {
            if(this.anims.currentAnim.key !== 'down'){
                this.play('down');
            }
        }*/
    }
    update() {

    }
}