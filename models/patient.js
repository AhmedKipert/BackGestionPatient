const mongoose = require('mongoose');

const schema = mongoose.Schema({
    no: Number,
    id: String,
    nom: String,
    prenom: String, 
    email: String,
    age: Number,
    sexe: String,
    dateConsultation: String
});

module.exports = mongoose.model('Patient', schema)