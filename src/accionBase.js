import Manager from "./manager.js";

export default class AccionBase extends Phaser.GameObjects.Container {

    //constructor con la posicion y la escena donde aparece el objeto
    constructor(scene, x, y){
		super(scene, x, y);
        this.manager;
    };
    //Comportamientos
    preUpdate(t, dt){}
    
    //Set Manager
    set Manager(_manager){ this.manager = _manager}

    //Bloquea esta accion
    BlockThisAction(){}

    //startAccion
    StartAccion(){}

    //Termina la accion, pasa la puntuacion al manager "DoAction()"
    EndAction(){}

    //Resetea esta accion
    Reset(){}

}