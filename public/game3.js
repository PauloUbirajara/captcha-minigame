context = canvas.getContext('2d');

function makeSquare(x, y, length, speed) {
	return {
		x: x,
		y: y,
		l: length,
		s: speed,
		draw: function () {
			context.fillRect(this.x, this.y, this.l, this.l);
		}
	};
}

// The ship the user controls
let ship = makeSquare(50, canvas.height / 2 - 25, 50, 3);

// Flags to tracked which keys are pressed
let up = false;
let down = false;
let space = false;

// Is a bullet already on the canvas?
let shooting = false;
// The bulled shot from the ship
let bullet = makeSquare(0, 0, 20, 10);

// An array for enemies (in case there are more than one)
let enemies = [];

// Add an enemy object to the array
function makeEnemy() {
	let enemyX = canvas.width;
	let enemySize = 15;
	let enemyY =
		Math.round(Math.random() * (canvas.height - enemySize * 2)) + enemySize;
	let enemySpeed = 1;
	enemies.push(makeSquare(enemyX, enemyY, enemySize, enemySpeed));
}

// Check if number a is in the range b to c (exclusive)
function isWithin(a, b, c) {
	return a > b && a < c;
}

// Return true if two squares a and b are colliding, false otherwise
function isColliding(a, b) {
	let result = false;
	if (isWithin(a.x, b.x, b.x + b.l) || isWithin(a.x + a.l, b.x, b.x + b.l)) {
		if (isWithin(a.y, b.y, b.y + b.l) || isWithin(a.y + a.l, b.y, b.y + b.l)) {
			result = true;
		}
	}
	return result;
}

// Track the user's score
score = 0;
let scoreToWin = 2;
// The delay between enemies (in milliseconds)
let timeBetweenEnemies = 5000;
// ID to track the spawn timeout
let timeoutId = null;

// Show the game menu and instructions
function menu() {
	erase();
	context.fillStyle = '#000000';
	context.font = '36px Arial';
	context.textAlign = 'center';
	context.fillText("Shoot 'Em!", canvas.width / 2, canvas.height / 4);
	context.font = '24px Arial';
	context.fillText('Click to Start', canvas.width / 2, canvas.height / 2);
	context.font = '18px Arial';
	context.fillText(
		'Setas para movimentar, Barra de espaço para atirar.',
		canvas.width / 2,
		(canvas.height / 4) * 3
	);
	// Start the game on a click
	canvas.addEventListener('click', startGame);
}

// Start the game
function startGame() {
  score = 0
	// Kick off the enemy spawn interval
	timeoutId = setInterval(makeEnemy, timeBetweenEnemies);
	// Make the first enemy
	setTimeout(makeEnemy, 1000);
	// Kick off the draw loop
	draw();
	// Stop listening for click events
	canvas.removeEventListener('click', startGame);
}

// Show the end game screen
function endGame() {
	// Stop the spawn interval
	clearInterval(timeoutId);
	erase();
}

// Listen for keydown events
canvas.addEventListener('keydown', function (event) {
	event.preventDefault();
	if (event.keyCode === 38) {
		// UP
		up = true;
	}
	if (event.keyCode === 40) {
		// DOWN
		down = true;
	}
	if (event.keyCode === 32) {
		// SPACE
		shoot();
	}
});

// Listen for keyup events
canvas.addEventListener('keyup', function (event) {
	event.preventDefault();
	if (event.keyCode === 38) {
		// UP
		up = false;
	}
	if (event.keyCode === 40) {
		// DOWN
		down = false;
	}
});

// Clear the canvas
function erase() {
	context.fillStyle = '#FFFFFF';
	context.fillRect(0, 0, canvas.width, canvas.height);
}

// Shoot the bullet (if not already on screen)
function shoot() {
	if (!shooting) {
		shooting = true;
		bullet.x = ship.x + ship.l;
		bullet.y = ship.y + ship.l / 3;
	}
}

// The main draw loop
function draw() {
	erase();
	let gameOver = false;
	// Move and draw the enemies
	enemies.forEach(function (enemy) {
		enemy.x -= enemy.s;
		if (enemy.x < 0) {
			gameOver = true;
		}
		context.fillStyle = '#00FF00';
		enemy.draw();
	});
	// Collide the ship with enemies
	enemies.forEach(function (enemy, i) {
		if (isColliding(enemy, ship)) {
			gameOver = true;
		}
	});
	// Move the ship
	if (down) {
		ship.y += ship.s;
	}
	if (up) {
		ship.y -= ship.s;
	}
	// Don't go out of bounds
	if (ship.y < 0) {
		ship.y = 0;
	}
	if (ship.y > canvas.height - ship.l) {
		ship.y = canvas.height - ship.l;
	}
	// Draw the ship
	context.fillStyle = '#FF0000';
	ship.draw();
	// Move and draw the bullet
	if (shooting) {
		// Move the bullet
		bullet.x += bullet.s;
		// Collide the bullet with enemies
		enemies.forEach(function (enemy, i) {
			if (isColliding(bullet, enemy)) {
				enemies.splice(i, 1);
				score++;
				shooting = false;
				// Make the game harder
				if (score == scoreToWin) {
					gameOver = true;
				}
			}
		});
		// Collide with the wall
		if (bullet.x > canvas.width) {
			shooting = false;
		}
		// Draw the bullet
		context.fillStyle = '#0000FF';
		bullet.draw();
	}

	if (gameOver) {
		endGame();

		if (score === scoreToWin) {
			setTimeout(sendValidation, 1000);
			return;
		}

		setTimeout(changeFail, 1000);
	} else {
		window.requestAnimationFrame(draw);
	}
}

function shooterGame() {
	menu();
	canvas.focus();
}
