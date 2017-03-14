'use strict'

import * as mongoose from 'mongoose';
//mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var SongSchema = new Schema({
    number: Number,
    name: String,
    duration: Number,
    file: String,
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    }
});

module.exports = mongoose.model('Song', SongSchema);