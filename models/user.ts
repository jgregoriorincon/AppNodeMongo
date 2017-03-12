'use strict'
/*
import { Schema } from "mongoose";

export var UserSchema: Schema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String
});
*/

import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String
});

var User = mongoose.model('User', UserSchema);
export {User};