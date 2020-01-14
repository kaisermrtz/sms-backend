var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env_MONGODB_URI, { useNewUrlParser: true });

module.exports = { mongoose };