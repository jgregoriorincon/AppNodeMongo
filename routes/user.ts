'use strict'

import * as express from 'express';
import { pruebas, saveUser } from "../controllers/user";
//var UserController = require('../controllers/user');

var api = express.Router();

api.get('/probando-controlador', pruebas);
api.post('/register', saveUser);

export { api };