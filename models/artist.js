'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ArtistSchema = Schema({
    name: String,
    description: String,
    image: String
});
module.exports = mongoose.model('Artist', ArtistSchema);
//# sourceMappingURL=artist.js.map