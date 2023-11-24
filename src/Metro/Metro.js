import Avion from "./avion.js";
import teclasArribaAbajo from "./teclasArribaAbajo.js";

export default class Metro extends Phaser.Scene // Manager de la escena del Metro Skaters.
{
    constructor() 
    {
        // Nombre de la escena para el SceneManager
        super({ key: 'Metro', active: false }); 
    }

    // Métodos init, preload, create, update+
    init(){
        /*this.MovementY = 0;
        this.MovementX = 0;
        this.speed = 100;
        this.rozamiento = 101;*/
    }
    preload(){        
		this.load.image('beluga', "/assets/juego/TruthOrDare/imagenes/Beluga2.png");
        this.load.image('atras', "/assets/juego/TruthOrDare/imagenes/VolverAtras.jpg"); // Cargamos la imagen de volver atras (provisional).
    }    
    create(){               
        //this.avionSpr = this.physics.add.image(540, 360, "beluga").setScale(.25)
        
        this.atras = this.add.image(0, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive(); // Añadimos la imagen de volver atras.
        this.atras.on('pointerdown', (pointer) => {
            this.finalDelJuego()
        });

        new Avion(this, 50, 50);
        //let sequence = new Secuencia(...);
        //let avionAcc = new teclasArribaAbajo(this, 0, 0, new Avion(this, 10, 10, this.avionSpr));
        //let secuenciaAcc = new secuanciaTeclas();
        //this.metroManager = new Manager(avion, secuancia);

        /*this.input.keyboard.on('keydown-A', event =>
        {
            this.MovementX = -this.speed;

        });
        this.input.keyboard.on('keydown-D', event =>
        {
            this.MovementX = this.speed;
        });*/
    }

    update(){
        /*this.moverAvion()
        
        if( this.MovementX > 1){
            this.MovementX -= this.rozamiento;
        }        
        else if (this.MovementX < -1){
            this.MovementX += this.rozamiento;
        }
        else this.MovementX = 0;

        if( this.MovementY > 1){
            this.MovementY -= this.rozamiento;
        }
        else if(this.MovementY < -1){
            this.MovementY += this.rozamiento;
        }
        else this.MovementY = 0;*/
    }
    finalDelJuego()
    {    
        this.scene.start("Hub");
    }

    moverAvion(){
        //this.avion.setAcceleration(this.MovementX,this.MovementY)
    }
   } 