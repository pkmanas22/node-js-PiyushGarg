// Importing required modules
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const { checkForAuthentication } = require('./middlewares/authentication');
const Blog = require('./models/blog');

// Creating an Express application
const app = express();
const PORT = 8000;

// Connecting to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/blogify-app')
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Configuring EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Middleware setup
app.use(express.json()); // JSON parsing middleware
app.use(express.urlencoded({ extended: false })); // Form data parsing middleware
app.use(cookieParser());
app.use(checkForAuthentication);

app.use(express.static(path.resolve('./public')));

// Rendering the 'home' template with URL data
app.get('/', async (req, res) => {
    try {
        const allBlogs = await Blog.find({});
        // console.log("User:", req.user);
        return res.render('home', {
            user: req.user,
            blogs: allBlogs,
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return res.status(500).send('Internal Server Error');
    }
});

// Define your routes
app.use('/user', userRoute);
app.use('/blog', blogRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
