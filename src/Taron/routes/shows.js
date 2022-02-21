const express = require('express');
const Show = require('../models/Show');
const router = express.Router();
 
router.get('/', (req, res) => {
    res.send('GET request to Vivian\'s shows page');
});

router.post('/', (req, res) => {
    const show = new Show({
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating
    });
    console.log(req.body);
    show.save()
        .then(data => {
            console.log('Saved new show');
            res.json(data);
        })
        .catch(err => {
            console.log(err); // debug print
            res.json({ message: err });
        });
});

module.exports = router;