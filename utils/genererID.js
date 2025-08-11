const genererID = function(code) {
    const date = new Date();
    const jour = date.getDate().toString().padStart(2, 0)
    const mois = (date.getMonth()+1).toString().padStart(2, 0)
    const annee = date.getFullYear().toString().slice(2);
    const nombre = Math.floor(Math.random() * 1000 + 1).toString().padStart(3, 0)
    const ID = `${nombre + "" + jour + "" + mois + "" + annee}`;

    return ID;
}

module.exports = genererID();