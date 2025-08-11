const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // const authHeader = req.headers['authorization'];
    // if(!header) return res.json({status: 400, message: "Accès refusé"});
    // const token =  authHeader && authHeader.split(' ')[1];
    const token = req.cookies.token;

    if(!token) return res.json({status:  400, message: "Accès refusé"});
  
    jwt.verify(token, 'Fkipert33225xyz', (err) => {
        if(err) return res.json({status: 400, message: "Accès refusé"});
        next();
    });
};