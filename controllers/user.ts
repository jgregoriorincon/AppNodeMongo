'use strict'

import * as bcrypt from 'bcrypt-nodejs';
import * as fs from 'fs';
import * as path from 'path';
import {UserModel as User} from '../models/user';
import {createToken} from '../services/jwt';

/**
 * Valida el token enviado por /getToken
 * 
 * @export
 * @param {any} req Datos enviados desde el cliente a través de la API
 * @param {any} res Respuesta generada por los servicios
 */
export function validateToken(req, res) {
    var params = req.body;
    res.status(200).send({
        message: 'Token Valido'
    });
}

/**
 * Valida el archivo recibido
 * 
 * @param {any} fileImage 
 * @returns 
 */
function validaImagen(fileImage) {
    var image:string;
    if (typeof fileImage === 'undefined') {
        image = 'null'; 
    } else {
        switch (fileImage.mimetype) {
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
                console.log(fileImage);
                image = fileImage.filename;
                break;
            default:
                image = 'undefined';
        }
    }
    return image;
}

/**
 * Salva el usuario enviado a la BD 
 * 
 * @export
 * @param {any} req Datos enviados desde el cliente a través de la API
 * @param {any} res Respuesta generada por los servicios
 */
export function saveUser(req, res) {
    /**
    * Consume el Schema de usuario de la BD 
    */
    var user = new User();

    var params = req.body;

    /**
    * Asigna los parametros enviados por /register al Schema 
    */
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email.toLowerCase();
    user.role = 'ROLE_USER';
    user.image = validaImagen(req.file);

    if (user.image == 'undefined') {
        res.status(500).send({
            message: 'Error de proceso: Formato del archivo no valida'
        });
        return;
    }

    /**
    * Si se envia contraseña se continua
    */
    if (params.password) {
        /**
        * Se define la base del encriptado 
        */
        let salt = bcrypt.genSaltSync(10);
        bcrypt.hash(params.password, salt, function () {}, function (err, hash) {
            user.password = hash;
            /**
            * Valida que los parametros no vengan nulos
            */
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

/**
 * valida los datos enviados contra los almacenados en la BD y valida la contraseña
 * 
 * @export
 * @param {any} req Datos enviados desde el cliente a través de la API
 * @param {any} res Respuesta generada por los servicios
 */
export function loginUser(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    // Busca un registro en la BD por el correo electronico
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
                // Comprueba la contraseña
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

/**
 * Actualiza los datos del usuario en la BD
 * 
 * @export
 * @param {any} req Datos enviados desde el cliente a través de la API
 * @param {any} res Respuesta generada por los servicios
 */
export function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    var image = validaImagen(req.file);
    if (image == 'undefined') {
        res.status(500).send({
            message: 'Error de proceso: Formato del archivo de imagén no valido'
        });
        return;
    } else {
        update.image = image;
    }

    // Busca en la BD por el Id recuperado al hacer el login 
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

/**
 * Recupera la imagen del avatar desde la ruta, usando el Id
 * 
 * @export
 * @param {any} req Datos enviados desde el cliente a través de la API
 * @param {any} res Respuesta generada por los servicios
 */
export function getImageFile (req, res) {
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/users/' + imageFile;

    // Valida si el archivo especificado en la BD existe en la ruta
    fs.exists(pathFile, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(200).send({message: 'No existe la imagen'});
        }
    });
}