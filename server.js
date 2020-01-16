require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');

let { mongoose } = require('./db/mongoose');

let { Model } = require('./models/model.js');
let { seedDatabase } = require('./seed/seed');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Only seed database if not in test mode
if (process.env.NODE_ENV !== "test") {
    seedDatabase(() => {
        console.log('Database seeded');
    });
}

// GET /
app.get('/', async(req, res) => {
    console.log('GET /');
    try {
        let data = await Model.find();
        res.send(data);
    } catch(error) {
        res.status(400).send(error);
    }
});

// GET /:id
app.get('/:id', async(req, res) => {
    console.log('GET /:id');
    try {
        let dataPoint = await Model.findOne({id: req.params.id});
        if (!dataPoint) {
            throw 'Invalid id'
        }
        res.send(dataPoint);
    } catch(error) {
        res.status(400).send(error);
    }
});

// POST /add
app.post('/add', async(req, res) => {
    console.log('POST /add');
    try {
        validateDataPoint(req.body);
        const data = new Model(req.body);
        await data.save()
        res.send(data);
    } catch(error) {
        res.status(400).send(error);
    }    
});

// POST /update/:id
app.post('/update/:id', async(req, res) => {
    console.log('POST /update/:id');
    try {
        validateDataPoint(req.body)
        const data = await Model.findOneAndUpdate({id: req.params.id}, {$set: req.body}, {new: true});
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}); 

// GET /delete/:id
app.get('/delete/:id', async(req, res) => {
    console.log('POST /delete/:id');
    try {
        const data = await Model.findOneAndRemove({id: req.params.id});
        if (!data) {
            throw 'Invalid id'
        }
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
});

const validateDataPoint = (dataPoint) => {
    const newData = new Model(dataPoint);
    var error = newData.validateSync();
    if (error) {
        throw error
    }
};

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};