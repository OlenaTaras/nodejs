const Trainer = require( '../models/trainer' );
const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );
const common = require('./common.controller');

module.exports.GET_TRAINER_BY_ID = ( req, res, next ) => {

    Trainer
        .find(general.QUERY_BY_ID(req.query))
        .exec()
        .then( function ( trainer ) {
            res.status( 200 ).json( trainer )
        } )
        .catch( function ( err ) {
            res.status( 404 ).json( {message: 'trainer not found'} )
        } )
};

module.exports.CREATE_NEW_UNIQUE_TRAINER = ( req, res, next ) => {
    Trainer.find( {email: req.body.email} )
        .exec()
        .then( function ( user ) {
            if (user.length >= 1) {
                return res.status( 409 ).json( {message: "mail exists"} )
            } else {
                bcrypt.hash( req.body.password, 10, function ( err, hash ) {
                    if (err) {
                        return res.status( 500 ).json( {
                            error: err
                        } )
                    } else {
                        const newTrainer = new Trainer( {
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            confirmPassword: hash
                        } );

                        newTrainer.save( function ( err, post ) {
                            if (err) {
                                return next( err )
                            }
                            res.json( 201, post )
                        } );
                    }
                } );
            }
        } );
};

module.exports.REMOVE_TRAINER = ( req, res, next ) => {

    Trainer.remove(general.QUERY_BY_ID )
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