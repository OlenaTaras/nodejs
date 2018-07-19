const mongoose = require( 'mongoose' );

const groupSchema = mongoose.Schema( {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        text: true,
        default: new Date().getUTCDate() + 'group',
        unique: true
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Trainers'
    }
}, {collection: 'groups'} );

const Trainer = mongoose.model( 'Groups', groupSchema );

module.exports = Trainer;