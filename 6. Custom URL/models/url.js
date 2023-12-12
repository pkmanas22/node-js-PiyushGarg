// Import necessary modules
const mongoose = require("mongoose");


// Define schema
const urlSchema = mongoose.Schema({
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
}, {
    // Add timestamps for createdAt and updatedAt
    timestamps: true
});


// Create model
const url = mongoose.model('url', urlSchema);


// Export the model
module.exports = url;