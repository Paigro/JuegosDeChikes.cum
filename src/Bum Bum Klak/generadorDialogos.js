export default class generadorDialogo extends Phaser.GameObjects.Sprite
{
    constructor(scene)
    {
        super(scene, 0, 0);
        this.texto = "";    // contiene el texto
        

    }
    GeneraTextoIni(numDiag)    // genera el texto inicial
    {

        switch(numDiag) // generamos el texto aleatorio
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

    GeneraTextoRes(numDiag, CoC)    // genera el texto de respuesta
    {
        if(CoC = 0) // si CoC = 0, se usa el corazón
        {
            switch(numDiag) 
            {
                case 0:
                    texto = "Lo siento mucho :c"
                break;
                
                case 1:
                    texto = "No sé. ¿Qué quieres tú?"
                break;
                
                case 2:
                    texto = "5"
                break;
                
                case 3:
                    texto = "Yo más."
                break;
                
                case 4:
                    texto = "Yo también te odio, tranqui."
                break;

                case 5:
                    texto = "No, lol"
                break;

                case 6:
                    texto = "¡Yo también!"
                break;
                
                default:
                    texto = "¿Haz una mortal!"
                break;
            }
        }
        else    // usamos el cerebro
        {
            switch(numDiag) // generamos el texto aleatorio
            {
                case 0:
                    texto = "Comprate otro."
                break;
                
                case 1:
                    texto = "Arroz con pollo."
                break;
                
                case 2:
                    texto = "4"
                break;
                
                case 3:
                    texto = "Deberías, todos me quieren."
                break;
                
                case 4:
                    texto = "Tranqui, seguro que podemos hablarlo."
                break;

                case 5:
                    texto = "Por supuesto que sí."
                break;
                case 6:
                    texto = "¡Tendrás más oportunidades!"
                break;
                default:
                    texto = "Ten cuidado."
                break;
            }
        }
    }
}