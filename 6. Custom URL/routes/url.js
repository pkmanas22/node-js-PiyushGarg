// Importing the Express framework
const express = require('express')

// Importing URL-related controllers
const { handleGenerateNewShortURL, handleGetAnalytics } = require("../controllers/url")

// Creating an Express router
const router = express.Router()

// Route to handle the generation of a new short URL
router.post('/', handleGenerateNewShortURL)

// Route to handle getting analytics for a short URL
router.get('/analytics/:shortId', handleGetAnalytics)

// Exporting the router for use in other parts of the application
module.exports = router;
