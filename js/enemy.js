// Moving variables
var argLC = [25];
var argC = [250, 250];
var argR = [100];
var playerCenter = [400, 320];

function move(enemy, type, speed, args){
	// param = starting parameter based on starting position of enemy position
	// and the kind of path (type) that enemy runs on
	if (type == 1){
		// move around the circle
		// args = [centerX, centerY]
		if (enemy.param == undefined){
			enemy.radius = Math.sqrt((enemy.body.x - args[0]) * (enemy.body.x - args[0]) +
				(enemy.body.y - args[1]) * (enemy.body.y - args[1]));
			enemy.param = Math.acos((enemy.x - args[1])/enemy.radius);
		}
		else{
			enemy.body.x = enemy.radius * 0.66 * Math.cos(enemy.param) + args[0];
			enemy.body.y = enemy.radius * 0.66 * Math.sin(enemy.param) + args[1];
			enemy.body.angle = enemy.param/Math.PI * 180;
		}
	}
	else if (type == 2){
		// move up down
		// args = [max range(for up-down)]
		// -1 = up, 1 = down
		if (enemy.param == undefined){
			enemy.param = speed;
			enemy.sign = -1;
		}
		if (enemy.param > args[0]){
			enemy.param = 0;
			enemy.sign = -enemy.sign;
		}
		enemy.y += enemy.sign * speed;
	}
	else if (type == 3){
		// move left right
		// args = [max range(for up-down)]
		// -1 = up, 1 = down
		if (enemy.param == undefined){
			enemy.param = speed;
			enemy.sign = -1;
		}
		if (enemy.param > args[0]){
			enemy.param = 0;
			enemy.sign = -enemy.sign;
		}
		enemy.x += enemy.sign * speed;
	}
	else if (type == 4){
		// move locally around a circle;
		// args = [radius]
		if (enemy.cX == undefined){
			enemy.cX = enemy.x + args[0] * Math.sqrt(0.5);
			enemy.cY = enemy.y + args[0] * Math.sqrt(0.5);
			enemy.param = 0.25;
		}
		else{		
			enemy.x = args[0] * Math.cos(Math.PI * enemy.param) + enemy.cX;
			enemy.y = args[0] * Math.sin(Math.PI * enemy.param) + enemy.cY;		
		}
	}
	else if (type == 5){
		// move by some function??
	}

	enemy.param += speed;

}

function fireBullet(baddie, bullets, angleRange){
	for (var i=0;i<baddie.length;i++){
		var k=Math.random();
		if (k>0.3){
		var bullet = bullets.getFirstExists(false);
			if(bullet){
				bullet.touched = false;
				var k1 = (Math.random()-0.5) * angleRange;
				bullet.reset(baddie[i].x,baddie[i].y);
				var angle = Math.PI * (baddie[i].angle + 90 + k1)/180
				bullet.body.velocity.x = -Math.sin(angle) * 500;
				bullet.body.velocity.y = Math.cos(angle) * 500;
			}
		}
	}
}