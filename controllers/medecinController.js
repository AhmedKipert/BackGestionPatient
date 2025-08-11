const Medecin = require('../models/medecin');
const genererID = require('../utils/genererID');

// LISTE
exports.getMedecins = async(req, res) => {
    try {
        const medecins = await Medecin.find().limit(10); // Liste de tous les medecins
        res.json(medecins);
    } catch (error) {
        res.json({"erreur": error.message});
    };
}


// AJOUTER
exports.postMedecin = async(req, res) => {
    try {
        const {nom, prenom, matricule, service} = req.body;
        const no = (await Medecin.countDocuments())+1;
        await Medecin.create({
            no: no,
            id: "MED"+genererID,
            nom: nom,
            prenom:prenom,
            matricule: matricule,
            service: service
        });

        await res.json({message: `Médecin ${prenom + " " + nom} ajouté avec succès`});

    } catch (error) {
        console.log(error);
        res.json({message:`impossible d'ajouter le médecin: \n${error}`});
    }
}

// SUPPRIMER
exports.deleteMedecin = async(req, res) => {
    try {
        const id = req.params.id;
        console.log("ID supprimer", id);
        // const medecin = await medecin.findOne({id});
        
        await Medecin.findByIdAndDelete(id);
        await res.json({message: `medecin supprimé avec succès`});

    } catch (error) {
        console.log(error);
        res.json({message:`impossible de supprimer le medecin: \n${error}`});
    }
}

// MODIFIER
exports.updateMedecin = async(req, res) => {
    try {
        const {id} = req.params;
        const infos = req.body;
        
        await Medecin.findByIdAndUpdate(id, infos);
        await res.json({message: `medecin modifier avec succès`});

    } catch (error) {
        res.json({message:`impossible de modifier le medecin: \n${error}`});
    }
}

// RECUPERER UN SEUL
exports.getMedecin = async(req, res) => {
    const {id} = req.params;
    console.log("ID DU medecin:", id)

    try {
        const medecin = await Medecin.findById(id);
        await res.json({medecin, message: "Succes de  récupération"});
    } catch (error) {
        console.log(error);
        res.json({message: error})
    }
}