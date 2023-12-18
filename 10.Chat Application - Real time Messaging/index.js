// Importing required modules
const path = require('path');
const http = require("http");
const express = require('express');
const { Server } = require("socket.io")


const app = express();
const myServer = http.createServer(app)
const io = new Server(myServer)

// socket.io
io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
        // console.log("A new user message: ", message);
        io.emit("message", message)
    })
})

// Define your routes and middleware here
app.use(express.static(path.resolve("./public")))

app.get('/', (req, res) => {
    res.sendFile('/public/index.html')
})

// create and Start the server
myServer.listen(9000, () => {
    console.log(`Server started at http://localhost:9000`);
});