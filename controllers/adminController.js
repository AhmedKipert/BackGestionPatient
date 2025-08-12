const Admin = require('../models/admin');
const genererID = require('../utils/genererID');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// // LISTE
// exports.getMedecins = async(req, res) => {
//     try {
//         const medecins = await Medecin.find().limit(10); // Liste de tous les medecins
//         res.json(medecins);
//     } catch (error) {
//         res.json({"erreur": error.message});
//     };
// }


// AJOUTER
exports.adminSignup = async (req, res) => {

    try {
        let { nom, prenom, email, matricule, motdepasse } = req.body;
        motdepasse = await bcrypt.hash(motdepasse, 10);

        const no = (await Admin.countDocuments()) + 1;
        await Admin.create({
            no: no,
            nom: nom,
            prenom: prenom,
            email: email,
            matricule: matricule,
            motdepasse: motdepasse
        });

        await res.json({ message: `Admin ${prenom + " " + nom} ajouté avec succès` });

    } catch (error) {
        console.log(error);
        res.json({ message: `impossible d'ajouter admin: \n${error}` });
    }
}

// // SUPPRIMER
// exports.deleteMedecin = async(req, res) => {
//     try {
//         const id = req.params.id;
//         console.log("ID supprimer", id);
//         // const medecin = await medecin.findOne({id});

//         await Medecin.findByIdAndDelete(id);
//         await res.json({message: `medecin supprimé avec succès`});

//     } catch (error) {
//         console.log(error);
//         res.json({message:`impossible de supprimer le medecin: \n${error}`});
//     }
// }

// // MODIFIER
// exports.updateMedecin = async(req, res) => {
//     try {
//         const {id} = req.params;
//         const infos = req.body;

//         await Medecin.findByIdAndUpdate(id, infos);
//         await res.json({message: `medecin modifier avec succès`});

//     } catch (error) {
//         res.json({message:`impossible de modifier le medecin: \n${error}`});
//     }
// }

// RECUPERER UN SEUL
exports.adminLogin = async (req, res) => {
    const succes = "Connexion admin réussi";
    const erreur = 'Matricule ou mot de passe incorrecte';
    let message = '';

    let { matricule, motdepasse } = req.body;

    try {
        const admin = await Admin.findOne({ matricule });
        if (!admin) { message = erreur; return res.json({ message, code: 400 }) };

        bcrypt.compare(motdepasse, admin.motdepasse, (_, decoded) => {
            if (!decoded) { message = erreur; return res.json({ message, code: 400 }) };

            message = succes;
            const token = jwt.sign(
                { id: admin._id },
                SECRET_KEY = "Fkipert33225xyz",
                { expiresIn: '1h' }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 3600000,
                domain: "backgestionpatient.up.railway.app"
            });

            console.log("Cookie envoyé avec succes")
            return res.json({ message, code: 200, token });
        });

    } catch (error) {
        console.log(error);
        await res.json({ message: erreur })
    }
}