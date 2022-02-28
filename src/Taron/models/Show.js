// Show.js
const mongoose = require('mongoose');


const ShowSchema = mongoose.Schema({
    title: {
        type: String,
        maxLength: 60,
        required: true
    },
    description: {
        type: String,
        maxLength: 1000,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    }
});


module.exports = mongoose.model('Shows', ShowSchema);