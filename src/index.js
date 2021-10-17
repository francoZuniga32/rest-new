const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const controlador = require('./app/Media/controller');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/static",express.static(path.join(__dirname,"public")));

app.use('/upload/image', require('./middelwere/auth'));
app.use('/upload/video', require('./middelwere/auth'));
app.use('/upload/audio', require('./middelwere/auth'));
app.use('/upload/file', require('./middelwere/auth'));

app.use('/upload', require('./app/Media/index'));
app.use('/auth/', require('./app/Auth/index'));
app.use('/posts', require('./app/Post/index'));
app.use('/pages', require('./app/Page/index'));

app.listen(process.env.PORT, ()=>{

});