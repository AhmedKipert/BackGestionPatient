const mongoose = require('mongoose');

const schema = mongoose.Schema({
    no: Number,
    id: String,
    date: String,
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }, 
    medecin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medecin'
    },
});

module.exports = mongoose.model('Rendezvous', schema)