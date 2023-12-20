

export default class resultadoTest extends Phaser.Scene // Manager de la escena que da el resultado del test.
{
    constructor() {
        super({ key: 'resultadoTest', active: false }); // Nombre de la escena para el SceneManager
    }

    // Metodos init, preload, create, update:
    init(data) {
        this.coor = data;
    }

    preload() {
        // IMAGENES:
        // Amarillo:
        this.load.image('virtuoso', "/assets/juego/personalidades/AmarilloAnimador.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('aventurero', "/assets/juego/personalidades/AmarilloAventurero.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('emprendedor', "/assets/juego/personalidades/AmarilloEmprendedor.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('animador', "/assets/juego/personalidades/AmarilloAnimador.png"); // Cargamos la imagen de volver atras (provisional).
        // Morado:
        this.load.image('arquitecto', "/assets/juego/personalidades/MoradoArquitecto.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('logico', "/assets/juego/personalidades/MoradoLogico.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('comandante', "/assets/juego/personalidades/MoradoComandante.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('innovador', "/assets/juego/personalidades/MoradoInnovador.png"); // Cargamos la imagen de volver atras (provisional).
        // Verde:
        this.load.image('abogado', "/assets/juego/personalidades/VerdeAbogado.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('mediador', "/assets/juego/personalidades/VerdeMediador.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('protagonista', "/assets/juego/personalidades/VerdeProtagonista.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('activista', "/assets/juego/personalidades/VerdeActivista.png"); // Cargamos la imagen de volver atras (provisional).
        // Azul:
        this.load.image('logista', "/assets/juego/personalidades/AzulLogista.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('defensor', "/assets/juego/personalidades/AzulDefensor.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('ejecutivo', "/assets/juego/personalidades/AzulEjecutivo.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('consul', "/assets/juego/personalidades/AzulConsul.png"); // Cargamos la imagen de volver atras (provisional).
        // Boton:
        this.load.image('atras', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).
    }

    create() {
        //#region parametros
        this.coorRes = this.coor.returnPersonalidad(); // Resultado que le da el coordinador a esta escena.
        //#endregion
        //#region texto
        this.resultado = this.add.text(16, 16, "Eres: ", { fontSize: '70px', fill: '#fff', fontFamily: 'Comic Sans MS' }).setPosition(20, 375); // Texto para mostrar el resultado.
        //#endregion
        //#region boton
        // Boton de volver atras:
        this.atras = this.add.image(0, 0, 'atras').setOrigin(0, 0).setInteractive().setDepth(3);
        this.atras.on('pointerdown', (pointer) => {
            this.finalDelJuego()
        });
        //#endregion
        //#region imagenes
        // Amarillo:
        this.virtuoso = this.add.sprite(0, 0, 'virtuoso').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.aventurero = this.add.sprite(0, 0, 'aventurero').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.emprendedor = this.add.sprite(0, 0, 'emprendedor').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.animador = this.add.sprite(0, 0, 'animador').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        // Morado:
        this.arquitecto = this.add.sprite(0, 0, 'arquitecto').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.logico = this.add.sprite(0, 0, 'logico').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.comandante = this.add.sprite(0, 0, 'comandante').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.innovador = this.add.sprite(0, 0, 'innovador').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        // Verde:
        this.abogado = this.add.sprite(0, 0, 'abogado').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.mediador = this.add.sprite(0, 0, 'mediador').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.protagonista = this.add.sprite(0, 0, 'protagonista').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.activista = this.add.sprite(0, 0, 'activista').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        // Azul:
        this.logista = this.add.sprite(0, 0, 'logista').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.defensor = this.add.sprite(0, 0, 'defensor').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.ejecutivo = this.add.sprite(0, 0, 'ejecutivo').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.consul = this.add.sprite(0, 0, 'consul').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        //#endregion
        //#region mostrar cositas
        this.changeBackGroundColor(this.coorRes);
        this.showPersonality(this.coorRes);
        //#endregion
        //this.resultado.setText('Eres: arquitecto (ESFP)');

    }

    showPersonality(pers) {
        switch (pers) {
            // Amarillo:
            case "IRED":
                this.virtuoso.setVisible(true);
                this.resultado.setText('Eres: virtuoso (ISTP)');
                console.log("virtuoso");
                break;
            case "ISED":
                this.aventurero.setVisible(true);
                this.resultado.setText('Eres: aventurero (ISFP)');
                console.log("aventurero");
                break;
            case "ERED":
                this.emprendedor.setVisible(true);
                this.resultado.setText('Eres: emprendedor (ESTP)');
                console.log("emprendedor");
                break;
            case "ESED":
                this.animador.setVisible(true);
                this.resultado.setText('Eres: animador (ESFP)');
                console.log("animador");
                break;
            // Morado:
            case "IROG":
                this.arquitecto.setVisible(true);
                this.resultado.setText('Eres: arquitecto (INTJ)');
                console.log("arquitecto");
                break;
            case "IREG":
                this.logico.setVisible(true);
                this.resultado.setText('Eres: lógico (INTP)');
                console.log("logico");
                break;
            case "EROG":
                this.comandante.setVisible(true);
                this.resultado.setText('Eres: comandante (ENTJ)');
                console.log("comandante");
                break;
            case "EREG":
                this.innovador.setVisible(true);
                this.resultado.setText('Eres: innovador (ENTP)');
                console.log("innovador");
                break;
            // Verde:
            case "ISOG":
                this.abogado.setVisible(true);
                this.resultado.setText('Eres: abogado (INFJ)');
                console.log("abogado");
                break;
            case "ISEG":
                this.mediador.setVisible(true);
                this.resultado.setText('Eres: mediador (INFP)');
                console.log("mediador");
                break;
            case "ESOG":
                this.protagonista.setVisible(true);
                this.resultado.setText('Eres: protagonista (ENFJ)');
                console.log("protagonista");
                break;
            case "ESEG":
                this.activista.setVisible(true);
                this.resultado.setText('Eres: activista (ENFP)');
                console.log("activista");
                break;
            // Azul:
            case "IROD":
                this.logista.setVisible(true);
                this.resultado.setText('Eres: logista (ISTJ)');
                console.log("logista");
                break;
            case "ISOD":
                this.defensor.setVisible(true);
                this.resultado.setText('Eres: defensor (ISFJ)');
                console.log("defensor");
                break;
            case "EROD":
                this.ejecutivo.setVisible(true);
                this.resultado.setText('Eres: ejecutivo (ESTJ)');
                console.log("defensor");
                break;
            case "ESOD":
                this.consul.setVisible(true);
                this.resultado.setText('Eres: cónsul (ESfJ)');
                console.log("consul");
                break;
            default:
                break;
        }

    }

    changeBackGroundColor(pers) {
        let color;
        // Este color se lo pasara el coordinator dependiendo de la personalidad.
        //Morado.
        if (pers === "IROG" || pers === "IREG" || pers === "EROG" || pers === "EREG") { color = "#E16EDD"; }
        //Verde.
        else if (pers === "ISOG" || pers === "ISEG" || pers === "ESOG" || pers === "ESEG") { color = "#73E16E"; }
        //Azul.
        else if (pers === "IROD" || pers === "ISOD" || pers === "EROD" || pers === "ESOD") { color = "#77EAF5"; }
        //Amarillo.
        else if (pers === "IRED" || pers === "ISED" || pers === "ERED" || pers === "ESED") { color = "#FFC300"; }
        //Naranja.
        else { color = "#ff9933" }
        this.cameras.main.setBackgroundColor(color);
        document.body.style.backgroundColor = color;
    }

    finalDelJuego() {
        console.clear();
        this.scene.start("Hub");
    }
}