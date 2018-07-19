const express = require( 'express' );
const router = express.Router();
const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );

const checkAuth = require( '../middleware/check-auth' );
const Trainer = require( '../models/trainer' );

const TrainerController = require( '../controllers/trainers.controller' );

/*
* @api {get}
* @apiSampleRequest /trainers?trainerId=5ae70b5a8c521b04c067b30f
* @apiDescription return all trainers is no query
* @apiPermission loginTrainer
* @apiName GET_ALL_TRAINERS
 */
router.get( '/', checkAuth, TrainerController.GET_TRAINER_BY_ID );

/*
* @api {post}
* @apiSampleRequest /trainers
* @apiExample {json} {
*   "email": "olena@olena.com,
*   "password": "olena",
*   "confirmPassword": "olena"
*   }
 */
router.post( '/', TrainerController.CREATE_NEW_UNIQUE_TRAINER );

/*
* @api {delete}
* @apiSampleRequest /trainers?trainerId=5ae70b5a8c521b04c067b30f
* @apiDescription delete trainer by id
* @apiPermission loginTrainer
* @apiName REMOVE_TRAINER
 */
router.delete( '/', checkAuth, TrainerController.REMOVE_TRAINER );

/*
* @api {post}
* @apiSampleRequest /trainers/login
* @apiDescription login trainer and get token
* @apiPermission trainer
* @apiExample {json} {
*   "email": "olena@olena.com"
*   "password": "olena"
* }
* @apiSuccessExample {json} Success-Response:
* {
* }
 * */
router.post( '/login', function ( req, res, next ) {
    Trainer.find( {email: req.body.email} )
        .exec()
        .then( function ( trainer ) {

            if (trainer.length < 1) {
                return res.status( 401 ).json( {message: 'Auth failed'} )
            }

            bcrypt.compare( req.body.password, trainer[ 0 ].password, function ( err, result ) {
                if (err) {
                    return res.status( 401 ).json( {message: 'Auth failed'} )
                }

                if (result) {
                    const token = jwt.sign( {
                            email: trainer[ 0 ].email,
                            trainerId: trainer[ 0 ]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '32h'
                        } );


                    return res.status( 200 ).json( {
                        message: 'Auth successfull',
                        token: token
                    } )
                } else {
                    return res.status( 401 ).json( {message: 'Auth failed'} )
                }
            } );
        } )
} );


module.exports = router;
