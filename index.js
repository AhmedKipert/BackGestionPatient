require('dotenv').config();
const PORT = process.env.PORT || 3002;
const express = require('express')
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express();
const patientRoute = require('./routes/patientRoute')
const medecinRoute = require('./routes/medecinRoute');
const rendezvousRoute = require('./routes/rendezvousRoute');
const adminRoute = require('./routes/adminRoute');

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true
}));

// Routes
app.use(patientRoute);
app.use(medecinRoute);
app.use(rendezvousRoute);
app.use(adminRoute);

// Connexion à la BDD
connectDB();

// Lancer le serveur
app.listen(PORT, ()=> {
    console.log("Serveur NodeJS en écoute au port: ", PORT);
});