// Importing the Mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Function to establish a connection to MongoDB
async function connectToMongoDB(url) {
    // Connecting to the MongoDB database using the provided URL
    return mongoose.connect(url)
}

// Exporting the connectToMongoDB function for external use
module.exports = {
    connectToMongoDB,
}
