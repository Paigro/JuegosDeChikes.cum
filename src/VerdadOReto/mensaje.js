export default class Message extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y) {
        super(scene, x, y, 'mensajeMadre');
        
        this.Mensajes = ['mensajeMadre', 'mensajeMatias', 'mensajeMatias2', 'mensajeEx', 'mensajeLeo'];
        this.Mensajes2 = ['mensaje2Madre', 'mensaje2Matias', 'mensaje2Matias2', 'mensaje2Ex', 'mensaje2Leo'];

        this.mensajeActual = 0;

        this.setScale(0.5, 0.5);
        this.setInteractive();

       
        scene.add.existing(this);

    }

    DoAction() {
        this.scene.secondMensaje= this.scene.add.image(this.x, this.y + 80, this.Mensajes2[this.mensajeActual]).setScale(0.5, 0.5).setInteractive();
        this.scene.tween.pause();
        this.angle = 0;

        //al pulsar el segundo mensaje, acaba la acción y se resetea todo
        this.scene.secondMensaje.on('pointerdown', (pointer) => {
            this.scene.desapareceMensaje();
            this.scene.secondMensaje.destroy();

            this.mensajeActual = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
            this.setTexture(this.Mensajes[this.mensajeActual]);

            this.scene.AddScore(1);
            this.scene.AddExtIntScore(1);
            
            this.scene.time.removeEvent(this.scene.timer);
            this.scene.waitForAction();
        })

        this.setInteractive(false);
    }
}