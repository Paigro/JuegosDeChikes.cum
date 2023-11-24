export default class AccionBase extends Phaser.GameObjects.Container {

    //constructor con la posicion y la escena donde aparece el objeto
    constructor(scene, x, y){
		super(scene, x, y);
    };
    //Comportamientos
    preUpdate(t, dt){}
    
    //Bloquea esta accion
    BlockThisAction(){}

    //Termina la accion, pasa la puntuacion al manager "DoAction()"
    EndAction(){}

    //Resetea esta accion
    Reset(){}

}