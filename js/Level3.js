/**
 * Level3 state.
 */
function Level3() {
	Phaser.State.call(this);

}


var proto = Object.create(Phaser.State.prototype);
Level3.prototype = proto;
Level3.prototype.constructor = Level1;
var baddie=new Array();
var firingTimer=0;
var graphics;
var menuButton;
var unpauseButton;
var buttonGroup;
var enemysnumber=0;
var backgroundSpace;
var boardlife=3;
var boardTimer=0;
var playerlife=10;

var canDamage = true;
var healthMeter = [];
var healthBars;

var ship_death_sound;
var reflect_sound;
var player_hurt_sound;

//ship die = +100. At 2000, display win menu, move to next level. 
//You don't keep lives but you keep score - you want to get score as high as possible.
//keeps track of total score. Reset only if you ever go back to main menu.
var bountyText;
var hiScoreText;
var countdownText;
var goalText;
var healthText;


var youwin=false;

// STICK STUFFS
var stick = false;
// stick time stamp (the time when stick is activated)
var stickTime = new Date().getTime();
var stickBullet;
var releaseStickBullet=false;
var playerCenter = [];

var baddie2=new Array();
var countdownVal=306;


Level3.prototype.init = function() {
	this.world.setBounds(0, 0, this.world.width, this.world.height);
	this.stage.backgroundColor = 0x5e81a1;
	this.physics.startSystem(Phaser.Physics.P2JS);
	this.physics.p2.restitution = 0.9;
};



Level3.prototype.create = function() {
	stick = false;
	backgroundMusic.stop();
	backgroundMusic = game.add.audio('level_3_music');
	backgroundMusic.loop = true;
	backgroundMusic.play();

    backgroundSpace = game.add.tileSprite(0, 0, 800, 640, 'backgroundSpace');
	// LOAD TILEMAP HERE
		this.map = this.game.add.tilemap('map');
		// add tileset
		this.map.addTilesetImage('tileset', 'tiles');
		// create (background) layer
		this.backgroundLayer = this.map.createLayer('background');
	

	graphics = this.add.graphics(0, 0);
	buttonGroup = this.add.group(); 
	
    //bars for healthBar group
    healthBars = this.add.group(); 

    for (var i = 0; i < playerlife; i++)
    {
        healthMeter[i] = game.add.sprite((i * 35)+64, 0, 'health');
    }
	

	//player
	this.player =this.add.sprite(this.world.centerX, this.world.centerY, "selfSpaceship");
	this.player.health=5;
	this.player.animations.add('playerstay', [0,1,2,3],8, true);
	this.player.animations.add('playerdamage',[4,5],8,true);
	this.player.animations.add('playerdying',[6,7],8,true);
	this.player.anchor.setTo(0.5, 0.5);
	playerCenter = [this.player.x, this.player.y];

	//board
	this.board =this.add.sprite(this.world.centerX,this.world.centerY,"selfPadBig");

	
    
    this.player.animations.play('playerstay');

    this.physics.p2.enable(this.player,false);
	this.physics.p2.enable(this.board, false);
	this.player.enableBody=true;
	this.player.body.setCircle(28);
    this.player.body.collideWorldBounds = true;
	this.board.body.collideWorldBounds = true;

	this.player.physicsBodyType=Phaser.Physics.P2JS;
  
    this.physics.p2.createLockConstraint(this.player.body, this.board.body,[0, 60], 0); //will have to change later
    
	this.player.body.fixedRotation=true;

//enemy
    this.enemys=this.add.group();
	this.enemys.enableBody=true;
	this.enemys.physicsBodyType=Phaser.Physics.P2JS;
	
	 for(var i=0;i<5;i++){
	    var k=Math.random();
        var k2=Math.random();
        baddie[i]=this.enemys.create(k*800,10,'selfEnemy2');
        baddie[i].scoreTime = new Date().getTime();
		enemysnumber++;
    
        baddie[i].body.collideWorldBounds=true;
    }
	 for(var i=0;i<5;i++){
	    var k=Math.random();
        var k2=Math.random();
        baddie2[i]=this.enemys.create(k*800,10,'selfEnemy');
        baddie2[i].scoreTime = new Date().getTime();
		enemysnumber++;
       
        baddie2[i].body.collideWorldBounds=true;
    }
	this.enemys.callAll('animations.add','animations','enemystay',[0,1,2,3],7,true);
	this.enemys.callAll('animations.add','animations','enemydying',[6,3,5,4],7,true);
	this.time.events.repeat(Phaser.Timer.SECOND, Infinity, this.enemymove, this);
	
                
 
    //bullet
	this.bullets=this.add.group();
	this.bullets.enableBody=true;
	this.bullets.physicsBodyType=Phaser.Physics.P2JS;
	this.bullets.createMultiple(20,'selfBullet');
	this.bullets.setAll('checkWorldBounds',true);
	this.bullets.setAll('outOfBoundsKill',true);

   //stickBullet
    stickBullet=this.add.sprite(0,0,"selfBullet");
	stickBullet.enableBody=true;
	stickBullet.physicsBodyType=Phaser.Physics.P2JS;
	this.physics.p2.enable(stickBullet, false);
	stickBullet.anchor.setTo(0.5, 0.5);
    stickBullet.pivot.x=48;
	stickBullet.pivot.y=60;
	stickBullet.kill();

	//score
    bountyText = game.add.text(16, 40, 'Bounty: ' + bounty_score, { fontSize: '32px', fill: '#fdfbf2' });
    hiScoreText = game.add.text(16, 80, 'HiScore: ' + high_score, { fontSize: '32px', fill: '#fdfbf2' });
    healthText = game.add.text(16, 10, 'HD:', { fontSize: '24px', fill: '#fdfbf2' });
	
    goalText = game.add.text(this.world.centerX, this.world.centerY-100, "FINAL LEVEL: Get 2000 Bounty!", { fontSize: '32px', fill: '#ff4500' });
    goalText.anchor.setTo(0.5,0.5);
    countdownText = game.add.text(this.world.centerX, this.world.centerY, (parseInt(Math.ceil(countdownVal/100))), { fontSize: '64px', fill: '#ff4500' });
    countdownText.anchor.setTo(0.5,0.5);


//sound
  ship_death_sound = game.add.audio('ship_death_sound');
	reflect_sound = game.add.audio('reflect_sound');
	player_hurt_sound = game.add.audio('player_hit');



	this.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

	/* p2 overlap function */
	game.physics.p2.setPostBroadphaseCallback(this.overlap, this);

	this.cursors = this.input.keyboard.addKeys( { 
    'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 'right': Phaser.KeyCode.RIGHT, 
    'pause': Phaser.KeyCode.ESC,} );

	this.game.physics.p2.paused=false;

	this.gameOver = false;

};



Level3.prototype.pauseFunction=function(){
		if(game.physics.p2.paused==false)
		{
    // draw a rectangle
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.drawRoundedRect(150, 100, 500, 500,9);
	graphics.beginFill(0xff0000);
	graphics.anchor.setTo(0.5,0.5);
    graphics.drawRoundedRect(150, 100, 500, 500,9);
	graphics.endFill();
	buttonGroup.add(graphics)
	game.physics.p2.paused=true;
        var titleText = game.add.text(400, 150, 'Paused', {font: 'Verdana', fontSize: '32px', fill: '#ffffff' },buttonGroup);
		titleText.anchor.setTo(0.5,0.5);

		var unpauseButton = this.game.add.button(400,250,"generic_button",this.unpauseFunction,this, 2, 0, 1, 2,buttonGroup);
        var text = game.add.text(0, 0, "Resume Game", {font: "30px Arial", fill: "#ffffff"});
		text.anchor.setTo(0.5,0.5);
        unpauseButton.addChild(text);
		unpauseButton.anchor.setTo(0.5,0.5);

		var levelButton = this.game.add.button(400,350,"level_button",this.moveToLS,this, 2, 0, 1, 2,buttonGroup);
		levelButton.anchor.setTo(0.5,0.5);

		var menuButton = this.game.add.button(400,450,"menu_button",this.moveToMain,this, 2, 0, 1, 2,buttonGroup);
		menuButton.anchor.setTo(0.5,0.5);

        game.world.bringToTop(buttonGroup);
		}
}


Level3.prototype.gameOverFunction=function(){
    // draw a rectangle
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.drawRoundedRect(150, 100, 500, 500,9);
	graphics.beginFill(0xff0000);
	graphics.anchor.setTo(0.5,0.5);
    graphics.drawRoundedRect(150, 100, 500, 500,9);
	graphics.endFill();
	buttonGroup.add(graphics)
	game.physics.p2.paused=true;
		high_score_array.unshift(high_score);
        var titleText = game.add.text(400, 125, 'GAME OVER', {font: 'Verdana', fontSize: '32px', fill: '#ffffff' },buttonGroup);
		titleText.anchor.setTo(0.5,0.5);
        var titleText2 = game.add.text(400, 175,"Your High Score:" + high_score, {font: 'Verdana', fontSize: '32px', fill: '#ffffff' },buttonGroup);
		titleText2.anchor.setTo(0.5,0.5);

		var levelButton = this.game.add.button(400,250,"level_button",this.moveToLS,this, 2, 0, 1, 2,buttonGroup);
		levelButton.anchor.setTo(0.5,0.5);

		var menuButton = this.game.add.button(400,350,"menu_button",this.moveToMain,this, 2, 0, 1, 2,buttonGroup);
		menuButton.anchor.setTo(0.5,0.5);

        game.world.bringToTop(buttonGroup);
}

Level3.prototype.nextLevelFunction=function(){
    // draw a rectangle
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.drawRoundedRect(150, 100, 500, 500,9);
	graphics.beginFill(0xff0000);
	graphics.anchor.setTo(0.5,0.5);
    graphics.drawRoundedRect(150, 100, 500, 500,9);
	graphics.endFill();
	buttonGroup.add(graphics)
	game.physics.p2.paused=true;
		high_score_array.unshift(high_score);
        var titleText = game.add.text(400, 125, 'YOU WIN!', {font: 'Verdana', fontSize: '32px', fill: '#ffffff' },buttonGroup);
        //var titleText = game.add.text(400, 150, 'GAME OVER' + "\n Your High Score:" + high_score, {font: 'Verdana', fontSize: '32px', fill: '#ffffff' },buttonGroup);
		titleText.anchor.setTo(0.5,0.5);
        var titleText2 = game.add.text(400, 175,"Your High Score:" + high_score, {font: 'Verdana', fontSize: '32px', fill: '#ffffff' },buttonGroup);
		titleText2.anchor.setTo(0.5,0.5);

		var levelButton = this.game.add.button(400,250,"level_button",this.moveToLS,this, 2, 0, 1, 2,buttonGroup);
		levelButton.anchor.setTo(0.5,0.5);

		var menuButton = this.game.add.button(400,350,"menu_button",this.moveToMain,this, 2, 0, 1, 2,buttonGroup);
		menuButton.anchor.setTo(0.5,0.5);

        game.world.bringToTop(buttonGroup);
}


Level3.prototype.unpauseFunction=function(){
	buttonGroup.destroy();
	graphics.clear();
	graphics = this.add.graphics(0, 0);
	buttonGroup = this.add.group(); 
	game.physics.p2.paused=false;
}
Level3.prototype.moveToLS=function(){
		backgroundMusic.stop();
		backgroundMusic = game.add.audio('menu_music');
		backgroundMusic.loop = true;
		backgroundMusic.play();
		this.game.state.start("level_select");
		this.resetStatus();
}

Level3.prototype.moveToMain=function(){
		backgroundMusic.stop();
		backgroundMusic = game.add.audio('menu_music');
		backgroundMusic.loop = true;
		backgroundMusic.play();
		this.game.state.start("main_menu");
		this.resetStatus();
}

Level3.prototype.moveToNext=function(){
		this.game.state.start("Level3");
		this.resetStatusForNextLevel();
}


Level3.prototype.update = function() {
	///did we start yet? If no, nothing else fires except for this function
	if(countdownVal!=-50 && countdownVal<302){
		game.physics.p2.paused=true;
		countdownVal-=2;
		if(countdownVal>0){
			countdownText.text = parseInt(Math.ceil(countdownVal/100));	
		}
		else{
			if(countdownVal<=-20){			
				game.physics.p2.paused=false;
			}
			countdownText.text = "GO!";	
			
		}
	}
	else{
		if(countdownVal>=302){
			countdownVal-=2;
		}
		if(countdownVal<=-50){
			goalText.text = '';
		}
		countdownText.text = '';
     
	//win condition
	if(bounty_score>=2000 && youwin == false){
		youwin=true;
		this.nextLevelFunction();
	}
	
    //  Scroll the background
    backgroundSpace.tilePosition.y += 2;
	
	if (this.cursors.pause.isDown) {
		//console.log("test");
		this.pauseFunction();
	}
	




if (this.cursors.left.isDown) {
		
		this.player.body.velocity.x=-500;
	
		this.board.body.velocity.x=-500;
	
} else if (this.cursors.right.isDown) {
		
		this.player.body.velocity.x=500;
	
		this.board.body.velocity.x=500;
	} else if(this.cursors.up.isDown){
		this.player.body.velocity.y=-500;
        this.board.body.velocity.y=-500;

		
	}else if (this.cursors.down.isDown){
		this.player.body.velocity.y=500;
        this.board.body.velocity.y=500;
			
	}else {
	
		this.player.body.velocity.x=0;
		this.player.body.velocity.y=0;
	
		this.board.body.velocity.x=0;
        this.board.body.velocity.y=0;
	}

	  if(this.input.keyboard.isDown(Phaser.Keyboard.A)){
    	this.player.body.rotation-=0.2
           if(stickBullet.alive && releaseStickBullet!=true){
                  stickBullet.body.angularVelocity=-1000;
			     
		       }else if (stickBullet.alive && releaseStickBullet==true ){
				var angle = (this.board.angle-180)/180 * Math.PI;
                  stickBullet.body.velocity.x = -500 * Math.sin(angle);
			     stickBullet.body.velocity.y = 500 * Math.cos(angle);
				 stickBullet.body.angularVelocity=0;
		      }else{
			
		       }

         

		}else if(this.input.keyboard.isDown(Phaser.Keyboard.D)){
    	this.player.body.rotation+=0.2;
          
		        if(stickBullet.alive && releaseStickBullet!=true){
                  stickBullet.body.angularVelocity=1000;
			     
		       }else if (stickBullet.alive && releaseStickBullet==true ){
					var angle = (this.board.angle-180)/180 * Math.PI;
                  stickBullet.body.velocity.x = -500 * Math.sin(angle);
			     stickBullet.body.velocity.y = 500 * Math.cos(angle);
				 stickBullet.body.angularVelocity=0;
		      }else{
			
		       }
}else {
		this.player.body.angularVelocity=0;
		this.board.body.angularVelocity=0;
		   if(stickBullet.alive && releaseStickBullet!=true){
                  stickBullet.body.angularVelocity=0;
			     
		       }else if (stickBullet.alive && releaseStickBullet==true ){
				var angle = (this.board.angle-180)/180 * Math.PI;
                  stickBullet.body.velocity.x = -500 * Math.sin(angle);
			     stickBullet.body.velocity.y = 500 * Math.cos(angle);
				 stickBullet.body.angularVelocity=0;
		      }else{
			
		       }
	}
	
	
	if(this.input.keyboard.isDown(Phaser.Keyboard.ONE)){
		stick=false;
		this.resetStatus();
		this.game.state.start("Level1");

	}else if(this.input.keyboard.isDown(Phaser.Keyboard.TWO)){
		stick=false;
		this.resetStatus();
		this.game.state.start("Level2");
	}else if(this.input.keyboard.isDown(Phaser.Keyboard.THREE)){
		stick=false;
		this.resetStatus();
		this.game.state.start("Level3");
	}	 
for (var i = 0, len = this.enemys.children.length; i < len; i++) 
{  
	if(this.enemys.children[i].animations.currentAnim.name == 'enemydying'){
		this.enemys.children[i].die = true;
	
		if(this.enemys.children[i].die == true && this.enemys.children[i].animations.currentAnim.isPlaying){
			this.enemys.children[i].kill();
		}
	}
}
  if (baddie.length == 0){
     this.restEnemy();
  }

  if (baddie2.length == 0){
     this.restEnemy2();
  }
   
				
		if(game.physics.p2.paused==false){
  
				if (this.time.now > firingTimer)
						{
							this.fireBullet();
						};
				// enemy movement
					for (var i = 0; i < baddie.length; i++){
						move(baddie[i], 1, 0.01, playerCenter);
					}
		}

					this.bullets.forEach(function(item) {
						item.body.collideWorldBounds = false;
					}, this);
	}

};

Level3.prototype.overlap=function(body1, body2){

	// enemies and player
	
	if ((body1.sprite.key == 'selfSpaceship' && body2.sprite.key == 'selfEnemy2')||(body2.sprite.key == 'selfSpaceship' && body1.sprite.key == 'selfEnemy2')){
				/*onsole.log(body1);
				console.log(body2);
				console.log(body1.sprite.key);
				console.log(body2.sprite.key);*/
				if(body1.sprite.key=="selfSpaceship"){
				this.playerVsEnemy(body1, body2);
			}else {
				this.playerVsEnemy(body2, body1);
			}
				return false;
	}



// bullet and player
	if ((body1.sprite.key == 'selfSpaceship' && body2.sprite.key == 'selfBullet')||(body2.sprite.key == 'selfSpaceship' && body1.sprite.key == 'selfBullet')){
				/*console.log(body1);
				console.log(body2);
				console.log(body1.sprite.key);
				console.log(body2.sprite.key);*/
				
				if(body1.sprite.key=="selfSpaceship"){
				this.playerVsBullet(body1, body2);
			}else {
				this.playerVsBullet(body2, body1);
			}
				return false;
	}

	//bullet and board
	if ((body1.sprite.key == 'selfBullet' && body2.sprite.key == 'selfPadBig')||(body2.sprite.key == 'selfBullet' && body1.sprite.key == 'selfPadBig')){
			
				if(body1.sprite.key=="selfPadBig"){
				this.boardVsBullet(body1, body2);
			}else {
				this.boardVsBullet(body2, body1);
			}
				return false;
	}

		
//board vs enemy
	
	if ((body1.sprite.key == 'selfPadBig' && body2.sprite.key == 'selfEnemy2')||(body2.sprite.key == 'selfPadBig' && body1.sprite.key == 'selfEnemy2')){
				/*console.log(body1);
				console.log(body2);
				console.log(body1.sprite.key);
				console.log(body2.sprite.key);*/
				if(body1.sprite.key=="selfPadBig"){
				this.boardVsEnemy(body1, body2);
			}else {
				this.boardVsEnemy(body2, body1);
			}
				return false;
	}

	//bullet and enemies


if ((body1.sprite.key == 'selfBullet' && body2.sprite.key == 'selfEnemy2')||(body1.sprite.key == 'selfEnemy2' && body2.sprite.key == 'selfBullet')){
			
				if(body1.sprite.key=="selfBullet"){
				this.bulletVsEnemy(body1, body2);
			}else {
				this.bulletVsEnemy(body2, body1);
			}
				return false;
	}

	
	if ((body1.sprite.key == 'selfSpaceship' && body2.sprite.key == 'selfEnemy')
	||(body2.sprite.key == 'selfSpaceship' && body1.sprite.key == 'selfEnemy')){
				if(body1.sprite.key=="selfSpaceship"){
				this.playerVsEnemy2(body1, body2);
			}else {
				this.playerVsEnemy2(body2, body1);
			}
				return false;
	}

	if ((body1.sprite.key == 'selfPadBig' && body2.sprite.key == 'selfEnemy')
	||(body2.sprite.key == 'selfPadBig' && body1.sprite.key == 'selfEnemy')){
				if(body1.sprite.key=="selfPadBig"){
				this.boardVsEnemy2(body1, body2);
			}else {
				this.boardVsEnemy2(body2, body1);
			}
				return false;
	}

	//bullet and enemies


if ((body1.sprite.key == 'selfBullet' && body2.sprite.key == 'selfEnemy')
	||(body2.sprite.key == 'selfBullet' && body1.sprite.key == 'selfEnemy')){
				if(body1.sprite.key=="selfBullet"){
				this.bulletVsEnemy2(body1, body2);
			}else {
				this.bulletVsEnemy2(body2, body1);
			}
				return false;
	}
	return false;

};

Level3.prototype.fireBullet=function(){
	fireBullet(baddie, this.bullets, 45);
	fireBullet(baddie2, this.bullets, 45);
    firingTimer = this.time.now + 1000;
};



Level3.prototype.restEnemy=function(){
	for(var i=0;i<5;i++){
	    var k=Math.random();
        var k2=Math.random();
        baddie[i]=this.enemys.create(k*800,10,'selfEnemy2');
		enemysnumber++;
      
        baddie[i].body.collideWorldBounds=true;
        baddie[i].scoreTime = new Date().getTime();
	}
	this.enemys.callAll('animations.add','animations','enemystay',[0,1,2,3],7,true);
	this.enemys.callAll('animations.add','animations','enemydying',[6,3,5,4],7,true);
	
	this.time.events.repeat(Phaser.Timer.SECOND, Infinity, this.enemymove, this); 
};

Level3.prototype.restEnemy2=function(){
	for(var i=0;i<5;i++){
	    var k=Math.random();
        var k2=Math.random();
        baddie2[i]=this.enemys.create(k*800,10,'selfEnemy');
		enemysnumber++;
      
        baddie2[i].body.collideWorldBounds=true;
        baddie2[i].scoreTime = new Date().getTime();
	}
	this.enemys.callAll('animations.add','animations','enemystay',[0,1,2,3],7,true);
	this.enemys.callAll('animations.add','animations','enemydying',[6,3,5,4],7,true);
	
	this.time.events.repeat(Phaser.Timer.SECOND, Infinity, this.enemymove, this); 
};
Level3.prototype.resetBoard=function(){
	this.board.kill();
	boardTimer=this.time.now+3000;
	boardlife=-1;
};

Level3.prototype.createBoard=function(){
    boardlife=3;
	this.board.reset(this.player.x,this.player.y)-60;
	this.board.tint = 0xffffff;

};


Level3.prototype.playerVsBullet =function(player,bullet){
	bullet.sprite.kill();
    if (healthMeter.length > 0 & canDamage == true) 
    {
        healthMeter.pop().kill();
        if (healthMeter.length <= 0) {
			ship_death_sound.play();
			this.player.play("playerdying");
			//spawnmenuhere
            //setTimeout(this.playerKillHelper(), 500);
   			game.time.events.add(Phaser.Timer.QUARTER , this.gameOverFunction, this);
			
        }
        else{ 
			player_hurt_sound.play();
			playerlife--;
			this.player.play("playerdamage");
            this.player.tint = 0xff9900;
            canDamage=false;

   			game.time.events.add(Phaser.Timer.SECOND * 2, this.invincibleDuration, this);
        }
    }
};


Level3.prototype.playerKillHelper=function() {
    this.player.kill();
	this.gameOverFunction();
}

Level3.prototype.invincibleDuration=function() {
    canDamage=true;
    this.player.tint = 0xffffff;
	this.player.play("playerstay");
}


Level3.prototype.boardVsBullet=function(board,bullet) {
	



 if (!stick){
	    	reflect_sound.play();
			bullet.sprite.touched = true;
	    	reflect(board, bullet,this.player);
	    	
	    }
	    else{
	    	bullet.sprite.kill();
            releaseStickBullet=false;
	    	stickBullet.reset(board.x,board.y);
	    }

};



Level3.prototype.playerVsEnemy = function(player, enemy) {
	

    if (healthMeter.length > 0 & canDamage == true) 
    {
        healthMeter.pop().kill();
        if (healthMeter.length <= 0) {
			ship_death_sound.play();
			this.player.play("playerdying");
   			game.time.events.add(Phaser.Timer.QUARTER , this.gameOverFunction, this);
			
        }
        else{ 
			player_hurt_sound.play();
			playerlife--;
			this.player.play("playerdamage");
            this.player.tint = 0xff9900;
            canDamage=false;

   			game.time.events.add(Phaser.Timer.SECOND * 2, this.invincibleDuration, this);
        }
    }
	
	enemy.alive=false;
    enemy.sprite.body.velocity.x=0;
	enemy.sprite.body.velocity.y=0;
	del(baddie, enemy.sprite);
	
  //  Add and update the score
	if((new Date().getTime()-enemy.sprite.scoreTime) > 100){
		high_score += 100;
		bounty_score += 100;
		hiScoreText.text = 'HiScore: ' + high_score;
		bountyText.text = 'Bounty: ' + bounty_score;
		enemy.sprite.scoreTime = new Date().getTime();
	}
	
		enemy.sprite.play("enemydying");
};



Level3.prototype.boardVsEnemy=function(board,enemy){
	ship_death_sound.play();
	enemy.alive=false;
    enemy.sprite.body.velocity.x=0;
	enemy.sprite.body.velocity.y=0;
	board.sprite.play("boarddamage");
	boardlife--;
	if(this.player.health==0){
		board.sprite.play("boarddying");
		board.sprite.kill();
		board.visble=true;
   
}
	del(baddie, enemy.sprite);

   //  Add and update the score
	if((new Date().getTime()-enemy.sprite.scoreTime) > 100){
		high_score += 100;
		bounty_score += 100;
		hiScoreText.text = 'HiScore: ' + high_score;
		bountyText.text = 'Bounty: ' + bounty_score;
		enemy.sprite.scoreTime = new Date().getTime();
	}
	
		enemy.sprite.play("enemydying");
	
};


Level3.prototype.bulletVsEnemy=function(bullet,enemy){
	if (bullet.sprite.touched){
	   bullet.sprite.kill();
	   ship_death_sound.play();

	enemy.alive=false;
    enemy.sprite.body.velocity.x=0;
	enemy.sprite.body.velocity.y=0;
	del(baddie, enemy.sprite);
	//  Add and update the score
	if((new Date().getTime()-enemy.sprite.scoreTime) > 100){
		high_score += 100;
		bounty_score += 100;
		hiScoreText.text = 'HiScore: ' + high_score;
		bountyText.text = 'Bounty: ' + bounty_score;
		enemy.sprite.scoreTime = new Date().getTime();
	}
	
		enemy.sprite.play("enemydying");
	}

	
};



Level3.prototype.playerVsEnemy2 = function(player, enemy) {
	

    if (healthMeter.length > 0 & canDamage == true) 
    {
        healthMeter.pop().kill();
        if (healthMeter.length <= 0) {
			ship_death_sound.play();
			this.player.play("playerdying");
   			game.time.events.add(Phaser.Timer.QUARTER , this.gameOverFunction, this);
			
        }
        else{ 
			player_hurt_sound.play();
			playerlife--;
			this.player.play("playerdamage");
            this.player.tint = 0xff9900;
            canDamage=false;

   			game.time.events.add(Phaser.Timer.SECOND * 2, this.invincibleDuration, this);
        }
    }
	
	enemy.alive=false;
    enemy.sprite.body.velocity.x=0;
	enemy.sprite.body.velocity.y=0;
	del(baddie2, enemy.sprite);
	
    //  Add and update the score
	if((new Date().getTime()-enemy.sprite.scoreTime) > 100){
		high_score += 100;
		bounty_score += 100;
		hiScoreText.text = 'HiScore: ' + high_score;
		bountyText.text = 'Bounty: ' + bounty_score;
		enemy.sprite.scoreTime = new Date().getTime();
	}
	
		enemy.sprite.play("enemydying");




};



Level3.prototype.boardVsEnemy2=function(board,enemy){
	ship_death_sound.play();
	enemy.alive=false;
    enemy.sprite.body.velocity.x=0;
	enemy.sprite.body.velocity.y=0;
	board.sprite.play("boarddamage");
	boardlife--;
	if(this.player.health==0){
		board.sprite.play("boarddying");
		board.sprite.kill();
		board.visble=true;
   
}
	del(baddie2, enemy.sprite);
	if((new Date().getTime()-enemy.sprite.scoreTime) > 100){
		high_score += 100;
		bounty_score += 100;
		hiScoreText.text = 'HiScore: ' + high_score;
		bountyText.text = 'Bounty: ' + bounty_score;
		enemy.sprite.scoreTime = new Date().getTime();
	}
	
	enemy.sprite.play("enemydying");
	
};


Level3.prototype.bulletVsEnemy2=function(bullet,enemy){
	if (bullet.sprite.touched){
	   bullet.sprite.kill();
	   ship_death_sound.play();
	enemy.alive=false;
    enemy.sprite.body.velocity.x=0;
	enemy.sprite.body.velocity.y=0;
	del(baddie2, enemy.sprite);

	if((new Date().getTime()-enemy.sprite.scoreTime) > 100){
		high_score += 100;
		bounty_score += 100;
		hiScoreText.text = 'HiScore: ' + high_score;
		bountyText.text = 'Bounty: ' + bounty_score;
		enemy.sprite.scoreTime = new Date().getTime();
	}
	enemy.sprite.play("enemydying");
	}

	
};




Level3.prototype.stickBulletVsEnemy=function(stickbullet,enemy){
	
		ship_death_sound.play();
	   stickbullet.kill();

	   enemy.play("enemydying");
	   del(baddie, enemy);
	   
		//  Add and update the score
		high_score += 100;
		bounty_score += 100;
		bountyText.text = 'Bounty: ' + bounty_score;
		hiScoreText.text = 'HiScore: ' + high_score;
	

};




Level3.prototype.resetStatus= function(sprite) { 
	youwin=false;        
	boardlife=3;
	boardTimer=0;
	playerlife=10;
	high_score=0;
	bounty_score=0;
	canDamage = true;
	healthMeter = [];
	stick=false;
	countdownVal=306;
	
	this.player =this.add.sprite(this.world.centerX, this.world.centerY+300, "selfSpaceship");

    //bars for healthBar group
    healthBars = this.add.group(); 

    for (var i = 0; i < playerlife; i++)
    {
        healthMeter[i] = game.add.sprite(i * 35, 0, 'health');
    }

};


Level3.prototype.resetStatusForNextLevel= function(sprite) {   
	//DOES NOT RESTORE PLAYER LIVES AND PRESERVES HIGH SCORE. MADE TO TRANSITION BETWEEN LEVELS 
	youwin=false;
	boardlife=3;
	boardTimer=0;
 	bounty_score=0;
	countdownVal=306;

	canDamage = true;
	healthMeter = [];
	
	this.player =this.add.sprite(this.world.centerX, this.world.centerY+300, "selfSpaceship");

    //bars for healthBar group
    healthBars = this.add.group(); 

    for (var i = 0; i < playerlife; i++)
    {
        healthMeter[i] = game.add.sprite(i * 35, 0, 'health');
    }

};

Level3.prototype.enemymove=function(){
    for(var i=0;i<baddie.length;i++){
    var k=Math.random();
    var k2=Math.random();
	var k3=Math.random();
	var k4=Math.random();
	var k5=Math.random();
	if (k>0.5){
     baddie[i].body.velocity.x=k2*-200;
	 

	}else{
      baddie[i].body.velocity.x=k2*200;
	}

	if(k3>0.5){
		baddie[i].body.velocity.y=k4*-200;
	}else{
		baddie[i].body.velocity.y=k4*200;
	}

  baddie[i].animations.play('enemystay');

    }

}
