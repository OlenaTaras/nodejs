const mongoose = require( 'mongoose' );
const lodash = require( 'lodash' );

const Client = require( '../models/clients' );

module.exports.CREATE_NEW_CLIENT = ( req, res, next ) => {
    const client = new Client( {
        _id: new mongoose.Types.ObjectId(),
        group: req.body.groupId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth
    } );
    client
        .save()
        .then( result => {
            res.status( 201 ).json( {
                result
            } )
        } )
        .catch( err => {
            res.status( 500 ).json( {
                error: err
            } )
        } )
};

module.exports.GET_CLIENTS_INFO = ( req, res, next ) => {

    const groupQuery = req.query.groupId ? {
        group: lodash.mapKeys( req.query, ( key ) => {
            return '_id'
        } )
    } : {};

    const clientQuery = req.query.clientId ?
        lodash.mapKeys( req.query, ( key ) => {
            return '_id'
        } ) : {};

    Client
        .find( Object.assign( {}, groupQuery, clientQuery ) )
        .populate( {
            path: 'group',
            populate: {
                path: 'trainer',
                select: 'email'
            }
        } )
        .exec()
        .then( result => {
            res.status( 201 ).json( {
                count: result.length,
                result
            } )
        } )
        .catch( err => {
            res.status( 500 ).json( {
                error: err
            } );
        } )

};

module.exports.REMOVE_CLIENT_BY_ID = ( req, res, next ) => {
    const id = req.query.clientId;
    Client.remove( {_id: id} )
        .exec()
        .then( function ( res ) {
                res.status( 200 ).json( {message: 'user deleted'} )
            }
                .catch( function ( err ) {
                    return res.status( 500 ).json( {
                        error: err
                    } )
                } )
        )
};

module.exports.FIND_CLIENT_BY_QUERY = ( req, res, next ) => {
    const trainerId = req.userDate.trainerId;
    // const firstName = req.query.firstName;
    // const lastName = req.query.lastName;

    const query = req.query ? lodash.mapValues( req.query, ( value ) => {
        return new RegExp( value )
    } ) : {};

    console.log( query );

    Client
        .find( Object.assign( {personalInfo: query}, {
            trainer: {_id: trainerId}
        } ) )
        .limit( 20 )
        .exec()
        .then( result => {
            const response = {
                count: result.length,
                result
            };
            res.status( 201 ).json( {response} )
        } )
        .catch( err => {
            res.status( 404 ).json( {
                error: err
            } )
        } )
};