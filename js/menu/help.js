var backgroundSpace;

var helpState = {
  	create: function(){
    	backgroundSpace = game.add.tileSprite(0, 0, 800, 640, 'backgroundSpace');
        var titleText = game.add.text(400, 100, 'Pongalan Pilot Manual - Help', {font: 'Impact', fontSize: '32px', fill: '#00f6ff' });
        titleText.anchor.setTo(0.5,0.5);

        var helpString = "Once upon a time, the evil Zinzinia empire wanted" + "\nto take over the small DraKo colony." +  
        "\nThe DraKo colony, however, was a nation of pacifists" + "\nthat had never fired a gun before." +
        "\nIn an effort to prepare for war, they took their great sport, Pongala, " +
        "\nand designed a ship that none had ever seen before," + "\none that did not shoot but Ponged back shots." +
        "\nYour are the pilot chosen to defend the colony: good luck!";

        var playerHelpString ="Your ship dies if hit:" + "\nuse your paddle to reflect shots!";
        var enemyHelpString ="The bad guys can shoot," + "\nbut have no defenses!";
        var powerHelpString ="Your HD (Heart Drives) are your health!" + "\nIf they hit zero, you die!";

        var helpText = game.add.text(400, 225, helpString, {font: 'Tahoma', fontSize: '16px', fill: '#ffce00' });
        helpText.anchor.setTo(0.5,0.5);
        helpText.fontWeight = 'bold';
        helpText.align = 'center';

		var menuButton = this.game.add.button(400,580,"menu_button",this.moveToMain,this, 2, 0, 1);
		menuButton.anchor.setTo(0.5,0.5);

        var paddle_help = game.add.sprite(400, 350, 'selfPad');
		paddle_help.anchor.setTo(0.5,0.5);
        var player_help = game.add.sprite(400, 400, 'selfSpaceship');
		player_help.anchor.setTo(0.5,0.5);
        var player_description = game.add.text(400, 485, playerHelpString, {font: 'Tahoma', fontSize: '14px', fill: '#ffce00' });
		player_description.anchor.setTo(0.5,0.5);
        player_description.align = 'center';

        var enemy_help = game.add.sprite(175, 400, 'selfEnemy');
		enemy_help.anchor.setTo(0.5,0.5);
        var bullet_help = game.add.sprite(enemy_help.x, enemy_help.y+40, 'selfBullet');
		bullet_help.anchor.setTo(0.5,0.5);
        var enemy_description = game.add.text(175, 485, enemyHelpString, {font: 'Tahoma', fontSize: '14px', fill: '#ffce00' });
		enemy_description.anchor.setTo(0.5,0.5);
        enemy_description.align = 'center';

        var power_help = game.add.sprite(650, 420, 'health');
		power_help.anchor.setTo(0.5,0.5);
        var power_description = game.add.text(650, 485, powerHelpString, {font: 'Tahoma', fontSize: '14px', fill: '#ffce00' });
		power_description.anchor.setTo(0.5,0.5);
        power_description .align = 'center';
	},
	moveToMain: function(){
		this.game.state.start("main_menu");
	},
  	update: function(){
    	//  Scroll the background
    	backgroundSpace.tilePosition.y += 2;
	 }
    
}
