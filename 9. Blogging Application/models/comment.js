// Import necessary modules
const mongoose = require("mongoose");

// Define schema for comments
const commentSchema = new mongoose.Schema({
    // Content of the comment
    content: {
        type: String,
        required: true,
    },
    // Reference to the user who created the comment
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    // Reference to the blog post associated with the comment
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog",
    }
}, {
    // Add timestamps for createdAt and updatedAt
    timestamps: true
});

// Create model for comments
const Comment = mongoose.model('comments', commentSchema);

// Export the comment model
module.exports = Comment;
