"use strict"

import * as mongoose from 'mongoose';
import { app } from "./app";

var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/dbMusic', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("La base de datos dbMusic se encuentra activa...");

        app.listen(port, function () {
            console.log("Servidor de api rest de musica escuchando en http://localhost:" + port);
        })
    }
});