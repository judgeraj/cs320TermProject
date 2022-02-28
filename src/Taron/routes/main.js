const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('GET request to main page');
});


module.exports = router;