require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');

let { mongoose } = require('./db/mongoose');

let { Model } = require('./models/model.js');
let { seedDatabase } = require('./seed/seed');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

seedDatabase(() => {
    console.log('Database seeded');
});

// GET /
app.get('/', async(req, res) => {
    console.log('GET /')
    try {
        let data = await Model.find();
        res.send(data);
    } catch(error) {
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});