
import Coordinator from "./coordinator.js"

export default class Manager{
    constructor(_act1Ref, _act2Ref, _coordinator)
    {
        this.action1 = _act1Ref;
        this.action2 = _act2Ref;
        
        let coor = _coordinator;

        let score=0;
        let maxTime = 3894729478;
        let elapsedTime = 0;
        let pausado = false;
    };
    
    //bBloque la accion no elegida
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
    UpdateTime(deltaTime)
    {
        if(elapsedTime >= 0)
        {
            elapsedTime -= deltaTime;
        }else
        {
            if(score != 0)
            {
                // Manda la puntuacion al coordinator
                coor.sa
                
            }
        }
    }
/*  Para returnear el elapsed time
    ReturnTime()
    {

    }*/
}