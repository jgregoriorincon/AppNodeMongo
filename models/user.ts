'use strict'

import {
    Document,
    model,
    Model,
    Schema
} from 'mongoose';

var UserSchema: Schema = new Schema({
    name: String,
    surname: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    role: String,
    image: String
});

interface IUser extends Document {
    name: String;
    surname: String;
    email: String;
    password: String;
    role: String;
    image: String;
}

export var UserModel: Model < IUser > = model < IUser > ('User', UserSchema);