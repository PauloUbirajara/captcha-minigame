import axios from 'axios';

class APIController {
	get = (req, res) => {
		console.log(req);
		return res.json({ success: true });
	};

	verify = async (req, res) => {
		const { token } = req.body;

		if (!token) {
			return res.status(400).json({
				error: "Atributo 'token' não fornecido no corpo da requisição"
			});
		}

		if (!process.env.SECRET_KEY) {
			return res
				.status(401)
				.json({ error: "Variável de ambiente 'SECRET_KEY' não definida" });
		}

		const URL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`;

		const result = await axios
			.post(URL)
			.then((data) => {
				return res.status(200).json({ data });
			})
			.catch((err) => {
				return res.status(401).json({
					error: `Houve um erro durante a verificação com a API do ReCaptchaV3: ${err}`
				});
			});

		return result;
	};
}

export default new APIController();
