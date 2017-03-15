'use strict'

import * as jwt from 'jwt-simple';
import * as moment from 'moment';

var secret = 'Cl4v3.D3.3ncr1pt4m13nt0';

/**
 * Valida si el token es valido o ya expiro.
 * 
 * @export
 * @param {any} req Datos enviados desde el cliente a través de la API
 * @param {any} res Respuesta generada por los servicios
 * @param {any} next Funcion de salida del middleware
 * @returns 
 */
export function ensureAuth(req, res, next){

    // Si no llega el token
    if (!req.headers.authorization) {
        return res.status(403).send({message: 'La petición no tiene cabecera de autenticación'})
    }

    // limpia el token 
    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        // Recupera los datos decodificados
        let payLoad = jwt.decode(token, secret);

        // Si el token no esta vigente
        if (payLoad.exp <= moment().unix()) {
            return res.status(401).send({message: 'El token ha expirado'});
        }

        // Asigna los datos del usuario al middleware
        req.user = payLoad;

    } catch (error) {
        console.log(error);
        return res.status(404).send({message: 'Token no valido'});
    }

    // Sale de la función
    next();
};