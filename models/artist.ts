'use strict'

import {Document, model, Model, Schema} from 'mongoose';

const ArtistSchema: Schema = new Schema({
    name: String,
    description: String,
    image: String
});

interface IArtist extends Document {
    name: String;
    description: String;
    image: String;
}

export const ArtistModel: Model<IArtist> = model<IArtist>('Artist', ArtistSchema);