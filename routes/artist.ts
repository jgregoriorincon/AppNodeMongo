'use strict'

import * as express from 'express';

import * as ArtistController from '../controllers/artist';
import {ensureAuth as md_auth} from '../middlewares/authenticated';

export const api = express.Router();

api.get('/artist/:id',md_auth, ArtistController.getArtist);
api.post('/artist',md_auth, ArtistController.saveArtist);