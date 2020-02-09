var backgroundSpace;
var backgroundMusic;
var splashState = function(game){}

var menu_choose_sound;

splashState.prototype = {
  	create: function(){
		menu_choose_sound = game.add.audio('menu_choose_sound');
		
    	backgroundSpace = game.add.tileSprite(0, 0, 800, 640, 'backgroundSpace');
		backgroundMusic = game.add.audio('menu_music');
		backgroundMusic.loop = true;
		backgroundMusic.play();
		
        var title = this.add.sprite(game.width/2,game.height-540,"title");
        title.anchor.setTo(0.5,0.5);
        var splashImage = this.add.sprite(game.width/2,game.height-340,"splash");
        splashImage.anchor.setTo(0.5,0.5);
        var splashText = game.add.text(game.width/2, game.height-140, 'Click to start', {font: 'Impact', fontSize: '32px', fill: '#00f6ff' });
        splashText.anchor.setTo(0.5,0.5);
        
        this.game.input.onDown.addOnce(this.advanceMain,this);
	},
	advanceMain: function(){
		menu_choose_sound.play();
		this.game.state.start("main_menu");
	},
  	update: function(){
    	//  Scroll the background
    	backgroundSpace.tilePosition.y += 2;
	 }
}