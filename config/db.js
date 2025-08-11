
const mongoose = require('mongoose');

// Connexion à la base de données
const connectDB = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Connexion réussi à la base de donnée");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;