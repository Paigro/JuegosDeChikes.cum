import Avion from "./avion.js";
import secuanciaTeclas from "./secuenciaTeclas.js";
//import teclasArribaAbajo from "./teclasArribaAbajo.js";

export default class Metro extends Phaser.Scene // Manager de la escena del Metro Skaters.
{
    constructor() 
    {
        // Nombre de la escena para el SceneManager
        super({ key: 'Metro', active: false });
    }

    // Metodos init, preload, create, update:
    init() 
    {

    }

    preload() 
    {
        this.load.image('beluga', "/assets/juego/MetroSkaters/imagenes/Beluga2.png"); // Cargamos la imagen del avion.
        this.load.image('cielo',"/assets/juego/MetroSkaters/imagenes/cielo.jpg") // Cargamos la imagen del fondo.
        this.load.image('atras', "/assets/juego/TruthOrDare/imagenes/VolverAtras.jpg"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('panel', "/assets/juego/MetroSkaters/imagenes/Panel.PNG") // Cargamos la imagen del panel inferior.
    }

    create() 
    {
        this.physics.world.setBounds(0, 0, 1080, 450); // Nuevos bordes del mundo para el movimiento del avion.
        this.add.image(0, 0, 'cielo').setOrigin(0, 0).setScale(10, 10); // Ponemos la imagen del fondo.
        this.atras = this.add.image(0, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive(); // Ponemos la imagen de volver atras.
        
        // Boton de volver atras:
        this.atras.on('pointerdown', (pointer) => 
        {
            this.finalDelJuego()
        });

        let avion = new Avion(this, 500, 300); // El avion.
        let secuenciaTeclas = new secuanciaTeclas(this, 0, 450); // La secuencia de teclas.
    }

    update() 
    {

    }

    finalDelJuego() 
    {
        this.scene.start("Hub");
    }
} 