// AnimeMessage.js
const mongoose = require('mongoose');


const AnimeMessageSchema = mongoose.Schema({
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
    message: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('AnimeMessages', AnimeMessageSchema);