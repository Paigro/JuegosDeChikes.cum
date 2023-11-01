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
    this.load.image('mensaje', '/assets/juego/TruthOrDare/Beluga2.png'); // Cargamos la imagen de la llamada, de momento un Beluga.
    this.load.image('llamada', '/assets/juego/TruthOrDare/A380.jpg'); // Cargamos la imagen del mensaje, de momento un A380.
}
create()
{
    this.add.image(0, 0, 'mensaje').setOrigin(0, 0).setScale(2, 2); // Añadimos la imagen del mensaje.
    this.add.image(100, 0, 'llamada').setOrigin(0, 0).setScale(2, 2); // Añadimos la imagen de la llamada-

    //let msg = new Message(this, 0, 0);
    //let cll = new PhoneCall(this, 0, 0);
}
init()
{
    //this.time = 0; // Duracion del minijuego.
    this.score = 0; // Puntuacion del juego.
    this.limitTime = 1000; // Timpo que tiene el jugador para responder a una llamada o a un mensaje.
}
update(time, dt)
{
    this.time += dt;
    //De momento esto es lo que hace la escena, esta en proceso: (no funciona y solo hace el else, AHORA SI OLE OLE TRAS UNA HORA FUNCIONA)
    if(this.time < this.limitTime)
    {
        console.log("MENOR");
        //this.time += dt;
    }
    else
    {
        console.log("MAYOR");
        this.time = 0;
    }
    // console.log(dt);
    // console.log(this.limitTime);
    // console.log(this.time);
    // console.log(this.time<this.limitTime);
    // this.scene.pause(this.scene.key);
}
}