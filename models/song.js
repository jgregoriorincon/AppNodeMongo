'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
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
//# sourceMappingURL=song.js.map