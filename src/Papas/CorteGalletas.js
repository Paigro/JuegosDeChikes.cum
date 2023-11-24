import AccionBase from "../accionBase.JS";

export default class CorteGalletas extends AccionBase{
    constructor()
    {
        super();
        this.load.image('Bandeja1', '../assets/juego/PapasGalleteria/Bandeja_1.png');
        this.Bandeja = this.add.image(0, 0, 'Bandeja1').setOrigin(0, 0).setScale(0.1, 0.1).setInteractive();
    };

    
    BlockThisAction()
    {
        
    }
    
    Reset()
    {

    }
}