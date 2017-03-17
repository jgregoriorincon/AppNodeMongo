import { PaginateModel, Schema, model } from 'mongoose';
import {TestModel as Test} from '../models/pass';
import * as mongoosePaginate from 'mongoose-paginate';

export function getAllArtists(req, res) {

    Test.paginate({}, { page: 3, limit: 10 }, function(err, result) {
        // result.docs 
        // result.total 
        // result.limit - 10 
        // result.page - 3 
        // result.pages 
    });
}