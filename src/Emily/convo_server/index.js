// THIS FILE CONTAINS MY CODE - 23 lines
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});
const users = { // store current users in each convo
    convo1: [],
    convo2: []
};
const messages = { // store all messages sent in each convo
    convo1: [],
    convo2: [],
};

io.on("connection", (socket) => { // listen for an event to happen. on a specific socket (specific user)
    console.log(`User with ID: ${socket.id} connected!`);
    
    socket.on("joinConvo", (user) => {
        socket.join(user.convo); // join that convo
        if (!users[user.convo].includes(user.username)){ // prevent a user being listed twice
            users[user.convo].push(user.username); // add user to the list of users in that convo
        }
        io.to(user.convo).emit("joined", users, messages[user.convo]); // let convo know that user has joined
        console.log(`User: ${user.username} (${socket.id}) joined convo: ${user.convo}`);
    });  

    socket.on("sendMessage", (message) => { 
        messages[message.convo].push(message); // add to list of all messages
        socket.to(message.convo).emit("receiveMessage", message); // send to a particular convo
    });    

    socket.on("disconnect", () => {
        console.log(`User with ID: ${socket.id} disconnected!`);
    });
});

server.listen(3001, () => {
    console.log("Server running!");
});
