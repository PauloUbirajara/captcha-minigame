import { Router } from 'express';

import APIController from '../controllers/api.controller.js';
import {
	checkForSecretKey,
	checkForToken
} from '../middlewares/recaptcha.middleware.js';

const apiRoutes = Router();

apiRoutes.get('/', APIController.get);
apiRoutes.post(
	'/verify',
	[checkForSecretKey, checkForToken],
	APIController.verify
);

export default apiRoutes;
