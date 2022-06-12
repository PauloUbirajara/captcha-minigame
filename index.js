import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { join } from 'path';

import routes from './src/routes/api.routes.js';

dotenv.config();

const app = express();
// const clientFolder = join(process.cwd(), '../public/')
const clientFolder = 'public'

app.use(express.static(clientFolder));
app.use(cors());
app.use(express.json());
app.use(routes);

// TODO - Criar token a partir da finalização de um minigame
// TODO - Passar token do client pra API e retornar algo visual pro client

const SERVER_PORT = process.env.PORT || 3000;

const onServerOpen = () => {
	console.log(`Disponivel em http://localhost:${SERVER_PORT}`);
};

app.listen(SERVER_PORT, onServerOpen);
