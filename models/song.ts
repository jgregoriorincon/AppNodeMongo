'use strict'

import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

var SongSchema = Schema({
    number: Number,
    name: String,
    duration: Number,
    file: String,
    artist: {
        type: Schema.ObjectId,
        ref: 'Album'
    }
});

module.exports = mongoose.model('Song', SongSchema);