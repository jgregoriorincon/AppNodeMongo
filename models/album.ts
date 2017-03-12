'use strict'

import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    }
});

module.exports = mongoose.model('Album', AlbumSchema);