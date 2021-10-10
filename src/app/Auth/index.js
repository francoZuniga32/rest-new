const ruta = require('express').Router();
const controlador = require('./controlador');

ruta.get('/', controlador.auth);
ruta.post('/', controlador.register);

module.exports = ruta;