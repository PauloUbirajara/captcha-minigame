export const checkForSecretKey = (_req, res, next) => {
	const { SECRET_KEY } = process.env;

	if (!SECRET_KEY) {
		return res
			.status(401)
			.json({ error: "Variável de ambiente 'SECRET_KEY' não definida" });
	}

	return next();
};
