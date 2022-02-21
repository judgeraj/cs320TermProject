const express = require('express');
const Show = require('../models/Show');
const router = express.Router();
 
router.get('/', (req, res) => {
    res.send('GET request to Vivian\'s shows page');
});

router.post('/', async (req, res) => {
    //console.log(req.body);
    const show = new Show({
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating
    });
    
    try {
        const savedShow = await show.save();
        res.json(savedShow);
    } catch(err) {
        res.json({ message: err });
    }
});

module.exports = router;