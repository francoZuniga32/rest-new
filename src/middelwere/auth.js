require('dotenv').config();
const jwt = require('jsonwebtoken');

auth = async(req, res, next)=>{
    
    if(req.headers['access-token'] && jwt.verify(req.headers["access-token"], process.env.CLAVE).usuario){
        next();
    }else{
        res.status(401).send({err: "no ha provisto el token o este a expirado"});
    }
}

module.exports = auth;