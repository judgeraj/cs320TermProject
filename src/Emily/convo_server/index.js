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

io.on("connection", (socket) => { // emit the event "connection" and listen for socket to happen
    console.log(`User with ID: ${socket.id} connected!`);

    socket.on("joinConvo", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined convo: ${data}`);
    });

    socket.on("sendMessage", (data) => {
        socket.to(data.convo).emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
        console.log(`User with ID: ${socket.id} disconnected!`);
    });
});

server.listen(3001, () => {
    console.log("Server running!");
});
