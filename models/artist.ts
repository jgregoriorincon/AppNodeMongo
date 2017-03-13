'use strict'

import {Document, model, Model, Schema} from 'mongoose';

var ArtistSchema: Schema = new Schema({
    name: String,
    description: String,
    image: String
});

interface IArtist extends Document {
    name: String;
    description: String;
    image: String;
}

export var ArtistModel: Model<IArtist> = model<IArtist>('Artist', ArtistSchema);