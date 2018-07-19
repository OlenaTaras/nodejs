const mongoose = require( 'mongoose' );
const Group = require( '../models/groups' );
const lodash = require( 'lodash' );
const common = require('./common.controller');

module.exports.CREATE_NEW_GROUP = ( req, res, next ) => {
    const group = new Group( {
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        trainer: req.userDate.trainerId
    } );
    group
        .save()
        .then( result => {
            res.status( 201 ).json( {result} )
        } )
        .catch( err => {
            res.status( 500 ).json( {
                error: err,
                message: 'Group with such name exists'
            } )
        } )
};

module.exports.UPDATE_EXISTING_GROUP = ( req, res, next ) => {
    const query = req.query;

    Group
        .update( query, {$set: req.body} )
        .exec()
        .then( result => {
            res.status( 201 ).json( {result} )
        } )
        .catch( err => {
            res.status( 500 ).json( {
                error: err
            } )
        } )
};

module.exports.GET_GROUPS_FOR_TRAINER = ( req, res, next ) => {
    const trainerId = req.userDate.trainerId;
    const query = req.query ? req.query : {};

    Group
        .find( Object.assign( query, {trainer: {_id: trainerId}} ) )
        .populate( {
            path: 'trainer',
            select: 'email'
        } )
        .exec()
        .then( result => {
            const request = {
                count: result.length,
                result
            };
            res.status( 201 ).json( request )
        } )
        .catch( err => {
            res.status( 500 ).json( {
                err: err
            } )
        } )
};

module.exports.REMOVE_SELECTED_GROUP = ( req, res, next ) => {
    const query = req.query;
    Group
        .findOneAndRemove( query )
        .exec()
        .then( result => {
            res.status( 201 ).json( {result} )
        } )
        .catch( err => {
            res.status( 500 ).json( {
                error: err
            } )
        } )
};

module.exports.SEARCH_GROUP = ( req, res, next ) => {
    const trainerId = req.userDate.trainerId;

    Group
        .find( Object.assign( common.QUERY_BY_REGEX(req.query), {
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
