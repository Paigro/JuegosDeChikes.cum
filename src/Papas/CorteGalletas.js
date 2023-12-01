import AccionBase from "../accionBase.js";
import Corte from "./Corte.js"

export default class CorteGalletas extends AccionBase{
    constructor(scene, x, y, bandejaSpr, corteSpr)
    {
        super(scene, x, y);
        
        this.setScale(.85,.85);
        
        this.add(this.bandeja);
        
        this.scene.add.existing(this);
    };
    
    PreUpdate()
    {
        
    }
    
    BlockThisAction()
    {
        this.bandeja.setvisi
    }
    
    Reset()
    {

    }
}