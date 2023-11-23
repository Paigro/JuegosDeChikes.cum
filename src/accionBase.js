export default class AccionBase{
    constructor()
    {
    };

    //Bloquea esta accion
    BlockThisAction(){}

    //Termina la accion, pasa la puntuacion al manager "DoAction()"
    EndAction(){}

    //Resetea esta accion
    Reset(){}

}