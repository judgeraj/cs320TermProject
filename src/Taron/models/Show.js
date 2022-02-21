const mongoose = require('mongoose');

const ShowSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number
    }
});

module.exports = mongoose.model('Shows', ShowSchema);