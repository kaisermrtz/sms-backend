const { Model } = require('./../models/model');
const data = require('./data.json');

const seedDatabase = (done) => {
    Model.remove({}).then(() => {
        return Model.insertMany(data);
    }).then(() => done());
};

module.exports = { seedDatabase }