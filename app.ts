'use strict'

import * as express from 'express';
import * as bodyParser from 'body-parser';

var app = express();

// Cargar Rutas
var user_routes = require('./routes/user');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras HTTP

// rutas base
app.use('/api', user_routes);

module.exports = app;