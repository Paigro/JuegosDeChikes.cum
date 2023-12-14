export default class secuanciaTeclas extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y) // Constructora.
    {
        super(scene, x, y, 'panel'); // Constructora padre.

        this.speed = 140; // Nuestra velocidad de movimiento será 140
        
        this.scene.add.existing(this).setScale(1.5, 1).setOrigin(0, 0); // Añadir a la escena.

        this.direction = 0; // Direccion del avión:s 1 = arriba, 0 = quieto,-1 = abajo.

        console.log("Secuencia: Secuencia ha sido creada");

        // Agregamos al avion las físicas para que Phaser lo tenga en cuenta:
       
        scene.physics.add.existing(this);
        
        //this.body.setPushable(false);
        //this.setImmovable(true);
    }

    preUpdate(t, dt)
    {
        super.preUpdate(t, dt);



    }
}