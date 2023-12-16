// Importing required modules
const path = require('path');
const express = require('express');
const userRoute = require('./routes/user')
const mongoose = require("mongoose")

// Creating an Express application
const app = express();
const PORT = 8000;

// Connecting to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/blogify-app')
    .then(() => console.log("MongoDB connected"))

// Configuring EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Middleware setup
app.use(express.json()); // JSON parsing middleware
app.use(express.urlencoded({ extended: false })) // Form data parsing middleware

// Define your routes and middleware here

// Rendering the 'home' template with URL data
app.get('/', async (req, res) => {
    return res.render('home');
});

app.use('/user', userRoute)

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});