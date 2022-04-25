const PUBLIC_KEY = '6LeUFkAfAAAAAJyqI6lH0hIH1SSb-SQ1BS0iDgLB';
const captchaCheckbutton = document.getElementById('open-modal')

function onClick(e = captchaCheckbutton) {
	e.target.setAttribute('disabled', 'disabled');
	delete e.target.removeAttribute('state');

	grecaptcha.ready(() => {
		grecaptcha.execute(PUBLIC_KEY, { action: 'submit' }).then((token) => {
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
					const { success, 'error-codes': errorCodes } = data;
					if (success) {
						e.target.setAttribute('state', 'success');
						return;
					}

					const invalidTokenError = `Token não aprovado pelo backend: ${errorCodes.join(
						', '
					)}`;
					throw new Error(invalidTokenError);
				})
				.catch((err) => {
					console.warn(err);
					e.target.setAttribute('state', 'fail');
					e.target.removeAttribute('disabled');
				});
		});
	});
}
