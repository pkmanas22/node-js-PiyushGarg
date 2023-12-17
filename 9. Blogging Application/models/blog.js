// Import necessary modules
const mongoose = require("mongoose");

// Define schema
const blogSchema = new mongoose.Schema({
    // Title of the blog post
    title: {
        type: String,
        required: true
    },
    // Body content of the blog post
    body: {
        type: String,
        required: true
    },
    // URL for the cover image of the blog post
    coverImageUrl: {
        type: String,
    },
    // Reference to the user who created the blog post
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
