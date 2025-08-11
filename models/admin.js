const mongoose = require('mongoose');

const schema = mongoose.Schema({
    no: Number,
    nom: String,
    prenom: String, 
    email: String,
    matricule: String,
    motdepasse: String,
});

module.exports = mongoose.model('Admin', schema)