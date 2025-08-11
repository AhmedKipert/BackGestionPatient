const express = require('express');
const patientRoute = express.Router();
const patientController = require('../controllers/patientController')
const authentification = require('../middlewares/authentification');

patientRoute.get('/patients', authentification, patientController.getPatients);
patientRoute.post('/patient/ajouter', patientController.postPatient);
patientRoute.delete('/patient/supprimer/:id', patientController.deletePatient);
patientRoute.put('/patient/modifier/:id', patientController.updatePatient);
patientRoute.get('/patient/:id', patientController.getPatient);

module.exports = patientRoute;