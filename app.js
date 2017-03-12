'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
exports.app = app;
// Cargar Rutas
var user_1 = require("./routes/user");
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// Configurar cabeceras HTTP
// rutas base
app.use('/api', user_1.api);
//# sourceMappingURL=app.js.map