
const config = {
  width: 320,              
  height: 180,            
  parent: "game",
  type: Phaser.AUTO,      
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}

var game = new Phaser.Game(config);

  // Métodos init, preload, create, update
  function preload(){        
		//this.load.image('banner', 'assets/pagina/images/banner.jpg');
    console.log("soy preload");
  }    
  function create(){               
    //this.add.image(0, 0, 'banner').setOrigin(0, 0);
    console.log("soy create");  
    }
    function update(time, delta){
      console.log(delta);
    }