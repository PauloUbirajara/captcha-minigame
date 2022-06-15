export const checkForSecretKey = (_req, res, next) => {
	const { PRIVATE_KEY } = process.env;

	if (!PRIVATE_KEY) {
		console.error("Variável de ambiente 'PRIVATE_KEY' não definida");
		return res.sendStatus(401);
	}

	return next();
};

export const checkForToken = (req, res, next) => {
	const { token } = req.body;

	if (!token) {
		console.error("Atributo 'token' não fornecido no corpo da requisição");
		return res.sendStatus(400);
	}

	return next();
};
