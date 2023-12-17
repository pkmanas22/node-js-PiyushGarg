// Import necessary modules
const mongoose = require("mongoose");


// Define schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImageUrl: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
}, {
    // Add timestamps for createdAt and updatedAt
    timestamps: true
});


// Create model
const Blog = mongoose.model('blogs', blogSchema);


// Export the model
module.exports = Blog;