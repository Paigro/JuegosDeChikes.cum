export default class Generador extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y);

        this.scene.add.existing(this);

        console.log("Generador de cosas hecho.");
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }
    update() {

    }
}