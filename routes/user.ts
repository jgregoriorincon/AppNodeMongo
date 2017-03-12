'use strict'

import * as express from 'express';
import { getToken, saveUser, loginUser } from "../controllers/user";
import {ensureAuth as md_auth} from '../middlewares/authenticated';

var api = express.Router();

api.get('/getToken', md_auth, getToken);
api.post('/register', saveUser);
api.post('/login', loginUser)

export { api };