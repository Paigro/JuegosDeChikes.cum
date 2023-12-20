

export default class resultadoTest extends Phaser.Scene // Manager de la escena que da el resultado del test.
{
    constructor() {
        super({ key: 'resultadoTest', active: false }); // Nombre de la escena para el SceneManager
    }

    // Metodos init, preload, create, update:
    init(data) {
        this.coor = data;





        // Este color se lo pasara el coordinator dependiendo de la personalidad.
        this.cameras.main.setBackgroundColor("#84E2FE");








    }

    preload() {
        // IMAGENES:
        /*// Amarillo:
        this.load.image('virtuoso', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('aventurero', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('emprendedor', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('animador', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).
        // Morado:
        this.load.image('arquitecto', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('logico', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('camandante', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('innovador', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).
        // Verde:
        this.load.image('abogado', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('mediador', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('protagonista', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('activista', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).
        // Azul:
        this.load.image('logista', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('defensor', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('ejecutivo', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).
        this.load.image('consul', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).*/
        // Boton:
        this.load.image('atras', "/assets/juego/MetroSkaters/imagenes/teclaizquierda.png"); // Cargamos la imagen de volver atras (provisional).

    }

    create() {
        //#region parametros
        this.coorRes = this.coor.returnPersonalidad(); // Resultado que le da el coordinador a esta escena.
        //#endregion
        //#region texto
        this.resultado = this.add.text(16, 16, "Eres: " + this.coorRes, { fontSize: '70px', fill: '#fff', fontFamily: 'Comic Sans MS' }).setPosition(540, 375); // Texto para mostrar el resultado.
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
        this.add.sprite(0, 0, 'virtuoso').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.add.sprite(0, 0, 'aventurero').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.add.sprite(0, 0, 'emprendedor').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.add.sprite(0, 0, 'animador').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        // Morado:
        this.add.sprite(0, 0, 'arquitecto').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.add.sprite(0, 0, 'virtuoso').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.add.sprite(0, 0, 'virtuoso').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.add.sprite(0, 0, 'virtuoso').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        // Verde:
        this.add.sprite(0, 0, 'virtuoso').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.add.sprite(0, 0, 'virtuoso').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.add.sprite(0, 0, 'virtuoso').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.add.sprite(0, 0, 'virtuoso').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        // Azul:
        this.add.sprite(0, 0, 'virtuoso').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.add.sprite(0, 0, 'virtuoso').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.add.sprite(0, 0, 'virtuoso').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        this.add.sprite(0, 0, 'virtuoso').setOrigin(0, 0).setScale(0.3, 0.3); // Añadimos la imagen del fondo.
        //#endregion
    }

    finalDelJuego() {
        console.clear();
        this.scene.start("Hub");
    }
}