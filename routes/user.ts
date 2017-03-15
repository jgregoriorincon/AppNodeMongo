'use strict'

import * as express from 'express';
import * as multipart from 'connect-multiparty';
import * as userController from "../controllers/user";
import {ensureAuth as md_auth} from '../middlewares/authenticated';

export const api = express.Router();
var md_upload = multipart({uploadDir: './uploads/users'});

api.get('/getToken', md_auth, userController.getToken);
api.post('/register', userController.saveUser);
api.post('/login', userController.loginUser)
api.put('/userUpdate/:id', md_auth, userController.updateUser);
api.post('/uploadImageUser/:id', [md_auth, md_upload], userController.uploadImage);
api.get('/getImageUser/:imageFile', userController.getImageFile);