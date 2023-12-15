export default class obstaculos extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) // Constructora.
    {
        super(scene, x, y, 'panel'); // Constructora padre.

        this.scene.add.existing(this).setOrigin(0, 0); // Añadir a la escena.

        this.direction = 0; // Direccion del avión:s 1 = arriba, 0 = quieto,-1 = abajo.

        console.log("Obstaculos: Secuencia ha sido creada");
    }
}
