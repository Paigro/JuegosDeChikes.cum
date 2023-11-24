import AccionBase from "./accionBase";
import Avion from "./avion";

export default class teclasArribaAbajo extends AccionBase
{
    constructor(scene, x, y, avion){
        super(scene, x, y);
    };
preUpdate(t,dt)
{
    this.input.keyboard.on('keydown-W', event =>
    {
        

    });
    this.input.keyboard.on('keydown-S', event =>
    {
        
    });
}
}