//import mensaje from './src/Mensaje.js';
//import llamada from './src/LLamada.js';
import Hub from './hub.js';

export default class TruthOrDare extends Phaser.Scene
{
constructor()
{
    super({key: 'VerdadOReto', active: false});
}

preload()
{
    this.load.image('atras', 'assets/juego/TruthOrDare/imagenes/VolverAtras.jpg'); // Cargamos la imagen de volver atras (provisional).
    this.load.image('telefono', 'assets/juego/TruthOrDare/imagenes/Telefono.png'); // Cargamos la imagen de un movil (provisional).
    this.load.image('calle', 'assets/juego/TruthOrDare/imagenes/Calle.jpg'); // Cargamos la imagen de una calle para el fondo (provisional).
    this.load.image('mensaje', 'assets/juego/TruthOrDare/imagenes/Beluga2.png'); // Cargamos la imagen del mensaje, de momento un Beluga.
    this.load.image('llamada1', 'assets/juego/TruthOrDare/imagenes/Llamada.png'); // Cargamos la imagen de la llamada verde.
    this.load.image('llamada2', 'assets/juego/TruthOrDare/imagenes/Llamada2.png'); // Cargamos la imagen de la llamada de colgar.
    this.load.image('score', 'assets/juego/TruthOrDare/imagenes/score.jpg'); // Cargamos la imagen del score.
}
create()
{
    this.add.image(0, 0, 'calle').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
    this.add.image(370, 120, 'telefono').setOrigin(0, 0).setScale(0.35, 0.35); // Añadimos la imagen del telefono.
    this.atras = this.add.image(0, 0, 'atras').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive(); // Añadimos la imagen de volver atras.
    this.mensaje = this.add.image(395, 200, 'mensaje').setOrigin(0, 0).setScale(0.4, 0.2).setInteractive(); // Añadimos la imagen del mensaje y lo hacemos interactuable.
    const llamada = this.add.sprite(400, 560, 'llamada1').setOrigin(0, 0).setScale(0.2, 0.2).setInteractive(); // Añadimos la imagen de la llamada y lo hacemos interactuable.
    llamada.defaultX = 400;
    llamada.destinationX = 530;
    llamada.maximunX = 540;
    this.puntuacion = this.add.image(800, 0, 'score').setOrigin(0, 0).setScale(0.2, 0.2).setInteractive(); // Añadimos la imagen del fondo.

    //this.add.text(0, 200, this.ExtInt,{fill: '#FFA500'}).setOrigin(0, 0).setScale(3, 3);
    
    //this.mensaje.on('pointerdown', (pointer) => {
      //  alert("AAMAMA: TIENES QUE COMPRAR HUEVOS, LECHE, HARINA, AZUCAR Y COMIDA PARA EL GATO.");
       // this.ExtInt++; // Ganas puntuacion de introvertido (positivo) cuando contestas a un mensaje.
       // if(this.ExtInt == 0){this.ExtInt++;}
   // });

    this.input.setDraggable(llamada);
    llamada.setScrollFactor(1);

    llamada.on('dragstart', (pointer) => {
        llamada.setTint(0xff0000);

    });
    llamada.on('drag', (pointer, dragX, dragY) =>
    {
        if (dragX > llamada.defaultX && dragX < llamada.maximunX)
        {
            llamada.x = dragX;
        }

    });

    llamada.on('dragend', (pointer) =>
        {
            if (llamada.x <= 530)
            {
                llamada.x = llamada.defaultX;
            }
            else
            {
                llamada.clearTint();
            }

        });

    //this.llamada2.on('pointerdown', (pointer) => {
      //  alert("HAS COLGAD0 A TU ABUELA :(");
       // this.ExtInt++ // Tecnicamente no puedes colgar en el juego final pero ahora si puedes. Ganas puntuacion introveritdo.
        //if(this.ExtInt == 0){this.ExtInt++;}
    //});
    this.atras.on('pointerdown', (pointer) => {
        this.finalDelJuego();
    });
    this.puntuacion.on('pointerdown', (pointer) => {
        alert("ExtInt: " + this.ExtInt);
    });
    


    //let msg = new Message(this, 0, 0);
    //let cll = new PhoneCall(this, 0, 0);
}
init()
{
    this.realTime = 0; // Tiempo real, ya se cambiara en un futuro que haya dos tiempos. Esto es para probar.
    this.finalTime = 100000; // Duracion del minijuego.
    this.score = 0; // Puntuacion ficticia mostrada al jugador.
    this.limitTime = 20000; // Timpo que tiene el jugador para responder a una llamada o a un mensaje.
    this.ExtInt = 0; // Puntuacion de extroversion (negativo) e introversion (positivo).
}
update(time, dt)
{
    this.time += dt;
    this.realTime += dt;
    // De momento esto es lo que hace la escena, esta en proceso: (no funciona y solo hace el else, AHORA SI OLE OLE TRAS UNA HORA FUNCIONA)
    if(this.time < this.limitTime)
    {
        //console.log("MENOR");
    }
    else if(this.time > this.limitTime) // Tiempo que va a tener el jugador para responder al mensaje o a la llamada. De momento hace otra cosa.
    {
        alert("Ya no puedes responder");
        console.log("MAYOR");
        this.time = 0;
        this.score--
        // if(no respondido nada)
        // {
        //     desapareceMensaje();
        //     desapareceLlamada();
        //     score--;
        // }
    }
    else if(this.realTime >= this.finalTime)
    {
        // Final del juego.
        this.finalDelJuego();
    }
}
desapareceMensaje()
{

}
desapareceLlamada()
{

}
finalDelJuego()
{    
    this.scene.start("Hub");
}
}
        //this.scene.pause(this.scene.key);