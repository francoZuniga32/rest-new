const ruta = require('express').Router();
const controller = require('./controller');

ruta.get('/', controller.all);
ruta.get('/:id', controller.one);
ruta.post('/', controller.post);

module.exports = ruta;