// chats.js
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('GET request to Emily\'s chat page');
});


module.exports = router;