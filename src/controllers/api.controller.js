class APIController {
	get = (req, res) => {
		console.log(req);
		return res.json({ success: true });
	};
}

export const apiController = new APIController();
