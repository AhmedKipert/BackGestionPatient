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
  origin: ['https://front-gestion-patient.vercel.app', 'https://backgestionpatient.up.railway.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(cookieParser());
app.use(express.json());


// Test
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} Origin: ${req.headers.origin}`);
  next();
});

// Routes
// Ajoutez ceci avant les autres routes
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    message: 'API en fonctionnement'
  });
});

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