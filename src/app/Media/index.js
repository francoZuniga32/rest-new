const ruta = require('express').Router();
const controlador = require('./controller');

ruta.post('/image', controlador.imagen);
ruta.get('/images', controlador.getImages);
ruta.post('/video', controlador.video);
ruta.get('/videos', controlador.getVideo);
ruta.post('/audio', controlador.audio);
ruta.get('/audios', controlador.getAudio);
ruta.post('/file', controlador.file);
ruta.get('/files', controlador.getFile);

module.exports = ruta;
