const FRAMERATE = 30;
const MAX_HORIZONTAL_SPEED = 5;

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 1;
let brickColumnCount = 2;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 0;
let lives = 3;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for (let r = 0; r < brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1 };
	}
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function keyDownHandler(e) {
	if (e.code == 'ArrowRight') {
		rightPressed = true;
	} else if (e.code == 'ArrowLeft') {
		leftPressed = true;
	}
}
function keyUpHandler(e) {
	if (e.code == 'ArrowRight') {
		rightPressed = false;
	} else if (e.code == 'ArrowLeft') {
		leftPressed = false;
	}
}
function mouseMoveHandler(e) {
	let relativeX = e.clientX - canvas.offsetLeft;
	if (relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth / 2;
	}
}
function collisionDetection() {
	for (let c = 0; c < brickColumnCount; c++) {
		for (let r = 0; r < brickRowCount; r++) {
			let b = bricks[c][r];
			if (b.status) {
				if (
					x > b.x &&
					x < b.x + brickWidth &&
					y > b.y &&
					y < b.y + brickHeight
				) {
					dy = -dy;
					b.status = 0;
					score++;
					if (score === brickRowCount * brickColumnCount) {
						win();
					}
				}
			}
		}
	}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = '#0095DD';
	ctx.fill();
	ctx.closePath();
}
function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = '#0095DD';
	ctx.fill();
	ctx.closePath();
}
function drawBricks() {
	for (let c = 0; c < brickColumnCount; c++) {
		for (let r = 0; r < brickRowCount; r++) {
			if (bricks[c][r].status) {
				let brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
				let brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = '#0095DD';
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}
function drawScore() {
	ctx.font = '16px Arial';
	ctx.fillStyle = '#0095DD';
	ctx.fillText('Score: ' + score, 8, 20);
}
function drawLives() {
	ctx.font = '16px Arial';
	ctx.fillStyle = '#0095DD';
	ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();

	if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}
	if (y + dy < ballRadius) {
		dy = -dy;
	} else if (y + dy > canvas.height - ballRadius) {
		if (x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
			dx =
				Math.random() *
				MAX_HORIZONTAL_SPEED *
				(Math.round(Math.random) === 0 ? 1 : -1);
		} else {
			lives--;
			if (!lives) {
				lose();
			} else {
				x = canvas.width / 2;
				y = canvas.height - 30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width - paddleWidth) / 2;
			}
		}
	}

	if (rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += 7;
	} else if (leftPressed && paddleX > 0) {
		paddleX -= 7;
	}

	x += dx;
	y += dy;
}

function win() {
	alert('YOU WIN, CONGRATS!');
	clearInterval(interval);
	onClick();
}

function lose() {
	alert('GAME OVER');
	clearInterval(interval);
	failCaptcha('Não passou no minigame');
}

const interval = setInterval(draw, 1000 / FRAMERATE);
