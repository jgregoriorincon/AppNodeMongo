'use strict'

import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String
});

var User = mongoose.model('User', UserSchema);
export {User};