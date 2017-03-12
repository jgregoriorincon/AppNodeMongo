'use strict'

import * as express from 'express';
import * as userController from "../controllers/user";
import {ensureAuth as md_auth} from '../middlewares/authenticated';

var api = express.Router();

api.get('/getToken', md_auth, userController.getToken);
api.post('/register', userController.saveUser);
api.post('/login', userController.loginUser)
api.put('/userUpdate/:id', md_auth, userController.updateUser);

export { api };