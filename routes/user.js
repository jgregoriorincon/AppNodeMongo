'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_1 = require("../controllers/user");
//var UserController = require('../controllers/user');
var api = express.Router();
exports.api = api;
api.get('/probando-controlador', user_1.pruebas);
api.post('/register', user_1.saveUser);
//# sourceMappingURL=user.js.map