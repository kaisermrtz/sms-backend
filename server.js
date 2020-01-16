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

seedDatabase(() => {
    console.log('Database seeded');
});

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

// POST /add
app.post('/add', async(req, res) => {
    console.log('POST /add');
    try {
        const data = new Model(req.body);
        await data.save()
        res.send(data);
    } catch(error) {
        res.status(400).send(error);
    }    
});

// POST /update/:id
app.post('/update/:id', async(req, res) => {
    console.log('POST /update');
    try {
        const data = await Model.findOneAndUpdate({id: req.params.id}, {$set: req.body}, {new: true});
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}); 

// GET /delete/:id
app.get('/delete/:id', async(req, res) => {
    console.log('Post /delete');
    try {
        const data = await Model.findOneAndRemove({id: req.params.id});
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});