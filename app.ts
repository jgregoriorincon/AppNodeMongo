'use strict'

import * as express from 'express';
import * as bodyParser from 'body-parser';

export const app = express();

// Cargar Rutas
import { api as user_routes } from "./routes/user";
import { api as artist_routes } from "./routes/artist";

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Configurar cabeceras HTTP

// rutas base
app.use('/api', user_routes);
app.use('/api', artist_routes);