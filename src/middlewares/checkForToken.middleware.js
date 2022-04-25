export const checkForToken = (req, res, next) => {
	const { token } = req.body;

	if (!token) {
		return res.status(400).json({
			error: "Atributo 'token' não fornecido no corpo da requisição"
		});
	}

	return next();
};
