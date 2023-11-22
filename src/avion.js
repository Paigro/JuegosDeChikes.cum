export default class Avion extends Phaser.GameObjects.Sprite
{
constructor(scene, x, y) // Constructora.
{
super(scene, x, y); // Constructora padre.

this.direction = 0; // Direccion del avión:s 1 = arriba, 0 = quieto,-1 = abajo.

// Creamos las animaciones del avion:
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

// Seteamos las teclas para mover el avion:
this.upKey = this.scene.input.keyboard.addKey('UP'); // Arriba.
this.downKey = this.scene.input.keyboard.addKey('DOWN'); // Abajo.

// Agregamos al avion las físicas para que Phaser lo tenga en cuenta:
scene.physics.add.existing(this);

// Decimos que el avion colisiona con los límites del mundo (De momento choca con los limites).
this.body.setCollideWorldBounds();

}
preUpdate(t, dt)
{
    super.preUpdate(t, dt);

    if(this.upKey.isDown)
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
    }


}



}