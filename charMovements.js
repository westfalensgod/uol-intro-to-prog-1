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

function walkingLeft() {
  fill(0)
  rect(gameChar_x - 2, gameChar_y - 24, 10, 15) // right leg
  fill(0, 255, 120)
  rect(gameChar_x - 7, gameChar_y - 55, 13, 40) // body
  fill(255, 0, 130)

  ellipse(gameChar_x - 3, gameChar_y - 64, 15, 25) // head
  fill(0)
  rect(gameChar_x - 13, gameChar_y - 24, 10, 15) // left leg
}

function walkingRight() {
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