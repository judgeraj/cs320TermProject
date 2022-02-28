const express = require('express');
const AnimeDiscussion = require('../models/AnimeDiscussion');
const AnimePost = require('../models/AnimePost');
const AnimeMessage = require('../models/AnimeMessage');
const router = express.Router();


// Get the list of discussions available
router.get('/', async (req, res) => {
    // debug the GET request
    console.log('GET request to Robert\'s anime page');
    console.log(req.params);
    console.log(req.body);

    try {
        const discussions = await AnimeDiscussion.find();
        res.status(200).json(discussions);
    } catch (err) {
        res.status(400).json({ messages: err });
    }

    console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});


// Get a specific discussion
router.get('/:discussionId', async (req, res) => {
    // debug the params
    console.log('GET request to Robert\'s anime page, getting a discussion');
    console.log(req.params);
    console.log(req.body);

    try {
        const discussion = await AnimeDiscussion.findById(req.params.discussionId);
        res.status(200).json(discussion);
    } catch (err) {
        res.status(404).json({ message: err });
    }

    console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});


// Get the messages for a discussion
router.get('/messages/:discussionId', async (req, res) => {
    // debug the params
    console.log('GET request to Robert\'s anime page, getting the messages for a discussion');
    console.log(req.params);
    console.log(req.body);

    const discussionId = req.params.discussionId;

    try {
        const messages = await AnimeMessage.find({ animeDiscussionId: discussionId});
        res.status(200).json(messages);
    } catch (err) {
        res.status(404).json({ message: err });
    }

    console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});


// Get the posts for a discussion
router.get('/posts/:discussionId', async (req, res) => {
    // debug the params
    console.log('GET request to Robert\'s anime page, getting the anime posts for a discussion');
    console.log(req.params);
    console.log(req.body);

    const discussionId = req.params.discussionId;

    try {
        const posts = await AnimePost.find({ animeDiscussionId: discussionId});
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err });
    }

    console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});


// Create a new discussion
router.post('/', async (req, res) => {
    // debug the POST contents
    console.log('POST request to Robert\'s anime page');
    console.log(req.params);
    console.log(req.body);

    // create a new AnimeDiscussion Model from the AnimeDiscussionSchema
    const discussion = new AnimeDiscussion({
        title: req.body.title,
        description: req.body.description
    });
    
    // try to save the posted data to the database
    try {
        const savedDiscussion = await discussion.save();
        res.status(200).json(savedDiscussion);
    } catch (err) {
        res.status(406).json({ message: err });
    }

    console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});


// Save a message added to a discussion
router.post('/message/:discussionId', async (req, res) => {
        // debug the POST contents
        console.log('POST request to Robert\'s anime page, saving a message');
        console.log(req.params);
        console.log(req.body);

        const discussionId = req.params.discussionId;
        const messageContents = req.body.message;

        const message = new AnimeMessage({
            userId: 'hardcoded id, need to get from session',
            animeDiscussionId: discussionId,
            message: messageContents
        });

        try {
            const savedMessage = await message.save();
            res.status(200).json(savedMessage);
        } catch (err) {
            res.status(406).json({ message: err });
        }

        console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});


// Save an anime post to a discussion
router.post('/posts/:discussionId', async (req, res) => {
    // debug the POST contents
    console.log('POST request to Robert\'s anime page, saving an anime post');
    console.log(req.params);
    console.log(req.body);

    const discussionId = req.params.discussionId;
    const imageId = req.body.imageId;
    var url = null;
    if (req.body.url) {
        url = req.body.url;
    }

    const post = new AnimePost({
        userId: 'hardcoded id, need to get from session',
        animeDiscussionId: discussionId,
        imageId: imageId,
        url: url
    });

    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (err) {
        req.status(406).json({ message: err });
    }

    console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});


// Update some or all fields of an anime discussion, request.body must include all fields updated or not
router.put('/:discussionId', async (req, res) => {
        // debug the params
        console.log('PUT request to Robert\'s anime page');
        console.log(req.params);
        console.log(req.body);
    
        try {
            const updatedAnimeDiscussion = await AnimeDiscussion.updateOne(
                { _id: req.params.discussionId },
                { $set: {
                    title: req.body.title,
                    description: req.body.description
                }}
            );
            res.status(200).json(updatedAnimeDiscussion);
        } catch (err) {
            res.status(406).json({ message: err });
        }
    
        console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});


// Update the name of an anime discussion
router.patch('/:discussionId', async (req, res) => {
    // debug the params
    console.log('PATCH request to Robert\'s anime page');
    console.log(req.params);
    console.log(req.body);

    try {
        const updatedDiscussionName = await AnimeDiscussion.updateOne(
            { _id: req.params.discussionId },
            { $set: { title: req.body.title } }
        );
        res.status(200).json(updatedDiscussionName);
    } catch (err) {
        res.status(406).json({ message: err });
    }

    console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});


// Delete a discussion by discussionId
router.delete('/:discussionId', async (req, res) => {
    // debug the params
    console.log('DELETE request to Robert\'s anime page');
    console.log(req.params);
    console.log(req.body);

    try {
        const removedDiscussion = await AnimeDiscussion.deleteOne({ _id: req.params.discussionId });
        res.status(200).json(removedDiscussion);
    } catch (err) {
        res.status(406).json({ message: err });
    }

    console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});


module.exports = router;