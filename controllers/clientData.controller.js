const mongoose = require( 'mongoose' );

const ClientData = require( '../models/clientData' );
const common = require('./common.controller');


module.exports.ADD_NEW_DATA_TO_CLIENT = ( req, res, next ) => {
    const clientId = req.body.client;

    const date = req.body.date;
    const weight = req.body.weight;
    const waist = req.body.waist;
    const thighs = req.body.thighs;
    const height = req.body.height;
    const massindex = req.body.massindex;

    const results = Object.assign( {date}, {weight}, {waist}, {thighs}, {height}, {massindex} );

    ClientData
        .find( {client: {_id: clientId}} )
        .exec()
        .then( ( result ) => {

            if (result.length < 1) {
                const clientData = new ClientData( Object.assign(
                    {_id: new mongoose.Types.ObjectId()},
                    {client: {_id: clientId}},
                    {results: results} ) );

                clientData
                    .save()
                    .exec();
                next()
            }
            else { ClientData
                    .update( {client: {_id: clientId}}, {
                        $push: {
                            results: results
                        }
                    } )
                    .exec()
            }
            res.status( 200 ).json( {
                message: "new data was saved"
            } )
        } )
        .catch( err => {
            return res.status( 500 ).json( {
                error: err
            } )
        } );
};

module.exports.GET_ALL_CLIENT_DATA = ( req, res, next ) => {
    ClientData
        .find( {client: common.QUERY_BY_ID(req.query)} )
        .populate( {
            path: 'client',
            populate: {
                path: 'group',
                select: 'name',
                populate: {
                    path: 'trainer',
                    select: 'email'
                }
            }
        } )
        .exec()
        .then( result => {
            res.status( 201 ).json( {
                result
            } )
        } )
        .catch( err => {
            res.status( 500 ).json( {
                error: err
            } );
        } )

};