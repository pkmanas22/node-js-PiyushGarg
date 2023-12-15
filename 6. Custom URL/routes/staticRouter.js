// Importing the Express framework
const express = require('express')

// Creating an Express router
const router = express.Router()

// Importing middleware for role-based access control
const { restrictTo } = require("../middlewares/auth")

// Importing the URL model
const URL = require('../models/url')

// Route to display all URLs for admin users
router.get('/admin/urls', restrictTo(["ADMIN"]), async (req, res) => {
    // Retrieving all URLs from the database
    const allUrls = await URL.find({});

    // Rendering the 'home' template with the retrieved URLs
    return res.render('home', {
        urls: allUrls
    })
})

// Route to display URLs for normal and admin users
router.get('/', restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    // Retrieving URLs created by the logged-in user
    const allUrls = await URL.find({ createdBY: req.user._id });

    // Rendering the 'home' template with the retrieved URLs
    return res.render('home', {
        urls: allUrls
    })
})

// Route to render the signup page
router.get('/signup', (req, res) => {
    return res.render('signup')
})

// Route to render the login page
router.get('/login', (req, res) => {
    return res.render('login')
})

// Exporting the router for use in other parts of the application
module.exports = router;
