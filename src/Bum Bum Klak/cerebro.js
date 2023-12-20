export default class cerebro extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y)    // constructor
    {
        super(scene, x, y, 'cerebro');  // constructora padre

        this.scene.add.existing(this).setScale(0.07, 0.07); // añadir a escena.
    }
}