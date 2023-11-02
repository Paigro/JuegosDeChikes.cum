//import mensaje from './src/Mensaje.js';
//import llamada from './src/LLamada.js';

export default class TruthOrDare extends Phaser.Scene
{
constructor()
{
    super({key: 'VerdadOReto'});
}

preload()
{
    this.load.image('telefono', '/assets/juego/TruthOrDare//imagenes/Telefono.png'); // Cargamos la imagen de un movil (provisional).
    this.load.image('calle', '/assets/juego/TruthOrDare//imagenes/Calle.jpg'); // Cargamos la imagen de una calle para el fondo (provisional).
    this.load.image('mensaje', '/assets/juego/TruthOrDare//imagenes/Beluga2.png'); // Cargamos la imagen del mensaje, de momento un Beluga.
    this.load.image('llamada1', 'assets/juego/TruthOrDare/imagenes/Llamada.png'); // Cargamos la imagen de la llamada, de momento un A380.
    this.load.image('llamada2', 'assets/juego/TruthOrDare/imagenes/Llamada2.png'); // Cargamos la imagen de la llamada, de momento un A380.
}
create()
{
    this.add.image(0, 0, 'calle').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
    this.add.image(170, 170, 'telefono').setOrigin(0, 0).setScale(1.5, 1.5); // Añadimos la imagen del telefono.
    this.mensaje = this.add.image(395, 200, 'mensaje').setOrigin(0, 0).setScale(0.4, 0.2).setInteractive();; // Añadimos la imagen del mensaje y lo hacemos interactuable.
    this.llamada1 = this.add.image(400, 560, 'llamada1').setOrigin(0, 0).setScale(0.2, 0.2).setInteractive(); // Añadimos la imagen de la llamada y lo hacemos interactuable.
    this.llamada2 = this.add.image(500, 560, 'llamada2').setOrigin(0, 0).setScale(0.3, 0.3).setInteractive(); // Añadimos la imagen de la llamada y lo hacemos interactuable.

    //this.add.text(0, 0, this.score).setOrigin(0, 0).setScale(3, 3);
    
    this.mensaje.on('pointerdown', (pointer) => {
        alert("AAMAMA: TIENES QUE COMPRAR HUEVOS, LECHE, HARINA, AZUCAR Y COMIDA PARA EL GATO.");
    });
    this.llamada1.on('pointerdown', (pointer) => {
        alert("HAS COGIDO LA LLAMADA DEL TU TIO MANOLO");
    });
    this.llamada2.on('pointerdown', (pointer) => {
        alert("HAS COLGAD0 A TU ABUELA :(");
    });
    


    //let msg = new Message(this, 0, 0);
    //let cll = new PhoneCall(this, 0, 0);
}
init()
{
    this.realTime = 0; // Tiempo real ya se cambiara en un futuro que haya dos tiempos. Esto es para probar.
    this.finalTime = 100000; // Duracion del minijuego.
    this.score = 0; // Puntuacion del juego.
    this.limitTime = 20000; // Timpo que tiene el jugador para responder a una llamada o a un mensaje.
}
update(time, dt)
{
    this.time += dt;
    this.time += dt;
    // De momento esto es lo que hace la escena, esta en proceso: (no funciona y solo hace el else, AHORA SI OLE OLE TRAS UNA HORA FUNCIONA)
    if(this.time < this.limitTime)
    {
        //console.log("MENOR");
        //this.time += dt;
    }
    else if(this.time > this.limitTime)
    {
        alert("Ya no puedes responder")
        console.log("MAYOR");
        this.time = 0;
        this.score++;
    }else if(this.realTime>=finalTime)
    {
        //final del juego.
        this.scene.pause(this.scene.key);
    }
}
}