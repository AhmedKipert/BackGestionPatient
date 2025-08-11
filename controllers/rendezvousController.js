const Rendezvous = require('../models/rendezvous')
const genererID = require('../utils/genererID')
// LISTE
exports.getRendezvouss = async (req, res) => {
    try {
        const rendezvous = await Rendezvous.find().populate('medecin').populate('patient');
        await res.json({rendezvous, code: 200});

    } catch (error) {
        console.log("Erreur lors du fetch:", error);
        await res.json('Erreur backend: impossible de retourner la liste des rendez-vous');
    }
};


// AJOUTER
exports.postRendezvous = async(req, res) => {
    try {
        const {date, patient, medecin} = req.body;
        const no = (await Rendezvous.countDocuments())+1;
        const rendezvous = await Rendezvous.create({
            no: no,
            id: ("RDV" + genererID),
            date: date,
            patient: patient,
            medecin: medecin
        });

        await res.json({message: `Rendez-vous ajouté avec succès`});

    } catch (error) {
        console.log("Erreur coté serveur postRendezvous:", error);
        await res.json({message:`impossible d'ajouter le Rendezvous`});
    }
}

// SUPPRIMER
exports.deleteRendezvous = async(req, res) => {
    try {
        const id = req.params.id;
        
        await Rendezvous.findByIdAndDelete(id);
        await res.json({message: `Rendezvous supprimé avec succès`});

    } catch (error) {
        console.log(error);
        res.json({message:`impossible de supprimer le Rendezvous: \n${error}`});
    }
}

// MODIFIER
exports.updateRendezvous = async(req, res) => {
    try {
        const {id} = req.params;
        const infos = req.body;
        console.log("ID Modifier:", id);
        await Rendezvous.findByIdAndUpdate(id, infos);
        await res.json({message: `Rendezvous modifier avec succès`});

    } catch (error) {
        res.json({message:`impossible de modifier le Rendezvous: \n${error}`});
    }
}

// RECUPERER UN SEUL
exports.getRendezvous = async(req, res) => {
    const {id} = req.params;
    console.log("ID DU Rendezvous:", id);

    try {
        const rendezvous = await Rendezvous.findById(id);
        await res.json({rendezvous, message: "Succes de  récupération"});
    } catch (error) {
        console.log(error);
        res.json({message: error})
    }
}