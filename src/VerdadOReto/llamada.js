export default class PhoneCall extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'llamada');
        this.originX = x;
        this.maxX = 635;
        this.finalX= 600;
        this.Personas = ["Tia Paqui", "Tu Abuela", "Pizza Hut", "Levi", "Paigro", "P. Sanchez"]


        this.setScale(0.5, 0.5);
        this.setInteractive({draggable: true});

       
        scene.add.existing(this);

    }

    DoAction(dragX) {
        this.scene.tween.pause();
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
            this.texto.setText(this.Personas[Math.floor(Math.random() * (5 - 0 + 1)) + 0]);
            this.scene.time.removeEvent(this.scene.timer);
            this.scene.waitForAction();
            this.x = this.originX;
        }
    }

}