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
        required: true,
        enum: ['Yearly', 'Monthly', 'Weekly', 'Daily', 'Often', 'Once', 'Seldom', 'Never']
    },
    color: {
        type: String,
        required: true,
        validate: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    }
});

module.exports = { Model }