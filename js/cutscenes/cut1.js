var backgroundSpace;

var cut1 ={
  	create: function(){
    	backgroundSpace = game.add.tileSprite(0, 0, 800, 640, 'backgroundSpace');
          
    	var cutscene1 = game.add.sprite(0, 0, 'CUTSCENE_IMAGE_1');
		
        var level1Button = this.game.add.button(230,580,"generic_button",this.playGame1,this, 2, 0, 1);
		level1Button.anchor.setTo(0.5,0.5);
        var text = game.add.text(0, 0, "Level 1", {font: "30px Arial", fill: "#ffffff"});
		text.anchor.setTo(0.5,0.5);
        level1Button.addChild(text);
      },
	playGame1: function(){
		menu_choose_sound.play();
		this.game.state.start("Level1");
	},
  	update: function(){
    	//  Scroll the background
    	backgroundSpace.tilePosition.y += 2;
	 }
}