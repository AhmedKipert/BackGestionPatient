const express = require('express');
const rendezvousRoute = express.Router();
const rendezvousController = require('../controllers/rendezvousController');

rendezvousRoute.get('/rendezvouss', rendezvousController.getRendezvouss);
rendezvousRoute.post('/rendezvous/ajouter', rendezvousController.postRendezvous);
rendezvousRoute.delete('/rendezvous/supprimer/:id', rendezvousController.deleteRendezvous);
rendezvousRoute.put('/rendezvous/modifier/:id', rendezvousController.updateRendezvous);
rendezvousRoute.get('/rendezvous/:id', rendezvousController.getRendezvous);

module.exports = rendezvousRoute;