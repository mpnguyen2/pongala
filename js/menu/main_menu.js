var backgroundSpace;
var menu_choose_sound;

var scoreboard;

var mainmenuState = {
  	create: function(){
    	backgroundSpace = game.add.tileSprite(0, 0, 800, 640, 'backgroundSpace');
        var title = this.add.sprite(game.width/2,game.height-540,"title");
        title.anchor.setTo(0.5,0.5);
        var menuText = game.add.text(game.width/2, 180, 'Main Menu', {font: 'Impact', fontSize: '32px', fill: '#00f6ff' });
        menuText.anchor.setTo(0.5,0.5);
        
		var playButton = this.game.add.button(game.width/2,280,"play_button",this.playGame1,this, 2, 0, 1);
		playButton.anchor.setTo(0.5,0.5);

		playButton = this.game.add.button(game.width/2,380,"level_button",this.moveToLS,this, 2, 0, 1);
		playButton.anchor.setTo(0.5,0.5);

		playButton = this.game.add.button(game.width/2,480,"control_button",this.moveToControls,this, 2, 0, 1);
		playButton.anchor.setTo(0.5,0.5);

		playButton = this.game.add.button(game.width/2,580,"help_button",this.moveToHelp,this, 2, 0, 1);
		playButton.anchor.setTo(0.5,0.5);
		//No apparent need to create a variable for each button, let one variable do all the work.

		this.organizeScore(high_score_array);
		scoreboard=this.add.graphics(0, 0);
		scoreboard.lineStyle(2, 0x0000FF, 1);
		scoreboard.drawRoundedRect(575, 200, 200, 400,9);
		scoreboard.beginFill(0xff0000);
		scoreboard.drawRoundedRect(575, 200, 200, 400,9);
		scoreboard.endFill();
		//scoreboard.endFill();
		scoreboard.anchor.setTo(0.5,0.5);

		
    	var creditsText= game.add.text(10, 500, 'Designed by Team RPM:' + 
		"\nPeter Ly, Runnan Pan, Minh Nguyen" +
		"\nArt and SFX by Peter Ly" +
		"\nMusic Provided by Stony Brook University",
		{font: 'Verdana', fontSize: '12px', fill: '#ffce00' });


    	var scoreboardText = game.add.text(600, 225, 'HIGHSCORE:' + 
		"\n 1: " + high_score_array[0] + 
		"\n 2: " + high_score_array[1] + 
		"\n 3: " + high_score_array[2] + 
		"\n 4: " + high_score_array[3] + 
		"\n 5: " + high_score_array[4], 
		{font: 'Verdana', fontSize: '24px', fill: '#ffffff' });
	},
	playGame1: function(){
		menu_choose_sound.play();
		this.game.state.start("cut1");
	},
	moveToLS: function(){
		menu_choose_sound.play();
		this.game.state.start("level_select");
	},
	moveToControls: function(){
		menu_choose_sound.play();
		this.game.state.start("controls");
	},
	moveToHelp: function(){
		menu_choose_sound.play();
		this.game.state.start("help");
	},
  	update: function(){
    	//  Scroll the background
    	backgroundSpace.tilePosition.y += 2;
	
		if(this.input.keyboard.isDown(Phaser.Keyboard.ONE)){
			this.game.state.start("Level1");
		}else if(this.input.keyboard.isDown(Phaser.Keyboard.TWO)){
			this.game.state.start("Level2");
		}else if(this.input.keyboard.isDown(Phaser.Keyboard.THREE)){
			this.game.state.start("Level3");
		}	 
	 },
	 //generic selection sort to quickly organize highscores and take out any that aren't the top 5. 
  	organizeScore: function(array){
		var start;
		var temp; 
		for(var i = 0; i<array.length; i++){
			start=i;		
			for(var  j = i+1; j<array.length; j++){
				if(array[j]<array[start]){
					start = j;
				}
			}			
			temp = array[i];
			array[i] = array[start];
			array[start] = temp;
		}
		high_score_array.reverse();
		high_score_array.splice(5);
	 }
}