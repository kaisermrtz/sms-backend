require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');

let { mongoose } = require('./db/mongoose');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// GET /
app.get('/', async(req, res) => {
    console.log('GET /')
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});