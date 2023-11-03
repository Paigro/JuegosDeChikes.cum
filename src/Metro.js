import Hub from "./hub.js";

export default class Metro extends Phaser.Scene {

    constructor() {
        // Nombre de la escena para el SceneManager
        super({ key: 'Metro', active: false }); 
    }

    // Métodos init, preload, create, update
    preload(){        
		this.load.image("beluga", "/assets/juego/TruthOrDare/imagenes/Beluga2.png");
        this.load.image('atras', '/assets/juego/TruthOrDare//imagenes/VolverAtras.jpg'); // Cargamos la imagen de volver atras (provisional).
    }    
    create(){               
        this.avion = this.physics.add.image(540, 360, "beluga").setScale(.25)
        
        this.atras = this.add.image(0, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive(); // Añadimos la imagen de volver atras.
        this.atras.on('pointerdown', (pointer) => {
            finalDelJuego()
        });

        this.input.keyboard.on('keydown-W', event =>
        {
            this.moverArriba()

        });
        this.input.keyboard.on('keydown-S', event =>
        {
            this.moverAbajo()
        });
    }

    moverArriba(){
        this.avion.y -= 10
    }
    moverAbajo(){
        this.avion.y += 10
    }

    finalDelJuego()
    {    
        this.scene.start("Hub");
    }
    
   } 