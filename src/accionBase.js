
export default class AccionBase extends Phaser.GameObjects.Sprite {

  //constructor con la posicion y la escena donde aparece el objeto
  constructor(scene, x, y, spr) {
    super(scene, x, y, spr);
  };
  //Comportamientos
  preUpdate(t, dt) { }

  //Bloquea esta accion
  BlockThisAction() {
    this.visible = false;
    //console.log("ha entrado");
  }

  //startAccion
  StartAccion() { }

  //Termina la accion, pasa la puntuacion al manager "DoAction()"
  EndAction() { }

  //Resetea esta accion
  Reset() { 
    this.visible = true;
  }

}