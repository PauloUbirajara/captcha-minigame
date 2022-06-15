import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import routes from './src/routes/api.routes.js';

dotenv.config();

const app = express();
const clientFolder = 'public';

app.use('/static', express.static(clientFolder));
app.use(cors());
app.use(express.json());
app.use(routes);

const SERVER_PORT = process.env.PORT || 3000;

const onServerOpen = () => {
	console.log(`Disponivel em http://localhost:${SERVER_PORT}`);
};

app.listen(SERVER_PORT, onServerOpen);
