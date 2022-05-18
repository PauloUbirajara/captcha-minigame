import { Router } from 'express';

import APIController from '../controllers/api.controller.js';
import { checkForToken } from '../middlewares/checkForToken.middleware.js';
import { checkForSecretKey } from '../middlewares/checkForSecretKey.middleware.js';

const apiRoutes = Router();

apiRoutes.get('/', APIController.get);
apiRoutes.post(
	'/verify',
	[checkForToken, checkForSecretKey],
	APIController.verify
);

export default apiRoutes;
