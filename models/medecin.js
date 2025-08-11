const mongoose = require('mongoose');

const schema = mongoose.Schema({
    no: Number,
    id: String,
    nom: String,
    prenom: String, 
    matricule: String,
    service: String,
});

module.exports = mongoose.model('Medecin', schema)