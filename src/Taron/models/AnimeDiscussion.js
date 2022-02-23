const mongoose = require('mongoose');

const AnimeDiscussionSchema = mongoose.Schema({
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
    }
});

module.exports = mongoose.model('AnimeDiscussions', AnimeDiscussionSchema);