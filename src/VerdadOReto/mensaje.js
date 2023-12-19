export default class Message extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y) {
        super(scene, x, y, 'mensaje');


        this.setScale(0.5, 0.5);
        this.setInteractive();

       
        scene.add.existing(this);

    }

    DoAction() {
        this.scene.secondMensaje= this.scene.add.image(this.x, this.y + 80, 'mensaje2').setScale(0.5, 0.5).setInteractive();

        this.scene.secondMensaje.on('pointerdown', (pointer) => {
            this.scene.desapareceMensaje();
            this.scene.secondMensaje.destroy();
            this.scene.AddScore(1);
            this.scene.AddExtIntScore(1);
            this.scene.time.removeEvent(this.scene.timer);
            this.scene.waitForAction();
        })

        this.setInteractive(false);
    }
}