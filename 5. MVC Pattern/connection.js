const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling

async function connectMongodb(url) {
    // Connecting to MongoDB database
    return mongoose.connect(url) // Connect to the specified MongoDB database
}

module.exports = {
    connectMongodb,
};