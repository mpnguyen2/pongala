var bootState =  function(game){}

bootState.prototype ={

	preload: function(){
	this.scale.scaleMode = Phaser.ScaleManager.NO_SCALEL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;

	    console.log("%cStarting my game", "color:white; background:red");
        this.game.load.image("loading","assets/images/loadbar.png"); 
	},
  	create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
		this.scale.updateLayout();
		this.game.state.start("preload");
	}
}