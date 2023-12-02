import AccionBase from "../accionBase.js";
import Corte from "./Corte.js"

export default class CorteGalletas extends AccionBase{
    constructor(scene, x, y, bandejaSpr, corteSpr)
    {
        super(scene, x, y, bandejaSpr);
        
        this.setScale(.85,.85);
        this.setInteractive();
        
        this.scene.add.existing(this);
    };
    
    PreUpdate()
    {
        
    }
    
    Reset()
    {

    }
}