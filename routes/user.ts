'use strict'

import * as express from 'express';
import { saveUser, loginUser } from "../controllers/user";

var api = express.Router();

api.post('/register', saveUser);
api.post('/login', loginUser)

export { api };