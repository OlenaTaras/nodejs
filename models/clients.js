const mongoose = require( 'mongoose' );

const clientSchema = mongoose.Schema( {
    _id: mongoose.Schema.Types.ObjectId,
    group: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Groups', required: true
    },
    firstName: {
        type: String, required: true
    },
    lastName: {
        type: String, required: true
    },
    dateOfBirth: {
        type: Date
    },
    // email: {
    //     type: String,
    //     required: false,
    //     unique: true,
    //     match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    // }
}, {collection: 'clients'} );

const Client = mongoose.model( 'Clients', clientSchema );

module.exports = Client;