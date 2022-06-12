const VERIFICATION_ENDPOINT = 'http://localhost:3300/verify';

const captchaCheckbutton = document.getElementById('captcha-checkbutton');

function onClick() {
	if (captchaCheckbutton.getAttribute('state') == 'success') {
		return;
	}

	captchaCheckbutton.setAttribute('disabled', 'disabled');
	captchaCheckbutton.removeAttribute('state');

	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: {} // Enviar jogada
	};

	fetch(VERIFICATION_ENDPOINT, options)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error('Erro ao enviar token');
		})
		.then((data) => {
			console.log(data);
			const { success } = data;
			if (success) {
				captchaCheckbutton.setAttribute('state', 'success');
				return;
			}

			const invalidTokenError = `Token não aprovado pelo backend: ${errorCodes.join(
				', '
			)}`;
			throw new Error(invalidTokenError);
		})
		.catch(failCaptcha)
		.finally(() => {
			captchaCheckbutton.removeAttribute('disabled');
		});
}

function failCaptcha(reason) {
	console.warn(reason);
	captchaCheckbutton.setAttribute('state', 'fail');
}
