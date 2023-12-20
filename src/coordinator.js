export default class Coordinator {
    constructor(scene) {
        this.scene = scene;
        this.ExtInt = 0;
        this.SenRac = 0;
        this.EspOrg = 0;
        this.DetGen = 0;

        this.personalidad = "";

    };

    SaveScore(rasgo, puntos) {
        //console.log("coordinator B)");
        switch (rasgo) {
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

    CalcularPersonalidad() {
        this.personalidad = "";
        this.calculable = true;

        if (this.calculable) {
            if (this.ExtInt > 0) this.personalidad += "I";
            else if (this.ExtInt < 0) this.personalidad += "E";
            else this.calculable = false;

        }
        if (this.calculable) {
            if (this.SenRac > 0) this.personalidad += "R";
            else if (this.SenRac < 0) this.personalidad += "S";
            else this.calculable = false;

        }
        if (this.calculable) {
            if (this.EspOrg > 0) this.personalidad += "O";
            else if (this.EspOrg < 0) this.personalidad += "E";
            else this.calculable = false;

        }
        if (this.calculable) {
            if (this.DetGen > 0) this.personalidad += "G";
            else if (this.DetGen < 0) this.personalidad += "D";
            else this.calculable = false;

        }

        if (this.calculable) {
            this.scene.personalidad(this.personalidad);
            console.log(this.personalidad);
        }
        //console.log(this);

    }
    returnPersonalidad() {
        //this.CalcularPersonalidad();
        this.personalidad = "EREG";
        return this.personalidad;
    }
}