
export default class Galletas extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, glaseadoSpr) {
        super(scene, x, y, glaseadoSpr);

        this.startPosX = x;
        this.startPosY = y;

        this.scene.add.existing(this);
        this.setInteractive();

        this.setDepth(2);
        this.setScale(.75, .75);

        scene.input.enableDebug(this);
    }

    
    
}