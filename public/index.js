const VERIFICATION_ENDPOINT = 'http://localhost:3300/verify';
const PUBLIC_KEY = '6LeUFkAfAAAAAJyqI6lH0hIH1SSb-SQ1BS0iDgLB';

function onClick(event) {
	event.preventDefault();
	captchaCheckbutton.setAttribute('disabled', 'disabled');

	modal.style.display = 'block';
	// const games = [snakeGame, jigsawGame, shooterGame];
	const games = [snakeGame];
	const selectedGame = games[Math.floor(Math.random() * games.length)];
	selectedGame();
	canvas.focus();

	if (captchaCheckbutton.getAttribute('state') == 'success') {
		return;
	}
}

function failCaptcha(reason) {
	console.warn(reason);
	captchaCheckbutton.setAttribute('state', 'fail');
	captchaCheckbutton.removeAttribute('disabled');
}
