var backgroundSpace;

var controlState = {
  	create: function(){
    	backgroundSpace = game.add.tileSprite(0, 0, 800, 640, 'backgroundSpace');

        var titleText = game.add.text(400, 100, 'Pongalan Pilot Manual - Controls', {font: 'Impact', fontSize: '32px', fill: '#00f6ff' });
        titleText.anchor.setTo(0.5,0.5);
		var menuButton = this.game.add.button(400,580,"menu_button",this.moveToMain,this, 2, 0, 1);
		menuButton.anchor.setTo(0.5,0.5);
        
        var helpButton = game.add.sprite(275,200,"arrow_control_help");
		helpButton.anchor.setTo(0.5,0.5);
        helpButton = game.add.sprite(550,200,"paddle_control_help");
		helpButton.anchor.setTo(0.5,0.5);
        helpButton = game.add.sprite(275,400,"esc_control_help");
		helpButton.anchor.setTo(0.5,0.5);

        
        var helpText = game.add.text(275, 300, "Ship controls", {font: 'Tahoma', fontSize: '16px', fill: '#ffce00' });
        helpText.anchor.setTo(0.5,0.5);
        helpText.fontWeight = 'bold';
        helpText.align = 'center';

        helpText = game.add.text(550, 275, "Paddle controls (Level Dependent!)", {font: 'Tahoma', fontSize: '16px', fill: '#ffce00' });
        helpText.anchor.setTo(0.5,0.5);
        helpText.fontWeight = 'bold';
        helpText.align = 'center';

        helpText = game.add.text(275, 475, "Pause", {font: 'Tahoma', fontSize: '16px', fill: '#ffce00' });
        helpText.anchor.setTo(0.5,0.5);
        helpText.fontWeight = 'bold';
        helpText.align = 'center';
		
        var catchButton = this.game.add.button(500,400,"select_button",undefined,this, 0, 0, 0);
		catchButton.anchor.setTo(0.5,0.5);
        var text = game.add.text(0, 0, "F", {font: "30px Arial", fill: "#ffffff"});
		text.anchor.setTo(0.5,0.5);
        catchButton.addChild(text);
		
        catchButton = this.game.add.button(600,400,"select_button",undefined,this, 0, 0, 0);
		catchButton.anchor.setTo(0.5,0.5);
        var text = game.add.text(0, 0, "R", {font: "30px Arial", fill: "#ffffff"});
		text.anchor.setTo(0.5,0.5);
        catchButton.addChild(text);

        helpText = game.add.text(550, 475, "Special Actions (Pay attention to the story!)", {font: 'Tahoma', fontSize: '16px', fill: '#ffce00' });
        helpText.anchor.setTo(0.5,0.5);
        helpText.fontWeight = 'bold';
        helpText.align = 'center';
	},
	moveToMain: function(){
		this.game.state.start("main_menu");
	},
  	update: function(){
    	//  Scroll the background
    	backgroundSpace.tilePosition.y += 2;
	 }
    
}
