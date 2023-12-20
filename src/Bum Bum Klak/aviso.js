export default class aviso extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y)    // constructor
    {
        super(scene, x, y, 'aviso');  // constructora padre
        
        this.scene.add.existing(this).setScale(0.2, 0.2); // añadir a escena.
    }
}