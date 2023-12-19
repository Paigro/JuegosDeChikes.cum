export default class PhoneCall extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'llamada');
        this.originX = x;
        this.maxX = 635;
        this.finalX= 600;


        this.setScale(0.5, 0.5);
        this.setInteractive({draggable: true});

       
        scene.add.existing(this);

    }

    DoAction(dragX) {
        if (dragX > this.originX && dragX < this.maxX) {
            this.x = dragX;
        }
    }

    FinishAction() {
        if (this.x < this.finalX) {
           
            console.log(this.x)
            this.x = this.originX;
        }
        else {
            this.scene.AddScore(1);
            this.scene.AddExtIntScore(-1);
            this.scene.desapareceLLamada();
            this.scene.time.removeEvent(this.scene.timer);
            this.scene.waitForAction();
            this.x = this.originX;
        }
    }

}