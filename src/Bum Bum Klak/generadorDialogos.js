export default class dialogo extends Phaser.GameObjects.Sprite
{
    constructor(dialogo)
    {
        this.texto;

        switch(dialogo) // generamos el texto aleatorio
        {
            case 0:
                texto = "Mi perro se ha muerto."
            break;
            
            case 1:
                texto = "¿Que quieres comer hoy?"
            break;
            
            case 2:
                texto = "¿Cuanto es 2+2?"
            break;
            
            case 3:
                texto = "Te quiero mucho."
            break;
            
            case 4:
                texto = "Te odio con toda mi alma."
            break;

            case 5:
                texto = "¿Si te contase un secreto lo guardarías?"
            break;
            case 6:
                texto = "He suspendido motores."
            break;
            default:
                texto = "¿Quieres verme hacer una voltereta?"
            break;
        }
    }




}