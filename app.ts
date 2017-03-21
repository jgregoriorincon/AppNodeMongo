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

import * as multer from 'multer';
var upload = multer({ dest: 'uploads/' })

app.post('/profile', upload.single('image'), function (req, res, next) {
  // req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any 
  console.log(req.body);
  console.log(req.file);
  res.status(200).send({message:'OK'});
})