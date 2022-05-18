const PUBLIC_KEY = '6LeUFkAfAAAAAJyqI6lH0hIH1SSb-SQ1BS0iDgLB';
const captchaCheckbutton = document.getElementById('captcha-checkbutton');

function onClick() {
	if (captchaCheckbutton.getAttribute('state') == 'success') {
		return;
	}

	captchaCheckbutton.setAttribute('disabled', 'disabled');
	captchaCheckbutton.removeAttribute('state');

	grecaptcha.ready(() => {
		grecaptcha.execute(PUBLIC_KEY, { action: 'login' }).then((token) => {
			const options = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token: token })
			};

			fetch('http://localhost:3300/verify', options)
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
		});
	});
}

function failCaptcha(reason) {
	console.warn(reason);
	captchaCheckbutton.setAttribute('state', 'fail');
}