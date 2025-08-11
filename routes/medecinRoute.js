const express = require('express');
const medecinRoute = express.Router();
const medecinController = require('../controllers/medecinController');
const authentification = require('../middlewares/authentification');

medecinRoute.get('/medecins', authentification, medecinController.getMedecins);
medecinRoute.post('/medecin/ajouter', medecinController.postMedecin);
medecinRoute.put('/medecin/modifier/:id', medecinController.updateMedecin);
medecinRoute.delete('/medecin/supprimer/:id', medecinController.deleteMedecin);
medecinRoute.get('/medecin/:id', medecinController.getMedecin);

module.exports = medecinRoute;