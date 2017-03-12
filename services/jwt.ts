'use strict'

import * as jwt from 'jwt-simple';
import * as moment from 'moment';

var secret = 'Cl4v3D33ncr1pt4m13nt0';

var createToken = function (user) {
    var payLoad = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };

    return jwt.encode(payLoad, secret);
}

export {
    createToken
}