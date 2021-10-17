const ruta = require('express').Router();
const controller = require('./controller');

ruta.get('/', controller.all);
ruta.post('/', controller.create);
ruta.get('/:id', controller.one);

module.exports = ruta;