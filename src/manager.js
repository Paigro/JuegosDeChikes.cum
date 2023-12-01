
import Coordinator from "./coordinator.js"

export default class Manager{
    constructor(_act1Ref, _act2Ref, _coordinator, _maxTime)
    {
        this.action1 = _act1Ref;
        this.action2 = _act2Ref;        
        let coor = _coordinator;

        let maxTime = 10;
        this.elapsedTime = maxTime;
        this.deltaTime;
        this.score=0;
        this.pausado = false;
        this.endRound = false;
        this.endGame = false;
    };
    
    // Bloque la accion no elegida
    BlockAction()
    {
        document.addEventListener('start', ()=>{
            console.log("Start event triggered")
        });

            document.dispatchEvent(event);

        //this.dispatchEvent()
        
    }
    // Asigna puntuacion y termina la ronda
    DoAction(puntuacion)
    {
        score += puntuacion;
        this.endRound = true;
        console.log("End Round");
    }
    
    // Pausa/Despausa el timer de la escena
    PausaDespausa()
    {
        pausado = !pausado;
    }
    
    // Resetea las acciones (Llamada, mensajes...)
    ResetActions()
    {
        this.endRound = false;
        console.log("Start Round");
        this.action1.Reset();
        this.action2.Reset();
        
    }

    // Update time
    UpdateTime(_deltaTime)
    {
        if(!this.pausado){
            //si el elapsed time es mayor a 0 se resta el tiempo
            if(this.elapsedTime >= 0)
            {
                this.elapsedTime -= _deltaTime;
            }else
            {
                if(this.endRound && this.score != 0)
                {
                    // si ha terminado la ronda y la puntuacion es distinta de 0 se termina el juego
                    this.endGame = true;
                    console.log("End Game");
                }else
                {
                    //el final de la ronda se vuelve false y se hace una ronda mas
                    //this.ResetActions();
                }
            }
            //console.log(this.elapsedTime);
        }
    }

    //Return endGame
    ReturnEndGame()
    {
        return this.endGame;
    }
}