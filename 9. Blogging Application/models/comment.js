// Import necessary modules
const mongoose = require("mongoose");

// Define schema
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog",
    }
}, {
    // Add timestamps for createdAt and updatedAt
    timestamps: true
});


// Create model
const Comment = mongoose.model('comments', commentSchema);


// Export the model
module.exports = Comment;