// Importing required modules for the application
const express = require('express'); // Express.js for building web applications

const { connectMongodb } = require("./connection")

// const {} = require("./middlewares/index")
const { logReqRes } = require("./middlewares") // by default takes index file

const userRouter = require("./routes/users")

// Initializing Express application
const app = express();
const PORT = 8000; // Setting the port for the server to listen on

// connection
connectMongodb('mongodb://127.0.0.1:27017/testAppPiyush')
.then(console.log("MongoDB connected"))

// Middleware configuration for handling URL-encoded data
app.use(express.urlencoded({ extended: false }))
app.use(logReqRes("log.txt"))

// Routers
app.use("/api/users", userRouter);


// Starting the server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
