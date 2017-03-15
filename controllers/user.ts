'use strict'

import * as bcrypt from 'bcrypt-nodejs';
import * as fs from 'fs';
import * as path from 'path';
import {User} from '../models/user';
import {createToken} from '../services/jwt';

export function getToken(req, res) {
    var params = req.body;
    res.status(200).send({
        message: 'Ingreso al token'
    });
}

export function saveUser(req, res) {
    var user = User();

    var params = req.body;

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email.toLowerCase();
    user.role = 'ROLE_USER';
    user.image = 'null';

    var salt = bcrypt.genSaltSync(10);

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

export function loginUser(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({
        email: email.toLowerCase()
    }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!user) {
                res.status(404).send({
                    message: 'El usuario no existe'
                });
            } else {
                // Comprobar contraseña
                bcrypt.compare(password, user.password.toString(), (err, check) => {
                    if (check) {
                        // Devolver los datos del usuario logueado
                        if (params.getHash) {
                            // Devolver el token del usuario usando jwt
                            res.status(200).send({
                                token: createToken(user)
                            })
                        } else {
                            res.status(200).send({
                                user
                            });
                        }
                    } else {
                        res.status(404).send({
                            message: 'El usuario no ha podido loguearse'
                        });
                    }
                });
            }
        }
    });
}

export function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdate) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el usuario'
            });
        } else {
            if (!userUpdate) {
                res.status(404).send({
                    message: 'No se ha podido actualizar el usuario'
                });
            } else {
                res.status(200).send({
                    user: userUpdate
                });
            }
        }
    });
}

export function uploadImage(req, res) {
    var userId = req.params.id;

    if (req.files) {
        let filePath = req.files.image.path;
        let filePathSplit = filePath.split('/');
        let fileName = filePathSplit[filePathSplit.length - 1];
        let fileNameSplit = fileName.split('.');
        let fileExt = fileNameSplit[fileNameSplit.length - 1].toLowerCase();

        switch (fileExt) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                User.findByIdAndUpdate(userId, {image: fileName}, (err, userUpdate) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Error al actualizar el usuario'
                        });
                    } else {
                        if (!userUpdate) {
                            res.status(404).send({
                                message: 'No se ha podido actualizar el usuario'
                            });
                        } else {
                            res.status(200).send({
                                user: userUpdate
                            });
                        }
                    }
                });
                break;
            default:
                res.status(500).send({
                    message: 'Extensión del archivo no valida'
                });
        }

        console.log(filePath);
        console.log(fileName);

    } else {
        res.status(500).send({
            message: 'No se ha cargado imagen'
        });
    }
}

export function getImageFile (req, res) {
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/users/' + imageFile;

    fs.exists(pathFile, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(200).send({message: 'No existe la imagen'});
        }
    });
}