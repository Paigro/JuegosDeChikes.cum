export default class bocadillo extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, scale, tipo)
    {
        super(scene, x, y, 'bocadillo');

        if(tipo == 0) this.scene.add.existing(this).setScale(scale, scale); // añadimos a escena
        else this.scene.add.existing(this).setScale(-scale, scale);
    }
}