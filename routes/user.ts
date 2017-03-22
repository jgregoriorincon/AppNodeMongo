'use strict'

import * as express from 'express';
import * as multer from 'multer';
import * as path from 'path';
import * as crypto from 'crypto';
import * as mime from 'mime';

import * as userController from "../controllers/user";
import {ensureAuth as md_auth} from '../middlewares/authenticated';

var storage = multer.diskStorage({
  destination: './uploads/users',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + '.' + mime.extension(file.mimetype));
    })
  }
})

var formData = multer({ storage: storage })

export const api = express.Router();

api.get('/validateToken', md_auth, userController.validateToken);
api.post('/register', formData.single('image'), userController.saveUser);
api.post('/login', formData.single(), userController.loginUser);
api.put('/userUpdate/:id', [md_auth, formData.single('image')], userController.updateUser);
api.get('/getImageUser/:imageFile', userController.getImageFile);