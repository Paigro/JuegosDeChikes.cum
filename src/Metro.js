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
        this.cosaClickeable = this.add.image(0, 0, "beluga").setInteractive().on('pointerdown', () => 
            this.scene.start("Hub")
        )      
        
        this.atras = this.add.image(0, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive(); // Añadimos la imagen de volver atras.
        this.atras.on('pointerdown', (pointer) => {
            this.finalDelJuego();
        });
    }
    finalDelJuego()
{    
    this.scene.start("Hub");
}
    
   } 