// Importing the Mongoose library
const mongoose = require("mongoose");

// Define the URL schema
const urlSchema = new mongoose.Schema({
    // Unique identifier for the short URL
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    // The original URL to redirect to
    redirectUrl: {
        type: String,
        required: true,
    },
    // Array to store the visit history with timestamps
    visitHistory: [
        {
            timestamp: { type: Number }
        }
    ],
    // Reference to the user who created the short URL
    createdBY: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
}, {
    // Adding timestamps for createdAt and updatedAt
    timestamps: true
});

// Creating a model named 'URL' based on the defined schema
const URL = mongoose.model('url', urlSchema);

// Exporting the URL model for use in other parts of the application
module.exports = URL;
