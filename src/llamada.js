export default class PhoneCall extends Phaser.GameObjects.Sprite {
    /**
     * 
     * @param {*} scene 
     * @param {*} x 
     * @param {*} y 
     * @param {*} originX 
     * @param {*} maxX 
     * @param {*} finalX 
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'llamada');
        this.originX = x;
        this.maxX = 635;
        this.finalX= 620;


        this.setScale(0.5, 0.5);
        this.setInteractive({draggable: true});

       
        scene.add.existing(this);

    }

    DoAction(dragX) {
        console.log(dragX, this.originX, this.maxX)
        if (dragX > this.originX && dragX < this.maxX) {
            this.x = dragX;
        }
    }

    FinishAction() {
        if (this.x <= this.finalX) {
            this.x = this.originX;
        }
        else {
            this.clearTint();
            //this.scene.ActionFinished(true);
        }
    }
    preupdate() {

    }

}