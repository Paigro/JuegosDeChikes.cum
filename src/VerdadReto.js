//import mensaje from './src/Mensaje.js';
//import llamada from './src/LLamada.js';
class truthOrDare extends Phaser.Scene
{
constructor()
{
    super({key: 'VerdadReto'});
}

preload()
{
    //this.load.Image('mensaje', 'assets/juego/TruthOrDare/Beluga2.png'); // Cargamos la imagen de la llamada, de momento un Beluga.
    //this.load.Image('llamada', 'assets/juego/TruthOrDare/A380.jpg'); // Cargamos la imagen del mensaje, de momento un A380.
}
create()
{
    //this.add.image(0, 0, 'mensaje').setOrigin(0, 0); // Añadimos la imagen del mensaje.
    //this.add.Image(0, 0, 'llamada').setOrigin(0, 0); // Añadimos la imagen de la llamada-

    //let msg = new Message(this, 0, 0);
    //let cll = new PhoneCall(this, 0, 0);
}
init()
{
    //let time = 0; // Duracion del minijuego.
    //let score = 0; // Puntuacion del juego.
    //limitTime = 10; // Timpo que tiene el jugador para responder a una llamada o a un mensaje.
}
update(time, dt)
{
    time += dt;
    // De momento esto es lo que hace la escena, esta en proceso:
    if(time < this.limitTime)
    {
        console.log("Tiempo menor que limite");
    }
    else
    {
        console.log("Tiempo mayor que limite");
        time = 0;
    }
}
}