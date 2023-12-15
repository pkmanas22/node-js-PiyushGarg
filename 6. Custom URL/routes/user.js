// Importing the Express framework
const express = require('express')

// Importing user-related controllers
const { handleUserSignup, handleUserLogin } = require("../controllers/user")

// Creating an Express router
const router = express.Router()

// Route to handle user signup through a POST request
router.post('/', handleUserSignup)

// Route to handle user login through a POST request
router.post('/login', handleUserLogin)

// Exporting the router for use in other parts of the application
module.exports = router;
