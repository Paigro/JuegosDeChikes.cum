import AccionBase from "../accionBase.JS";
import Corte from "./Corte.js"

export default class CorteGalletas extends AccionBase{
    constructor(scene, x, y, bandejaSpr, corteSpr)
    {
        super(scene, x, y);
        
        this.bandeja = new Phaser.GameObjects.Sprite(scene, 0, 0, bandejaSpr, 0); 
        this.bandeja.setScale(.85,.85);
        
        this.corte = new Corte(scene, 0, 0, corteSpr, this);
    };
    
    PreUpdate()
    {
        
    }
    
    BlockThisAction()
    {
        //this.scene.delete(this.bandeja);
    }
    
    StartAccion()
    {
        //preguntar
        //this.manager.BlockAction(2):
    }
    
    Reset()
    {
        
        this.add(this.bandeja);
        this.add(this.corte);
        
        this.scene.add.existing(this);

    }
}