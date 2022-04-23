import { Router } from 'express';

import APIController from '../controllers/api.controller.js';

const apiRoutes = Router();

apiRoutes.get('/', APIController.get);
apiRoutes.post('/verify', APIController.verify);

export default apiRoutes;
