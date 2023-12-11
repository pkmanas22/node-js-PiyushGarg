// Importing required modules for the application
const http = require("http"); // HTTP module for creating an HTTP server
const fs = require('fs'); // File system module for file operations
const url = require('url'); // URL module for parsing URL strings

// Importing Express.js framework
const express = require('express');

// Simple Node.js server using the http module
function myHandler(req, res) {
    if (req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()}: ${req.url} New request received\n`;

    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    fs.appendFile("log.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case '/':
                res.end("Home page");
                break;
            case '/about':
                // res.end("About section")
                const uname = myUrl.query.name;
                res.end(`Hi! ${uname}`);
                break;
            case '/contact':
                res.end("Contact page");
                break;
            default:
                res.end("404 page not found");
                break;
        }
    });
}

// Express.js framework implementation
const app = express();

// Handling GET request for the home page
app.get('/', (req, res) => {
    return res.send("Hello from home page");
});

// Handling GET request for the about page
app.get('/about', (req, res) => {
    return res.send(`Hello ${req.query.name}`);
});

// Starting the Express.js server on port 8000
app.listen(8000, () => {
    console.log("Server started with Express.js");
});

/*const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})*/

/*
// Uncomment the code below if you want to run a simple Node.js server using the http module
// Creating an HTTP server and listening on port 8000
const myServer = http.createServer(myHandler);
myServer.listen(8000, () => console.log('Server started...'));
*/
