/*

The Game Project

Week 3

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;


var isLeft;
var isRight;
var isFalling;
var isPlummeting;
function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4 + 10;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	isLeft = false;
	isRight = false;
	isPlummeting = false;
	isFalling = false;
}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y - 10, width, height - floorPos_y + 10); //draw some green ground

	//draw the canyon


	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
		jumpingFacingLeft();
	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
		jumpingFacingRight();
	}
	else if(isLeft)
	{
		// add your walking left code
		walkingFacingLeft();
	}
	else if(isRight)
	{
		// add your walking right code
		walkingFacingRight();
	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
		jumpingFacingForwards();
	}
	else
	{
		// add your standing front facing code
		frontFacing();
	}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if (isLeft) {
		gameChar_x -= 5;
	}
	if (isRight) {
		gameChar_x += 5;
	}
	if (isFalling) {
		gameChar_y += 5;
	}
	if (isPlummeting) {
		gameChar_y -= 20;
	}

	if (gameChar_y == floorPos_y) {
		isFalling = false;
	}
}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	switch (keyCode) {
		case 37: //left arrow
			isLeft = true;
			break;
		case 39: //right arrow
			isRight = true;
			break;
		case 32: //space
			if (gameChar_y == floorPos_y) {
			 	isPlummeting = true;
			}
			break;
	}
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.
	switch (keyCode) {
		case 37: //left arrow
			isLeft = false;
			break;
		case 39: //right arrow
			isRight = false;
			break;
		case 32: //space
			isPlummeting = false;
			isFalling = true;
			break;
	}
}

function frontFacing() {
	fill(0, 255, 120)
	rect(gameChar_x - 7, gameChar_y - 55, 13, 40)
	fill(255, 0, 130)
	ellipse(gameChar_x, gameChar_y - 64, 25, 25)

	fill(0)
	rect(gameChar_x - 13, gameChar_y - 24, 10, 15)
	rect(gameChar_x + 2, gameChar_y - 24, 10, 15)
}

function jumpingFacingForwards() {
	fill(0, 255, 120)
	rect(gameChar_x - 7, gameChar_y - 55, 13, 40)
	fill(255, 0, 130)
	ellipse(gameChar_x, gameChar_y - 64, 25, 25)

	rect(gameChar_x - 16, gameChar_y - 50, 10, 10)
	rect(gameChar_x + 5, gameChar_y - 50, 10, 10)
	fill(0)
	rect(gameChar_x - 13, gameChar_y - 24, 10, 10)
	rect(gameChar_x + 4, gameChar_y - 24, 10, 10)
}

function walkingFacingLeft() {
	fill(0)
	rect(gameChar_x - 2, gameChar_y - 24, 10, 15) // right leg
	fill(0, 255, 120)
	rect(gameChar_x - 7, gameChar_y - 55, 13, 40) // body
	fill(255, 0, 130)

	ellipse(gameChar_x - 3, gameChar_y - 64, 15, 25) // head
	fill(0)
	rect(gameChar_x - 13, gameChar_y - 24, 10, 15) // left leg
}

function walkingFacingRight() {
	fill(0)
	rect(gameChar_x - 13, gameChar_y - 24, 10, 15) // left leg
	fill(0, 255, 120)
	rect(gameChar_x - 7, gameChar_y - 55, 13, 40) // body
	fill(255, 0, 130)

	ellipse(gameChar_x + 3, gameChar_y - 64, 15, 25) // head
	fill(0)
	rect(gameChar_x - 2, gameChar_y - 24, 10, 15) // right leg
}

function jumpingFacingRight() {
	fill(0)
	rect(gameChar_x - 13, gameChar_y - 24, 10, 15) // left leg
	fill(0, 255, 120)
	rect(gameChar_x - 7, gameChar_y - 55, 13, 40) // body
	fill(255, 0, 130)
	rect(gameChar_x + 5, gameChar_y - 50, 6, 6) // hand
	ellipse(gameChar_x + 3, gameChar_y - 64, 15, 25) // head
	fill(0)
	rect(gameChar_x - 2, gameChar_y - 35, 10, 15) // right leg
}

function jumpingFacingLeft() {
	fill(0)
	rect(gameChar_x - 2, gameChar_y - 24, 10, 15) // right leg
	fill(0, 255, 120)
	rect(gameChar_x - 7, gameChar_y - 55, 13, 40) // body
	fill(255, 0, 130)
	rect(gameChar_x - 12, gameChar_y - 50, 6, 6)
	ellipse(gameChar_x - 3, gameChar_y - 64, 15, 25) // head
	fill(0)
	rect(gameChar_x - 13, gameChar_y - 35, 10, 15) // left leg
}