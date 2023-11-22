
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
        let pausado = false;
    };
    
    // Bloque la accion no elegida
    BlockAction(actionBloked)
    {
        if(actionBloked){
            this.action1.BlockAction();
        }
        else if (!actionBloked)
        {
            this.action2.BlockAction();
        }

    }
    // Asigna puntuacion
    DoAction(puntuacion)
    {
        score += puntuacion;
    }

    // Pausa/Despausa el timer de la escena
    PausaDespausa()
    {
        pausado = !pausado;
    }

    // Instancia las acciones (Llamada, mensajes...)
    SendActions()
    {

    }

    // Update time
    UpdateTime(_deltaTime)
    {
        //this._de
        if(this.elapsedTime >= 0)
        {
            this.elapsedTime -= _deltaTime;
        }else
        {
            if(score != 0)
            {
                // Manda la puntuacion al coordinator
                coor.sa
                
            }else
            {

            }
        }
        return this.elapsedTime;
    }
/*  Para returnear el elapsed time
    ReturnTime()
    {

    }*/
}