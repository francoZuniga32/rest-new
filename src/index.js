const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/upload', require('./app/Media/index'));

app.listen(process.env.PORT, ()=>{

});