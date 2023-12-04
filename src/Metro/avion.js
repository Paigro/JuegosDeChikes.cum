export default class Avion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) // Constructora.
    {
        super(scene, x, y, 'beluga'); // Constructora padre.

        this.speed = 140; // Nuestra velocidad de movimiento será 140
        
        this.scene.add.existing(this).setScale(0.25, 0.25); // Añadir a la escena.

        this.direction = 0; // Direccion del avión:s 1 = arriba, 0 = quieto,-1 = abajo.

        console.log("Avion ha sido creado");



        // Creamos las animaciones del avion:
        /*this.scene.anims.create({ // Anmimacion para cuando el avion esta volando y no pasa nada mas.
            key: 'flying',
            frames: scene.anims.generateFrameNumbers('knight', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({ // Animacion para cuando el avion este ascendiendo.
            key: 'up',
            frames: scene.anims.generateFrameNumbers('knight', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({ // Animacion para cuando el avion este descendiendo.
            key: 'down',
            frames: scene.anims.generateFrameNumbers('knight', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({ // Animacion para cuando el avion choque contra algo.
            key: 'crash',
            frames: scene.anims.generateFrameNumbers('knight', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });*/

        // Teclas para mover el avión.
        this.upKey = this.scene.input.keyboard.addKey('UP'); // Flecha arriba.
        this.downKey = this.scene.input.keyboard.addKey('DOWN'); // Flecha abajo.
        this.rightKey = this.scene.input.keyboard.addKey('RIGHT'); // Flecha derecha.
        this.leftKey = this.scene.input.keyboard.addKey('LEFT'); // Felcha izquierda.

        // Agregamos al avion las fisicas para que Phaser lo tenga en cuenta:
        scene.physics.add.existing(this);

        // Decimos que el avion colisiona con los limites del mundo (de momento choca con los limites).
        this.body.setCollideWorldBounds();
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if(this.upKey.isDown)
        {
            //console.log("Arriba.");
			this.body.setVelocityY(-this.speed);
		}
        else if(this.downKey.isDown)
        {
            //console.log("Abajo.");
			this.body.setVelocityY(this.speed);
		}
// De este if habra que quitar las cosas de los 4 ejes despues.
        else if(Phaser.Input.Keyboard.JustUp(this.upKey) || Phaser.Input.Keyboard.JustUp(this.downKey) || Phaser.Input.Keyboard.JustUp(this.rightKey) || Phaser.Input.Keyboard.JustUp(this.leftKey))
        {
            //console.log("Para.");
            this.body.setVelocityY(0);
            this.body.setVelocityX(0);

        } 
        // Movimiento extra para probar cosas:
        /*else if(this.rightKey.isDown)
        {
            //console.log("Abajo.");
			this.body.setVelocityX(this.speed);
		}
        else if(this.leftKey.isDown)
        {
            //console.log("Abajo.");
			this.body.setVelocityX(-this.speed);
		} */

        
        // ANIMACIONES DEL AVION (DEBERIAN DE SER TWINKS MAS QUE ANIMACIONES)
        /*if(this.upKey.isDown)
        {
            if(this.anims.currentAnim.key !== 'up'){
                this.play('up');
            }
        }
        if(this.downKey.isDown)
        {
            if(this.anims.currentAnim.key !== 'down'){
                this.play('down');
            }
        }*/


    }
    update()
    {

    }
    movimientoArriba()
    {
        this.setPosition(10, 10);

    }
    movimientoAbajo()
    {

    }



}