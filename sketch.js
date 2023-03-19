/*

The Game Project 5 – Bring it all together

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;


var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var canyon;
var collectable;
var trees_x;
var clouds;
var mountains;
var collectables;
var gameChar_world_x;

function setup() {
  createCanvas(1024, 576);
  floorPos_y = height * 3 / 4 + 10;
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;
  canyon = {
    x_pos: 100,
    y_pos: floorPos_y,
    width: 120
  }
  collectable = {
    x_pos: 100,
    y_pos: 100,
    size: 50,
    isFound: false
  }
  trees_x = [300, 500, 900, 1150, 1420, 1550];
  clouds = [150, 400, 550, 830, 1100, 1250, 1500];
  mountains = [
    {x: 0, y: 432},
    {x: 500, y: 432},
    {x: 800, y: 432},
    {x: 1100, y: 432},
    {x: 120, y: 432},
    {x: 150, y: 432}
  ];
  collectables = [
    {x: 100, y: 100, size: 50, isFound: false},
    {x: 3 * 100, y: 0.5 * 100, size: 50, isFound: false},
    {x: 6 * 100, y: 1 * 100, size: 50, isFound: false},
    {x: 8 * 100, y: 0.3 * 100, size: 50, isFound: false},
    {x: 12 * 100, y: 0.1 * 100, size: 50, isFound: false},
    {x: 15 * 100, y: 0 * 100, size: 50, isFound: false},
  ]
  scrollPos = 0;

  isLeft = false;
  isRight = false;
  isPlummeting = false;
  isFalling = false;
  gameChar_world_x = gameChar_x - scrollPos
}

function draw() {

  ///////////DRAWING CODE//////////

  //scrolling
  scrollPos = gameChar_x - width / 2;

  background(100, 155, 255); //fill the sky blue

  push()
  translate(-scrollPos, 0);
  noStroke()
  for (let i = 0; i < clouds.length; i++) {
    drawCloud(clouds[i]);
  }
  for (let i = 0; i < mountains.length; i++) {
    drawMountain(mountains[i].x, mountains[i].y);
  }
  for (let i = 0; i < trees_x.length; i++) {
    drawTree(trees_x[i], floorPos_y - 200);
  }
  for (let i = 0; i < collectables.length; i++) {
    drawCollectable(i);
  }
  noStroke();
  fill(0, 155, 0);
  rect(0, floorPos_y - 10, width * 10000, height - floorPos_y + 10); //draw some green ground

  //draw the canyon
  drawCanyon();

  // drawCollectable()

  //the game character
  if (isLeft && isFalling) {
    // add your jumping-left code
    jumpingFacingLeft();
  } else if (isRight && isFalling) {
    // add your jumping-right code
    jumpingFacingRight();
  } else if (isLeft) {
    // add your walking left code
    walkingFacingLeft();
  } else if (isRight) {
    // add your walking right code
    walkingFacingRight();
  } else if (isFalling || isPlummeting) {
    // add your jumping facing forwards code
    jumpingFacingForwards();
  } else {
    // add your standing front facing code
    frontFacing();
  }
  pop()
  ///////////INTERACTION CODE//////////
  //Put conditional statements to move the game character below here
  // Logic to make the game character move or the background scroll.
  if(isLeft)
  {
    if(gameChar_x > width * 0.2)
    {
      gameChar_x -= 5;
    }
    else
    {
      scrollPos += 5;
    }
  }

  if(isRight)
  {
    if(gameChar_x < width * 0.8)
    {
      gameChar_x  += 5;
    }
    else
    {
      scrollPos -= 5; // negative for moving against the background
    }
  }

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

  // Fall down the canyon
  var nearCanyonX = gameChar_x <= canyon.x_pos + canyon.width && gameChar_x >= canyon.x_pos;
  var overCanynonY = gameChar_y < floorPos_y;

  var fallingIntoCanyon = nearCanyonX && !overCanynonY;
  if (fallingIntoCanyon) {
    isFalling = true;
  }

  if (gameChar_y == floorPos_y && !fallingIntoCanyon) {
    isFalling = false;
  }

  gameChar_world_x = gameChar_x - scrollPos;
}


function keyPressed() {
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

function keyReleased() {
  // if statements to control the animation of the character when
  // keys are released.
  switch (keyCode) {
    case 37 || 97: //left arrow or a
      isLeft = false;
      break;
    case 39 || 100: //right arrow or d
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

function drawCanyon() {
  fill(140, 140, 0);
  rect(canyon.x_pos, 432, canyon.width, 200);
}

function drawCollectable(i) {
  var { x, y, size, isFound } = collectables[i];
  if (dist(gameChar_x, gameChar_y, x, y + 300) < 50) {
    collectables[i].isFound = true;
  }
  if (!isFound) {
    fill(255, 255, 0);
    ellipse(x, y + 300, size, size);
    fill(0);
    ellipse(x, y + 300, size / 2, size / 2);
    fill(255);
    ellipse(x, y + 300, size / 4, size / 4);
  }
}

function drawTree(x, y) {
  // trunk
  fill(100, 50, 0);
  rect(x - 100, y + 100, 20, 100);
  // tree
  fill(0, 255, 50);
  ellipse(x - 90, y + 90, 100, 100);
  ellipse(x - 90, y + 40, 60, 60);
  ellipse(x - 90, y, 45, 45);
}

function drawCloud(x) {
  fill(255);
  ellipse(x, 100, 100, 100);
  ellipse(x + 100, 100, 100, 100);
  ellipse(x + 50, 50, 100, 100);
}

function drawMountain(x, y) {
  fill(100);
  triangle(x, y, x + 100, y, x + 50, y - 100);
  triangle(x + 50, y - 100, x + 100, y, x + 200, y);
  triangle(x + 100, y, x + 200, y, x + 150, y - 100);
}