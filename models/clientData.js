const mongoose = require( 'mongoose' );

const clientDataSchema = mongoose.Schema( {
        client: {type: mongoose.Schema.Types.ObjectId, ref: 'Clients', required: true},
        results: [ {
            date: {
                type: Date, default: Date.now()
            },
            weight: {
                type: Number
            },
            waist: {
                type: Number
            },
            thighs: {
                type: Number
            },
            height: {
                type: Number
            },
            massindex: {
                type: Number
            }
        } ]
    }, {collection: 'clientDatas'} );

const clientData = mongoose.model( 'ClientData', clientDataSchema );

module.exports = clientData;