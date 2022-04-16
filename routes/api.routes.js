import { Router } from 'express';

import { APIController } from '../controllers/api';

const apiRoutes = Router();

apiRoutes.get('/', APIController.get);

export default apiRoutes;
