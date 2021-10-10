const ruta = require('express').Router();
const controlador = require('./controlador');

ruta.post('/image', controlador.imagen);
ruta.post('/video', controlador.video);
ruta.post('/audio', controlador.audio);
ruta.post('/file', controlador.file);

module.exports = ruta;
