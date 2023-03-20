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
var game_score;
var flagpole;
var lives = 3;

function startGame() {
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
  flagpole = {
    x_pos: 15 * 100,
    isReached: false
  }
  scrollPos = 0;

  isLeft = false;
  isRight = false;
  isPlummeting = false;
  isFalling = false;

  game_score = 0;
  gameChar_world_x = gameChar_x - scrollPos
  lostLife = false;
}

function checkPlayerDie() {
  if (gameChar_y > height) {
    lives -= 1;
    startGame();
  }
}

function setup() {
  createCanvas(1024, 576);
  startGame();
}

function draw() {

  ///////////DRAWING CODE//////////

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

  drawCanyon();
  drawFlagpole();
  //the game character
  if (isLeft && isFalling) {
    jumpingFacingLeft();
  } else if (isRight && isFalling) {
    jumpingFacingRight();
  } else if (isLeft) {
    walkingFacingLeft();
  } else if (isRight) {
    walkingFacingRight();
  } else if (isFalling || isPlummeting) {
    jumpingFacingForwards();
  } else {
    frontFacing();
  }
  pop()

  drawScore();
  drawLives();

  if (lives == 0) {
    fill(255, 0, 0);
    text('Game over press enter to restart', 100, 100);
    fill(0, 0, 0);
  }

  if (flagpole.isReached) {
    text('You win press enter to restart', 100, 100);
    fill(255,0, 0);
  }
  ///////////INTERACTION CODE//////////
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
  checkPlayerDie()

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
      isPlummeting = true;
      break;
    case 13: //enter
    if (lives == 0 || flagpole.isReached) {
      startGame();
      lives = 3;
    }
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
  if (dist(gameChar_x, gameChar_y, x, y + 300) < 50 && !isFound) {
    collectables[i].isFound = true;
    game_score += 1;
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

function drawLives() {
  for (var i = 0; i < lives; i++) {
    fill(255, 0, 0);
    ellipse(20 + i * 30, 40, 20, 20);
  }
}

function drawFlagpole() {
  push();
  stroke(255);
  strokeWeight(5);
  line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
  noStroke();
  fill(255, 0, 0);

  if (dist(gameChar_x, gameChar_y, flagpole.x_pos, floorPos_y) < 50) {
    flagpole.isReached = true;
  }

  if (flagpole.isReached) {
    rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
  } else {
    rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
  }
  pop();
}

function drawScore() {
  fill(255);
  textSize(20);
  text("Score: " + game_score, 20, 20);
}