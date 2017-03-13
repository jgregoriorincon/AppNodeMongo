'use strict'

import {Document, model, Model, Schema} from 'mongoose';

var AlbumSchema:Schema = new Schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    }
});

interface IAlbum extends Document {
    title: String;
    description: String;
    year: Number;
    image: String;
    artist: Schema.Types.ObjectId;
}

export var AlbumModel: Model<IAlbum> = model<IAlbum>('Album', AlbumSchema);