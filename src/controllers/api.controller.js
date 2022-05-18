import axios from 'axios';

class APIController {
	get = (_req, res) => {
		return res.json({ success: true });
	};

	verify = async (req, res) => {
		const { token } = req.body;
		const { SECRET_KEY } = process.env;

		const URL = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`;

		return axios
			.post(URL)
			.then((apiResult) => {
				const { data, status } = apiResult;
				const { success, score, action, 'error-codes': errorCodes } = data;
				return res.status(status).json({ success, score, action, errorCodes });
			})
			.catch((err) => {
				const errorMessage = `Erro durante verificação com a API do ReCaptchaV3: ${err}`;
				return res.status(401).json({
					error: errorMessage
				});
			});
	};
}

export default new APIController();
