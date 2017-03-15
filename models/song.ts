'use strict'

import {Document, model, Model, Schema} from 'mongoose';

export const SongSchema: Schema = new Schema({
    number: Number,
    name: String,
    duration: Number,
    file: String,
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    }
});

export interface ISong extends Document {
    number: Number;
    name: String;
    duration: Number;
    file: String;
    artist: Schema.Types.ObjectId;
}

export const SongModel: Model<ISong> = model<ISong>('Song', SongSchema);