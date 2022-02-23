const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const animeRoute = require('./routes/anime');
const chatsRoute = require('./routes/chats');
const gamesRoute = require('./routes/games');
const showsRoute = require('./routes/shows');

// Express is the wrapper for all http stuffz
const app = express();
const serverPort = 3000;   // Use 300 if no port set in env vars (process.env.PORT, 2020)

// Get the database connection string from unpublished .env
dotenv.config();

// Middlewares
app.use(cors());           // Allow all cors requests
app.use(express.json());   // Use the built-in body parser to parse json

// Route middlewares
app.use('/anime', animeRoute);
app.use('/chats', chatsRoute);
app.use('/games', gamesRoute);
app.use('/shows', showsRoute);

// Main route, not really a home page
app.get('/', (req, res) => {
    res.send('GET request to home page');
});

// Connect to DB, NoSQL since I no SQL
mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('Database connected'))
        .catch(err => console.log(err));

// Good to go, listen for connections
app.listen(serverPort, () =>
    console.log(`Server running on port ${serverPort}`)
);