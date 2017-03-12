'use strict'

import * as bcrypt from 'bcrypt-nodejs'
//import {User} from '../models/user';
var User = require('../models/user');

function pruebas(req, res) {
    res.status(200).send({
        message: "controlador de usuarios de la aplicación de música de MongoDB"
    });
}

function saveUser(req, res) {
    var user = User();

    var params = req.body;
    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = null;

    var salt = bcrypt.genSaltSync(10);

    console.log(salt);

    if (params.password) {
        // Encriptar contraseña y guardar datos
        bcrypt.hash(params.password, salt, function () {}, function (err, hash) {
            user.password = hash;
            if (user.name !== null && user.surname !== null && user.email !== null) {
                // Guardar el usuario
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({
                            message: "Error al guardar el usuario"
                        });
                    } else {
                        if (!userStored) {
                            res.status(404).send({
                                message: "No se ha registrado el usuario"
                            });
                        } else {
                            res.status(200).send({
                                user: userStored
                            });
                        }
                    }
                })
            } else {
                res.status(200).send({
                    message: "Introducir todos los datos"
                });
            }
        });

    } else {
        res.status(200).send({
            message: "Introducir contraseña"
        });
    }
    
}

export {
    pruebas,
    saveUser
};