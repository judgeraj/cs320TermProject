// index.js - 60 lines + 6 doc comments
// Server
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");
const {use} = require("express");
app.use(cors());
const server = http.createServer(app); // set up a server
const io = new Server(server, { 
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
    maxHttpBufferSize: 10e7 // max size for the image
});
const convos = []; // store list of convos
let allUsers = []; // to hold all users and their corresponding socket id
const convoUsers = { // store current users in each convo
    general: [], // created some convos beforehand to test
    music: []
};
const messages = { // store all messages sent in each convo
    general: [],
    music: [],
}; 
let fullConvos = []; // store all convos that are full

/* function to start up the server. once a user is connected
   to the server, its added to an array containing all users.
   the server then sends out an updated list of all convos.
   the server let's other users know when someone joins a convo,
   sends a message, or leaves, so that their corresponding arrays
   are updated to show the latest status. */
function startServer() {
    io.on("connection", (socket) => { // listen for an event to happen on a specific socket (specific user)
        console.log(`User with ID: ${socket.id} connected!`);
        allUsers.push(socket.id); // add to list of current users
        //io.emit("getConvos", convos); // attempt to send list of convos that exist
        
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

        socket.on("availability", (convo, open) => { // when availability is changed,
            socket.to(convo).emit("changeAvailability", convo, open); // let particular convo know if its open or not
            if (open){ // if convo is now open
                fullConvos = fullConvos.filter(x => x != convo); // remove from list of convos that are full
            } else {
                fullConvos.push(convo); // add to the list of convos that cannot be joined
            }
            console.log(fullConvos);
        });

        socket.on("updateLikes", (convo, id) => { // when a like has been added to a message,
            console.log(messages[convo]);
        }); 
        
        socket.on("removeUser", (users, convo) => { // attempt to remove user
            socket.to(convo).emit("updateUsers", users); // let convo know that user has left a convo
        });

        socket.on("disconnect", (user) => { // when a user disconnects,
            allUsers = allUsers.filter(x => x != socket.id); // remove the username once they leave
            //socket.emit("disconnect", user); // attempt to let all users know user disconnecting needs to be removed
            console.log(`User with ID: ${socket.id} disconnected!`);
        });
    });
}

server.listen(3001, () => {
    console.log("Server running!");
});

startServer();
