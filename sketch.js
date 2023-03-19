/*

The Game Project

2b - using variables

*/

var floorPos_y;

var gameChar_x;
var gameChar_y;

var treePos_x = 400;
var treePos_y = 432;

var canyon;
var collectable;

var mountain;
var cloud;

function drawClouds() {
	fill(255);
	ellipse(100, 100, cloud.width, cloud.height);
	ellipse(200, 100, cloud.width, cloud.height);
	ellipse(150, 50, cloud.width, cloud.height);

	ellipse(400, 100, cloud.width, cloud.height);
	ellipse(500, 100, cloud.width, cloud.height);
	ellipse(450, 50, cloud.width, cloud.height);

	ellipse(700, 100, cloud.width, cloud.height);
	ellipse(800, 100, cloud.width, cloud.height);
	ellipse(750, 50, cloud.width, cloud.height);
}

function drawMountain() {
	fill(100);
	triangle(mountain.x_pos, mountain.y_pos, 100, mountain.y_pos, 50, 332);

	triangle(mountain.x_pos + 400, mountain.y_pos, 500, mountain.y_pos, 450, 332);

	triangle(mountain.x_pos + 200, mountain.y_pos, 300, mountain.y_pos, 250, 332);
}

function drawCanyon() {
	fill(140, 140, 0);
	rect(canyon.x_pos, 432, canyon.width, 200);

}

function drawTree() {
	// trunk
	fill(100, 50, 0);
	rect(treePos_x - 100, treePos_y + 100, 20, 100);
	// tree
	fill(0, 255, 50);
	ellipse(treePos_x - 90, treePos_y + 90, 100, 100);
	ellipse(treePos_x - 90, treePos_y + 40, 60, 60);
	ellipse(treePos_x - 90, treePos_y, 45, 45);
}

function drawCharacter() {
	fill(0, 255, 120)
	rect(gameChar_x - 7, gameChar_y - 55, 13, 40)
	fill(255, 0, 130)
	ellipse(gameChar_x, gameChar_y - 64, 25, 25)

	fill(0)
	rect(gameChar_x - 13, gameChar_y - 24, 10, 15)
	rect(gameChar_x + 2, gameChar_y - 24, 10, 15)
}

function drawCollectable() {
	fill(255, 255, 0);
	ellipse(collectable.x_pos, collectable.y_pos + 300, collectable.size, collectable.size);
	fill(0);
	ellipse(collectable.x_pos, collectable.y_pos + 300, collectable.size / 2, collectable.size / 2);
	fill(255);
	ellipse(collectable.x_pos, collectable.y_pos + 300, collectable.size / 4, collectable.size / 4);
}

function setup()
{
	createCanvas(1024, 576);

	floorPos_y = 432; //NB. we are now using a variable for the floor position

	//NB. We are now using the built in variables height and width
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	treePos_x = width/2;
	treePos_y = height/2;

	canyon = {
		x_pos: 100,
		width: 120
	}

	collectable = {
		x_pos: 100,
		y_pos: 100,
		size: 50
	}

	mountain = {
		x_pos: 0,
		y_pos: 432,
		width: 100,
		height: 100
	}

	cloud = {
		x_pos: 100,
		y_pos: 100,
		width: 100,
		height: 100
	}
}

function draw() {
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, height, width - floorPos_y); //draw some green ground
	drawClouds();
	drawMountain();
	drawCanyon();
	drawTree();
	drawCollectable();

	drawCharacter();
}

function mousePressed() {
	gameChar_x = mouseX;
	gameChar_y = mouseY;
}
