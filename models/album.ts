'use strict'

import {Document, model, Model, Schema} from 'mongoose';

export const AlbumSchema:Schema = new Schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    }
});

export interface IAlbum extends Document {
    title: String;
    description: String;
    year: Number;
    image: String;
    artist: Schema.Types.ObjectId;
}

export const AlbumModel: Model<IAlbum> = model<IAlbum>('Album', AlbumSchema);