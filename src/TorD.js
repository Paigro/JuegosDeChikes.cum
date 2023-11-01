import mensaje from './src/Mensaje.js';
import llamada from './src/LLamada.js';
export default class truthOrDare extends Phaser.Scene
{
constructor()
{
    super({key: 'TruthOrDare'});
}


tiempo=0;
score=0;
tiempoLimite=10; // 10 s

init()
{

} 
preload()
{
    this.load.Image('mensaje', 'assets/juego/TruthOrDare/Beluga2.png');
}
create()
{
    let mensaje = new Mensaje(this, 0, 0, 'mensaje');
    this.add(mensaje);
}
update()
{

}
}