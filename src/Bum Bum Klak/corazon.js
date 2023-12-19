export default class corazon extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y)    // constructor
    {
        super(scene, x, y, 'corazon');  // constructora padre
        
        this.scene.add.existing(this).setScale(0.1, 0.1); // añadir a escena.
    }




}