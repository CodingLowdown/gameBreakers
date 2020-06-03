let playerScore = 0;
let paddle;
let ball;
let bricks;
let gameState;
let rows = 5;
let bricksPerRow = 10;
let recordedHits =[];
let recordedHits2 =[];
let ballSize;
let paddlesizeW;
let paddlesizeH;
let iosOn = false;
let speedInput;
let VelocityInput;
let buttonRight;
let buttonLeft;
let button = false;
let button2 = false;


function setup() {
	ios = new IOS;
	console.log(ios.iOSFinder);
	if(ios.mobileCheck()){
		createCanvas(350, 500);
		VelocityInput=createVector(3, -3);
		ballSize=7;
		paddlesizeW=75;
		paddlesizeH=12;
		speedInput=5;
		paddle = new Paddle(paddlesizeW,paddlesizeH,speedInput);
		ball = new Ball(paddle.location,ballSize,VelocityInput);
		iosOn = true;
		
	} else {
		createCanvas(800, 600);
		VelocityInput=createVector(5, -5);
		ballSize=15;
		paddlesizeW=150;
		paddlesizeH=25;
		speedInput=10;
		paddle = new Paddle(paddlesizeW,paddlesizeH,speedInput);
		ball = new Ball(paddle.location,ballSize,VelocityInput);
	}
	
	let colors = createColors();
	gameState = 'playing'; 
	bricks = createBricks(colors,rows,bricksPerRow);
	
}

function createColors(){
	const colors = [];
	colors.push(color(265,165,0));
	colors.push(color(135,206,250));
	colors.push(color(147,112,219));
	for (let i =0; i <10; i++){
		colors.push(color(random(0,255),random(0,255),random(0,255)));
	}
	return colors;
}

function createBricks(colors,rows,bricksPerRow){
	const bricks = [];
	//const rows = 5;
	const rownums= 5;
	//const bricksPerRow = 10;
	const brickWidth = width /bricksPerRow;
	for  (let row = 0; row < rows; row++){
		for ( let i =0; i < bricksPerRow; i++){
			brick = new Brick(createVector(brickWidth * i,25*row), brickWidth, 25, colors[floor(random(0,colors.length))],row,rownums);
			bricks.push(brick);
		}
	}
	return bricks;
}

function countInArray(array, what) {
	var count = 0;
	for (var i = 0; i < array.length; i++) {
		if (array[i] === what) {
			count++;
		}
	}
	return count;
}


function draw() {
	if(gameState==='playing'){
		background(0);
		ball.bounceEdge();
		ball.bouncePaddle();

		ball.update();
		if(iosOn){
			//if (mouseIsPressed){
			//	paddle.move('right');
			//} else {
			//	paddle.move('left');
			//}
			//if (mouseIsPressed && buttonRight.mousePressed) {
			//	button = true; 
			 // } else {
			//	button = false;
			 // }
			  //if (button) {
			//	paddle.move('right');
			 // }
			 if (mouseX > 175 && mouseY > 510 && mouseIsPressed) {
				button = true; 
			  } else {
				button = false;
			  }
			  if(button){
				paddle.move('right');
			  }
			  if (mouseX < 175 && mouseY > 510 && mouseIsPressed) {
				button2 = true; 
			  } else {
				button2 = false;
			  }
			  if(button2){
				paddle.move('left');
			  }
		} else {
			if (keyIsDown(LEFT_ARROW)) {
				paddle.move('left');
			} else if (keyIsDown(RIGHT_ARROW)) {
				paddle.move('right');
			}
		}
		
		paddle.display();
		ball.display();

		for (let i = bricks.length - 1; i >=0; i--){
			const brick = bricks[i];
			if (brick.isColliding(ball)){
				ball.reverse('y');
				if(i >= bricksPerRow*(rows-1)){
					bricks.splice(i,1);
					ball.ballSpeedUp();
					playerScore += brick.points;
				} else if(i >= bricksPerRow*(rows-2)) {
					if (recordedHits.includes(i)){
						bricks.splice(i,1);
						ball.ballSpeedUp();
						playerScore += brick.points;
					}
					recordedHits.push(i);
					brick.display();
				} else if(i >= 0) {
					if (countInArray(recordedHits2, i)>=2){
						bricks.splice(i,1);
						ball.ballSpeedUp();
						playerScore += brick.points;
					}
					recordedHits2.push(i);
					brick.display();
				}
				
			} else {
				brick.display();
			}
		}
		
		textSize(32);
		fill(255);
		text(`Score:${playerScore}`, width-150, 50);
		if (ball.belowBottom()){
			gameState= 'Lost';
		}
		if(bricks.length === 0){
			gameState='Won';
		}
	} else {
		gameState === 'Lost' ? fill(255,255,0) : fill(255);
		if(iosOn){
			textSize(30);
			text(`You ${gameState}!! Score:${playerScore}`, width/2 -120, height/2);
		} else {
			textSize(50);
			text(`You ${gameState}!! Score:${playerScore}`, width/2 -230, height/2);
		}
		

	}
}


function changeMovement(){
	paddle.move('right');
}