const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();
const serverPort = process.env.PORT || 3000;

app.use(bodyParser.json());

// Import routes
const animeRoute = require('./routes/anime');
const chatsRoute = require('./routes/chats');
const gamesRoute = require('./routes/games');
const showsRoute = require('./routes/shows');

app.use('/anime', animeRoute);
app.use('/chats', chatsRoute);
app.use('/games', gamesRoute);
app.use('/shows', showsRoute);

// Middlewares
// auth??

// Main route
app.get('/', (req, res) => {
    res.send('GET request to home page');
});

// Connect to DB
mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('Database connected'))
        .catch(err => console.log(err));

// Listen for connections
app.listen(serverPort, () =>
    console.log(`Server running on port ${serverPort}`)
);