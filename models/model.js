var mongoose = require('mongoose');

var Model = mongoose.model('Model', {
    id: {
        type: Number,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
});

module.exports = { Model }