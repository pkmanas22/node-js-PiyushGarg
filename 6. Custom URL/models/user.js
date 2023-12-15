// Import necessary modules
const mongoose = require("mongoose");


// Define schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        default: "NORMAL",
    },
    password: {
        type: String,
        required: true
    },
}, {
    // Add timestamps for createdAt and updatedAt
    timestamps: true
});


// Create model
const User = mongoose.model('user', userSchema);


// Export the model
module.exports = User;