let canvas;
let ctx;
let currentScore;
let currentLevel;
let score = 0;
let level = 0;
let x = 0;
const BASE_SCORE = 10;

window.onload = () => {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  currentScore = document.querySelector('.score__current');
  currentLevel = document.querySelector('.level__current');

  document.addEventListener('keydown', keyDownEvent);

  currentLevel.innerText = level;
  currentScore.innerText = score;

  // render X times per second
	x = 8;
	setInterval(draw, 1000 / x);
};

function keyDownEvent(e) {
  switch (e.keyCode) {
		case 37:
			nextX = -1;
			nextY = 0;
			break;

		case 38:
			nextX = 0;
			nextY = -1;
			break;

		case 39:
			nextX = 1;
			nextY = 0;
			break;

		case 40:
			nextX = 0;
			nextY = 1;
      break;

		default:
			break;
	}
}

// Snake
const DEFAULTTAILSIZE = 3;
let tailSize = DEFAULTTAILSIZE;
const snakeTrail = [];
let snakeX = (snakeY = 10);

// Game world
let gridSize = (tileSize = 20); // 20 x 20 = 400
let nextX = (nextY = 0);

// apple
let appleX = (appleY = 15);

function draw() {
  // move snake in next position
  snakeX += nextX;
  snakeY += nextY;

  // snake over game world?
  if (snakeX < 0) {
    snakeX = gridSize - 1;
  }

  if (snakeX > gridSize - 1) {
    snakeX = 0;
  }

  if (snakeY < 0) {
    snakeY = gridSize - 1;
  }

  if (snakeY > gridSize - 1) {
    snakeY = 0;
  }

  //snake bite apple?
  if (snakeX === appleX && snakeY === appleY) {
    tailSize++;
    score += BASE_SCORE

    if (score % 100 === 0) {
      level++;
      x = 10;
      currentLevel.innerText = level;
    }

    currentScore.innerText = score;
    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * gridSize);
  }

  //paint background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // paint snake
  ctx.fillStyle = "green";

  for (let i = 0; i < snakeTrail.length; i++) {
    ctx.fillRect(
      snakeTrail[i].x * tileSize,
      snakeTrail[i].y * tileSize,
      tileSize,
      tileSize
    );

    //snake bites it's tail?
    if (snakeTrail[i].x === snakeX && snakeTrail[i].y === snakeY) {
      tailSize = DEFAULTTAILSIZE;
      score = 0;
      level = 0;
      currentScore.innerText = score;
      currentLevel.innerText = level;
    }
  }

  // paint apple
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

  //set snake trail
  snakeTrail.push({ x: snakeX, y: snakeY });

  while (snakeTrail.length > tailSize) {
    snakeTrail.shift();
  }
}

