// Importing required modules
const express = require('express');

// Creating an Express application
const app = express();
const PORT = 8000;

// Rendering the 'home' template with URL data
app.get('/', async (req, res) => {
    return res.json({message: `Hello from server with ${process.pid}`})
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});