// Importing the Mongoose library
const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
    // User's full name
    name: {
        type: String,
        required: true
    },
    // User's email address (unique)
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // User's role (default is "NORMAL")
    role: {
        type: String,
        required: true,
        default: "NORMAL",
    },
    // User's password
    password: {
        type: String,
        required: true
    },
}, {
    // Adding timestamps for createdAt and updatedAt
    timestamps: true
});

// Creating a model named 'User' based on the defined schema
const User = mongoose.model('user', userSchema);

// Exporting the User model for use in other parts of the application
module.exports = User;
