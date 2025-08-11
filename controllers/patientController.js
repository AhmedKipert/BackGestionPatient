const Patient = require('../models/patient')
const genererID = require('../utils/genererID');

// LISTE
exports.getPatients = async(req, res) => {
    try {
        const patients = await Patient.find().limit(10); // Liste de tous les patients
        res.json({patients, code: 200});
    } catch (error) {
        res.json({"erreur": error.message})
    }
}

// AJOUTER
exports.postPatient = async(req, res) => {
    try {
        const {nom, prenom, email, age, sexe, dateConsultation} = req.body;
        const no = (await Patient.countDocuments())+1;
        const patient = await Patient.create({
            no: no,
            id: genererID,
            nom: nom,
            prenom:prenom,
            email: email,
            age: age,
            sexe: sexe,
            dateConsultation: dateConsultation
        });

        await res.json({message: `Patient ${prenom + " " + nom} ajouté avec succès`});

    } catch (error) {
        console.log(error);
        res.json({message:`impossible d'ajouter le patient: \n${error}`});
    }
}

// SUPPRIMER
exports.deletePatient = async(req, res) => {
    try {
        const id = req.params.id;
        
        await Patient.findByIdAndDelete(id);
        await res.json({message: `Patient supprimé avec succès`});

    } catch (error) {
        console.log(error);
        res.json({message:`impossible de supprimer le patient: \n${error}`});
    }
}

// MODIFIER
exports.updatePatient = async(req, res) => {
    try {
        const {id} = req.params;
        const infos = req.body;
        
        await Patient.findByIdAndUpdatem(id, infos);
        await res.json({message: `Patient modifier avec succès`});

    } catch (error) {
        res.json({message:`impossible de modifier le patient: \n${error}`});
    }
}

// RECUPERER UN SEUL
exports.getPatient = async(req, res) => {
    const {id} = req.params;
    console.log("ID DU PATIENT:", id)

    try {
        const patient = await Patient.findById(id);
        await res.json({patient, message: "Succes de  récupération"});
    } catch (error) {
        console.log(error);
        res.json({message: error})
    }
}