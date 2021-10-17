const ruta = require('express').Router();
const controlador = require('./controller');

ruta.post('/', controlador.auth);
ruta.post('/register', controlador.register);

module.exports = ruta;