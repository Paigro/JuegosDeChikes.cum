
export default class Corte extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, corteSpr) {
        super(scene, x, y, corteSpr);

        this.setScale(1.5, 1.5);
        this.setOrigin(0.5,0.5);
        this.scene.add.existing(this);
        this.setInteractive();

        this.cutted = 0;

        this.startPosX = x;
        this.startPosY = y;
        

        this.setDepth(2);
        //scene.input.enableDebug(this);
    }

    appear() {

        this.visible = true;
        this.input.enabled = true;
        console.log(this.cutted + "appear");
    }

    hide() {
        this.setPosition(this.startPosX, this.startPosY);
        this.visible = false;
        this.input.enabled = false;
        //console.log(this.cutted + "hide");
    }

    move() {
        if (this.cutted >= 5) {
            this.scene.endAction(1);
            this.cutted = 0;
        } else {
            if (this.cutted == 2) {
                this.x-=300
                this.y += 100;
            }
            this.x += 100;
            this.cutted++;

        }
    }
}