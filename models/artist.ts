'use strict'

import * as mongoose from 'mongoose';
//mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
    name: String,
    description: String,
    image: String
});

module.exports = mongoose.model('Artist', ArtistSchema);