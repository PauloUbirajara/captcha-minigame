function onClick(e) {
	e.preventDefault();
	grecaptcha.ready(() => {
		grecaptcha
			.execute('6LeUFkAfAAAAAJyqI6lH0hIH1SSb-SQ1BS0iDgLB', { action: 'submit' })
			.then((token) => {
				// Add your logic to submit to your backend server here.
				console.log(`Enviar para o backend: ${token}`);
			});
	});
}
