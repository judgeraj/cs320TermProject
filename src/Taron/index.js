const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');

// Express is the wrapper for all http stuff
const app = express();
const serverPort = process.env.PORT || 3000;   // If 3000 in use, process will find an available port

// Middlewares
// TODO: add function for authorization on the pages!!!!
app.use(cors());              // Allow all cors requests
app.use(bodyParser.json());   // Trust json in request bodies

// Import routes
const animeRoute = require('./routes/anime');
const chatsRoute = require('./routes/chats');
const gamesRoute = require('./routes/games');
const showsRoute = require('./routes/shows');

// Route middlewares
app.use('/anime', animeRoute);
app.use('/chats', chatsRoute);
app.use('/games', gamesRoute);
app.use('/shows', showsRoute);

// Main route, not really a home page
app.get('/', (req, res) => {
    res.send('GET request to home page');
});

// Connect to DB, NoSQL since I don't know SQL enough
mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('Database connected'))
        .catch(err => console.log(err));

// Good to go, listen for connections
app.listen(serverPort, () =>
    console.log(`Server running on port ${serverPort}`)
);