// AnimeDiscussion.js
const mongoose = require('mongoose');


const AnimeDiscussionSchema = mongoose.Schema({
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
    }
});


module.exports = mongoose.model('AnimeDiscussions', AnimeDiscussionSchema);