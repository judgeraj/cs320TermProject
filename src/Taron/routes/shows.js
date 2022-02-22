const express = require('express');
const Show = require('../models/Show');
const router = express.Router();

// Get all the shows, maybe for a listing of all shows?
router.get('/', async (req, res) => {
    // debug the GET request
    console.log('GET request to Vivian\'s shows page');

    // await getting the shows from the database
    try {
        const shows = await Show.find();
        res.json(shows);
    } catch(err) {
        res.json({ message: err });
    }
});

// Get a specific show, not sure the use case?
// Maybe opening a modal window to modify the show's information?
router.get('/:showId', async (req, res) => {
    // debug the params
    console.log('GET request to Vivian\'s shows page');
    console.log(req.params.showId);

    try {
        const show = await Show.findById(req.params.showId);
        res.json(show);
    } catch(err) {
        res.json({ message: err });
    }
});

// Post a single show, maybe from Add Show or something?
router.post('/', async (req, res) => {
    // debug the POST contents
    console.log('POST request to Vivian\'s shows page');
    console.log(req.body);

    // create a new Show Model from the ShowSchema
    const show = new Show({
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating
    });
    
    // try to save the posted data to the database
    try {
        const savedShow = await show.save();
        res.json(savedShow);
    } catch(err) {
        res.json({ message: err });
    }
});

// Update part of a show
router.patch('/:showId', async (req, res) => {
    // debug the params
    console.log('PATCH request to Vivian\'s shows page');
    console.log(req.params.showId);

    try {
        const updatedShow = await Show.updateOne(
            { _id: req.params.showId },
            { $set: { title: req.body.title } }
        );
        res.json(updatedShow);
    } catch(err) {
        res.json({ message: err });
    }
});

// Delete a show by showId
router.delete('/:showId', async (req, res) => {
    // debug the params
    console.log('DELETE request to Vivian\'s shows page');
    console.log(req.params.showId);

    try {
        const removedShow = await Show.deleteOne({ _id: req.params.showId });
        res.json(removedShow);
    } catch(err) {
        res.json({ message: err });
    }
});

module.exports = router;