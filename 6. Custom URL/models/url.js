// Import necessary modules
const mongoose = require("mongoose");


// Define schema
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [
        {
            timestamp: { type: Number }
        }
    ],
    createdBY: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
}, {
    // Add timestamps for createdAt and updatedAt
    timestamps: true
});


// Create model
const URL = mongoose.model('url', urlSchema);


// Export the model
module.exports = URL;