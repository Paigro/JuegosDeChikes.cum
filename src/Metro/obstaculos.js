export default class obstaculos extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) // Constructora.
    {
        super(scene, x, y, 'panel'); // Constructora padre.

        this.scene.add.existing(this).setOrigin(0, 0); // Añadir a la escena.

        console.log("Obstaculos: Secuencia ha sido creada");
    }
}
