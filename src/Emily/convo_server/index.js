// THIS FILE CONTAINS MY CODE
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

io.on("connection", (socket) => { // listen for an event to happen. on a specific socket (specific user)
    console.log(`User with ID: ${socket.id} connected!`);
    
    socket.on("joinConvo", (data) => { // data is convo
        socket.join(data); // join that convo
        console.log(`User with ID: ${socket.id} joined convo: ${data}`);
    });  

    socket.on("sendMessage", (data) => {
        socket.to(data.convo).emit("receiveMessage", data); // send to a particular convo
    });    

    socket.on("disconnect", () => {
        console.log(`User with ID: ${socket.id} disconnected!`);
    });
});

server.listen(3001, () => {
    console.log("Server running!");
});
