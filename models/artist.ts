'use strict'

import {Document, model, Model, Schema} from 'mongoose';

export const ArtistSchema: Schema = new Schema({
    name: String,
    description: String,
    image: String
});

export interface IArtist extends Document {
    name: String;
    description: String;
    image: String;
}

export const ArtistModel: Model<IArtist> = model<IArtist>('Artist', ArtistSchema);