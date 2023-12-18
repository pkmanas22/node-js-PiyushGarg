// Importing required modules
const path = require('path');
const express = require('express');
const fs = require('fs');
const zlib = require('zlib');
const status = require('express-status-monitor');

// Creating an Express application
const app = express();
const PORT = 8000;

app.use(status())

// Stream read (sample.txt)  -> zipper --> fs write stream
fs.createReadStream('./sample.txt').pipe(zlib.createGzip().pipe(fs.createWriteStream('./sample.zip')))

// Rendering the 'home' template with URL data
app.get('/', async (req, res) => {
    // fs.readFile("./sample.txt", (err, data) => {
    //     res.end(data)
    // })
    
    // Streaming the contents of 'sample.txt' to the response
    const stream = fs.createReadStream('./sample.txt', "utf-8")
    stream.on("data", (chunk) => {
        res.write(chunk)
    })
    stream.on("end", () => {
        res.end()
    })
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
