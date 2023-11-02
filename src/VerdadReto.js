//import mensaje from './src/Mensaje.js';
//import llamada from './src/LLamada.js';

class TruthOrDare extends Phaser.Scene
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
    this.add.image(395, 200, 'mensaje').setOrigin(0, 0).setScale(0.4, 0.2).setInteractive(); // Añadimos la imagen del mensaje.
    this.add.image(400, 560, 'llamada1').setOrigin(0, 0).setScale(0.2, 0.2).setInteractive(); // Añadimos la imagen de la llamada.
    this.add.image(500, 560, 'llamada2').setOrigin(0, 0).setScale(0.3, 0.3).setInteractive(); // Añadimos la imagen de la llamada.

    this.add.text(0, 0, this.score).setOrigin(0, 0).setScale(3, 3);
    this.input.on('mensaje',this.onObjectClicked);


    //let msg = new Message(this, 0, 0);
    //let cll = new PhoneCall(this, 0, 0);
}
init()
{
    //this.time = 0; // Duracion del minijuego.
    this.score = 0; // Puntuacion del juego.
    this.limitTime = 20000; // Timpo que tiene el jugador para responder a una llamada o a un mensaje.
}
update(time, dt)
{
    this.time += dt;
    // De momento esto es lo que hace la escena, esta en proceso: (no funciona y solo hace el else, AHORA SI OLE OLE TRAS UNA HORA FUNCIONA)
    if(this.time < this.limitTime)
    {
        //console.log("MENOR");
        //this.time += dt;
    }
    else
    {
        alert("Ya no puedes responder")
        console.log("MAYOR");
        this.time = 0;
        this.score++;
    }
    // console.log(dt);
    // console.log(this.limitTime);
    // console.log(this.time);
    // console.log(this.time<this.limitTime);
    // this.scene.pause(this.scene.key);
}
onObjectClicked(pointer, gameObject)
{ 
    if(pointer == 'mensaje')
    {
        alert("RESPONDER MENSAJE");
    }
    else if(pointer == 'llamada1'|| pointer == 'llamada2')
    {
        alert("RESPONDER LLAMADA");
    }
}
}