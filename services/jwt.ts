'use strict'

import * as jwt from 'jwt-simple';
import * as moment from 'moment';

var secret = 'Cl4v3.D3.3ncr1pt4m13nt0';

/**
 * Recupera los datos del usuario, asigna la vigencia del token y los encripta
 * 
 * @export
 * @param {any} user 
 * @returns 
 */
export function createToken(user) {
    var payLoad = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'hours').unix()
    };

    return jwt.encode(payLoad, secret);
}