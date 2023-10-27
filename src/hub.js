const sceneConfigA = {
    key: 'hub',
    create: createA,
    parent: document.getElementById('game'),
    pack: {
        files: [
            { type: 'image', key: 'juan', url: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/05/illojuan-3035606.jpg?tf=3840x' }
        ]
    }
};
function createA ()
{
    this.add.image(400, 300, 'juan');

    //this.input.on('pointerdown', () =>
    //{

    //})
};
var game = new Phaser.Game(sceneConfigA);