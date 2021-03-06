// index.js - 45 lines
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { use } = require("express/lib/application");
app.use(cors());
const server = http.createServer(app); // set up a server
const io = new Server(server, { 
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});
const convos = ["general", "music"]; // store list of convos
let allUsers = []; // to hold all users and their corresponding socket id
const convoUsers = { // store current users in each convo
    general: [],
    music: []
};
const messages = { // store all messages sent in each convo
    general: [],
    music: [],
};

function startServer() {
    io.on("connection", (socket) => { // listen for an event to happen on a specific socket (specific user)
        console.log(`User with ID: ${socket.id} connected!`);
        allUsers.push(socket.id); // add to list of current users
        
        socket.on("joinConvo", (user) => {
            socket.join(user.convo); // join convo that the user requests
            if (!convoUsers[user.convo]) { // add convo to list of convos, users, and messages if it isn't added yet
                convos.push(user.convo);
                convoUsers[user.convo] = [];
                messages[user.convo] = [];
            }
            io.emit("getConvos", convos); // update the users on list of convos that exist
            if (!convoUsers[user.convo].includes(user.username)) { // prevent a user being listed twice
                convoUsers[user.convo].push(user.username); // add user to the list of users in that convo
            }
            io.to(user.convo).emit("joined", convoUsers[user.convo], messages[user.convo]); // let convo know that user has joined
            console.log(`User: ${user.username} (${socket.id}) joined convo: ${user.convo}`);
            console.log(allUsers);
        });  

        socket.on("sendMessage", (message) => { // when a message is being sent,
            messages[message.convo].push(message); // add it to list of all messages
            socket.to(message.convo).emit("receiveMessage", message); // send to a particular convo
        });

        socket.on("disconnect", () => { // when a user disconnects,
            allUsers = allUsers.filter(x => x != socket.id); // remove the username once they leave
            console.log(`User with ID: ${socket.id} disconnected!`);
        });
    });
}

server.listen(3001, () => {
    console.log("Server running!");
});

startServer();
