const mongoose = require('mongoose');

const AnimePostSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    animeDiscussionId: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    imageId: {
        type: String,   // need to set up a way to use base64 encoding
        required: false
    },
    url: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('AnimePosts', AnimePostSchema);