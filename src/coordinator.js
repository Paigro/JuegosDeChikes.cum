export default class Coordinator{
    constructor()
    {
        this.ExtInt = 0;
        this.SenRac = 0;
        this.EspOrg = 0;
        this.DetGen = 0;
        
    };

    SaveScore(rasgo, puntos)
    {
        switch(rasgo){
            case "ExtInt":
                this.ExtInt = puntos;
                break;
            case "SenRac":
                this.SenRac = puntos;
                break;
            case "EspOrg":
                this.EspOrg = puntos;
                break;
            case "DetGen":
                this.DetGen = puntos;
                break;
            default:
                console.log("Error al guardar puntuacion");
                break;
        }
    }
}