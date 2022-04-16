import express from 'express';

import apiRoutes from './routes/api.routes.js';

const SERVER_PORT = process.env.PORT || 3000;

const onServerOpen = () => {
	console.log(`Disponivel em http://localhost:${SERVER_PORT}`);
};

const app = express();

app.use(apiRoutes);

app.listen(SERVER_PORT, onServerOpen);
