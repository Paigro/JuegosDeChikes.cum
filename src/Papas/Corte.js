
import CorteGalletas from "./CorteGalletas.js";

export default class Hat extends Phaser.GameObjects.Sprite 
{

	constructor(scene, x, y, corteSpr, bandejaRef)
    {
        super(scene, x, y, corteSpr);
        
		this.scene.add.existing(this);
		this.setInteractive();

        this.bandeja = bandejaRef;

        this.on('pointerdown', (pointer) => {
	    	console.log("Pinchado");
            //preguntar
            //this.bandeja.StartAccion
	    });
    }
    

}