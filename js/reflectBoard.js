// Helper function delete elem from arr
function del(arr, elem){
	for (var i = arr.length -1; i >= 0; i--){
		if(arr[i] == elem)
			arr.splice(i, 1);
	}
}

// Assign some mass to both bullet and player.
m1 = 0.1; // bullet mass
m2 = 1000; // ship mass
function reflectL1(board, bullet,player){

/*
console.log("the reflect function was called");

console.log(board);
console.log(bullet);
console.log(player);*/


	//bullet.body.velocity.x = 0;
	//bullet.body.velocity.y = 0;

	if (player.angle==0){  
		console.log("player has angle=0");

	bullet.body.velocity.y = -bullet.body.velocity.y;
	if(player.body.velocity.x != 0){
		var x = bullet.body.velocity.x;
		var z = player.body.velocity.x;
		bullet.body.velocity.x = (m1*x + 2*m2*z - m2*x)/(m1 + m2);
		//player.body.velocity.z = (m2*z + 2*m1*x - m1*z)/(m1 + m2);
	}
   }else{
		console.log("player has nonzero angle");
		var angle =Math.PI * (2 * board.angle + 180 - 2 * bullet.angle)/180;
		//console.log("ANGLE" + angle); 
		var x1 = bullet.body.velocity.x;
		var y1 = bullet.body.velocity.y;
	    bullet.body.velocity.x = x1 * Math.cos(angle) - y1 * Math.sin(angle);
		bullet.body.velocity.y = x1 * Math.sin(angle) + y1 * Math.cos(angle);
   }
} 


function reflect(board, bullet,player){

console.log("the reflect function was called");

console.log(board);
console.log(bullet);
console.log(player);


	//bullet.velocity.x = 0;
	//bullet.velocity.y = 0;

	if (player == null || player.body == null)
		return;
	if (player.angle==0){  
		console.log("player has angle=0");

	bullet.velocity.y = -bullet.velocity.y;
	if(player.body.velocity.x != 0){
		var x = bullet.velocity.x;
		var z = player.body.velocity.x;
		bullet.velocity.x = (m1*x + 2*m2*z - m2*x)/(m1 + m2);
		//player.body.velocity.z = (m2*z + 2*m1*x - m1*z)/(m1 + m2);
	}
   }else{
		console.log("player has nonzero angle");
		var angle =Math.PI * (2 * board.angle + 180 - 2 * bullet.angle)/180;
		//console.log("ANGLE" + angle); 
		var x1 = bullet.velocity.x;
		var y1 = bullet.velocity.y;
	    bullet.velocity.x = x1 * Math.cos(angle) - y1 * Math.sin(angle);
		bullet.velocity.y = x1 * Math.sin(angle) + y1 * Math.cos(angle);
   }
} 