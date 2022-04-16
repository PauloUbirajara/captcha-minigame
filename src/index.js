import express from 'express';
import dotenv from 'dotenv';

import apiRoutes from './routes/api.routes.js';

dotenv.config();

const SERVER_PORT = process.env.PORT || 3000;

const onServerOpen = () => {
	console.log(`Disponivel em http://localhost:${SERVER_PORT}`);
};

const app = express();

app.use(apiRoutes);

app.listen(SERVER_PORT, onServerOpen);
