'use strict'

import * as jwt from 'jwt-simple';
import * as moment from 'moment';

var secret = 'Cl4v3.D3.3ncr1pt4m13nt0';

export var ensureAuth = function(req, res, next){
    if (!req.headers.authorization) {
        return res.status(403).send({message: 'La petición no tiene cabecera de autenticación'})
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        let payLoad = jwt.decode(token, secret);

        if (payLoad.exp <= moment().unix()) {
            return res.status(401).send({message: 'El token ha expirado'});
        }

        req.user = payLoad;

    } catch (error) {
        console.log(error);
        return res.status(404).send({message: 'Token no valido'});
    }

    next();
};