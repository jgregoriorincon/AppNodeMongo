'use strict'

import {Document, model, Model, Schema} from 'mongoose';

var SongSchema: Schema = new Schema({
    number: Number,
    name: String,
    duration: Number,
    file: String,
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    }
});

interface ISong extends Document {
    number: Number;
    name: String;
    duration: Number;
    file: String;
    artist: Schema.Types.ObjectId;
}

export var SongModel: Model<ISong> = model<ISong>('Song', SongSchema);