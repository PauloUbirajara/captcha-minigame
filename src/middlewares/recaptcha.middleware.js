export const checkForSecretKey = (_req, res, next) => {
	const { SECRET_KEY } = process.env;

	if (!SECRET_KEY) {
		return res
			.status(401)
			.json({ error: "Variável de ambiente 'SECRET_KEY' não definida" });
	}

	return next();
};

export const checkForToken = (req, res, next) => {
	const { token } = req.body;

	if (!token) {
		return res.status(400).json({
			error: "Atributo 'token' não fornecido no corpo da requisição"
		});
	}

	return next();
};
