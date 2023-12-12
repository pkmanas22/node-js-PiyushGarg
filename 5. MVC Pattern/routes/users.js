const express = require('express'); // Express.js for building web applications

const {handleAllUsers, handleGetUserByID, handleUpdateUserByID, handleDeleteUserByID, handleCreateNewUser} = require("../controllers/user")

const router = express.Router();
/*
// Handling GET request to list all users in JSON format
router.get('/', handleAllUsers)
// Handling POST request to create a new user
router.post('/', handleCreateNewUser)
*/
router.route('/').get(handleAllUsers).post(handleCreateNewUser) //in one line

// Handling various operations (GET, PATCH, DELETE) for a specific user ID
router
    .route('/:id')
    .get(handleGetUserByID)  // Retrieving a specific user by ID from the MongoDB database
    .patch(handleUpdateUserByID)    // Updating a specific user's last name by ID in the MongoDB database
    .delete(handleDeleteUserByID)      // Deleting a specific user by ID from the MongoDB database


module.exports = router;