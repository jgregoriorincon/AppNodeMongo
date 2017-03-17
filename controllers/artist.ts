'use strict'

import * as path from 'path';
import * as fs from 'fs';
import {
    PaginateModel,
    Schema,
    model
} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

import {
    ArtistModel as Artist
} from '../models/artist';
/*import {AlbumModel as Album} from '../models/album';
import {SongModel as Song} from '../models/song';*/

/**
 * Recupera un artista desde la BD usando el _id
 * 
 * @export
 * @param {any} req Datos enviados desde el cliente a través de la API
 * @param {any} res Respuesta generada por los servicios
 */
export function getArtist(req, res) {
    var artistId = req.params.id;

    Artist.findById(artistId, (err, artist) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!artist) {
                res.status(404).send({
                    message: 'El artista no existe'
                });
            } else {
                res.status(200).send({
                    artist
                });
            }
        }
    });
}

/**
 * Salva un artista en la BD, usando los parametros enviados por el cliente
 * 
 * @export
 * @param {any} req Datos enviados desde el cliente a través de la API
 * @param {any} res Respuesta generada por los servicios
 */
export function saveArtist(req, res) {
    var artist = new Artist();

    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err, artistStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el artista'
            });
        } else {
            if (!artistStored) {
                res.status(404).send({
                    message: 'El artista no ha sido guardado'
                });
            } else {
                res.status(200).send({
                    artist: artistStored
                });
            }
        }
    })

}

/**
 * Recupera todos los artista desde la BD
 * 
 * @export
 * @param {any} req Datos enviados desde el cliente a través de la API
 * @param {any} res Respuesta generada por los servicios
 */
export function getAllArtists(req, res) {
    let page = req.params.page || 1;
    let itemsPerPage = req.params.itemspage || 3;

    var query = {};
    var options = {
        sort: {
            name: 1
        },
        page: parseInt(page),
        limit: parseInt(itemsPerPage)
    };

    console.log(options);

    Artist.paginate(query, options, function (err, artists) {
        if (err) {
            res.status(500).send({
                message: 'Error al realizar la petición'
            });
        } else {
            if (!Artist) {
                res.status(404).send({
                    message: 'No hay artistas'
                });
            } else {
                res.status(200).send({
                    total: artists.total,
                    pagina: artists.page + ' de ' + artists.pages,
                    artists: artists.docs
                });
            }
        }
    });
}