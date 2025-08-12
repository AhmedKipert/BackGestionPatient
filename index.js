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
app.use(cors({
    origin: 'https://front-gestion-patient.vercel.app',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());


app.options('*', cors({
    origin: 'https://front-gestion-patient.vercel.app',
    credentials: true
}));

app.use((req, res, next) => {
    console.log('Origin reçu:', req.headers.origin);
    next();
});



// Routes
app.use('/api', patientRoute);
app.use('/api', medecinRoute);
app.use('/api', rendezvousRoute);
app.use('/api', adminRoute);

// Connexion à la BDD
connectDB();

// Lancer le serveur
app.listen(PORT, ()=> {
    console.log("Serveur NodeJS en écoute au port: ", PORT);
});