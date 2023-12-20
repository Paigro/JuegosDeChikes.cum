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
                this.texto = "Mi perro se ha muerto."
            break;
            case 1:
                this.texto = "¿Que quieres comer hoy?"
            break;
            case 2:
                this.texto = "¿Cuanto es 2+2?"
            break;
            case 3:
                this.texto = "Te quiero mucho."
            break;
            case 4:
                this.texto = "Te odio con toda mi alma."
            break;
            case 5:
                this.texto = "¿Si te contase un secreto lo guardarías?"
            break;
            case 6:
                this.texto = "He suspendido motores."
            break;
            case 7:
                this.texto = "¿Quieres verme hacer una voltereta?"
            break;
            case 8:
                this.texto = "¿Sabías que en términos de repro-?"
            break;
            case 9:
                this.texto = "Mi abuela se comió mi gato"
            break;
            case 10:
                this.texto = "¿Quién gana? Mil billones de leones o el sol"
            break;
            case 11:
                this.texto = "Me gustan los trenes"
            break;
            case 12:
                this.texto = "¿Me amarías  si fuese un gusano?"
            break;
            case 13:
                this.texto = "¿Te echas un lol?"
            break;
        }
    }

    GeneraTextoRes(numDiag, CoC)    // genera el texto de respuesta
    {
        if(CoC == 0) // si CoC = 0, se usa el corazón
        {
            switch(numDiag) 
            {
                case 0:
                    this.texto = "Lo siento mucho :c"
                break;
                case 1:
                    this.texto = "No sé. ¿Qué quieres tú?"
                break;
                case 2:
                    this.texto = "5"
                break;
                case 3:
                    this.texto = "¡Yo más!"
                break;
                case 4:
                    this.texto = "Yo también te odio, tranqui."
                break;
                case 5:
                    this.texto = "No, lol"
                break;
                case 6:
                    this.texto = "¡Yo también!"
                break;
                case 7:
                    this.texto = "¡Haz una mortal!"
                break;
                case 8:
                    this.texto = "Por favor, no sigas"
                break;
                case 9:
                    this.texto = "Eso es terrible"
                break;
                case 10:
                    this.texto = "Los fieros leones obviamente"
                break;
                case 11:
                    this.texto = "A mi también"
                break;
                case 12:
                    this.texto = "Por supuesto que sí, mi amor"
                break;
                case 13:
                    this.texto = "No"
                break;
            }
        }
        else    // usamos el cerebro
        {
            switch(numDiag) // generamos el texto aleatorio
            {
                case 0:
                    this.texto = "Comprate otro."
                break;
                case 1:
                    this.texto = "Arroz con pollo."
                break;
                case 2:
                    this.texto = "4"
                break;
                case 3:
                    this.texto = "Deberías, todos me quieren."
                break;
                case 4:
                    this.texto = "Tranqui, seguro que podemos hablarlo."
                break;
                case 5:
                    this.texto = "Por supuesto que sí."
                break;
                case 6:
                    this.texto = "¡Tendrás más oportunidades!"
                break;
                case 7:
                    this.texto = "Ten cuidado."
                break;
                case 8:
                    this.texto = "No tuvo gracia la primera vez, no la tiene ahora"
                break;
                case 9:
                    this.texto = "Eso suena malo, los gatos no son nutritivos"
                break;
                case 10:
                    this.texto = "Obviamente el sol ¿Qué pregunta es esa?"
                break;
                case 11:
                    this.texto = "Son chulos ngl"
                break;
                case 12:
                    this.texto = "No"
                break;
                case 13:
                    this.texto = "No"
                break;
            }
        }
    }
}