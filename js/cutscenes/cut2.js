var backgroundSpace;

var cut2 ={
  	create: function(){
    	backgroundSpace = game.add.tileSprite(0, 0, 800, 640, 'backgroundSpace');
          
    	var cutscene1 = game.add.sprite(0, 0, 'CUTSCENE_IMAGE_2');
		
        var level1Button = this.game.add.button(580,600,"generic_button",this.playGame2,this, 2, 0, 1);
		level1Button.anchor.setTo(0.5,0.5);
        var text = game.add.text(0, 0, "Level 2", {font: "30px Arial", fill: "#ffffff"});
		text.anchor.setTo(0.5,0.5);
        level1Button.addChild(text);
      },
	playGame2: function(){
		this.game.state.start("Level2");
	},
  	update: function(){
    	//  Scroll the background
    	backgroundSpace.tilePosition.y += 2;
	 }
}