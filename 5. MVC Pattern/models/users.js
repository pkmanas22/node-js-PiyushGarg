const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling

// Defining the schema for the user data in MongoDB
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    jobTitle: {
        type: String,
    }
}, { timestamps: true })

// Creating a model based on the defined schema
const User = mongoose.model("user", userSchema)

module.exports = User;