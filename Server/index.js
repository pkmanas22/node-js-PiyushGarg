const http = require("http");
const fs = require('fs');
const url = require('url')

// express.js
const express = require('express')


// simple node js
function myHandler(req,res) {
    if (req.url === '/favicon.ico') return res.end()
    const log = `${Date.now()}: ${req.url} New request received\n`;

    const myUrl = url.parse(req.url,true)
    console.log(myUrl);

    fs.appendFile("log.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case '/':
                res.end("Home page")
                break;
            case '/about':
                // res.end("About section")
                const uname = myUrl.query.name
                res.end(`Hi! ${uname}`)
                break;
            case '/contact':
                res.end("Contact page")
                break;
            default:
                res.end("404 page not found")
                break;
        }
    })
}



// express.js framework
const app = express();
app.get('/',(req,res) => {
    return res.send("Hello from home page")
})

app.get('/about',(req,res) => {
    return res.send(`Hello ${req.query.name}`)
})

app.listen(8000, ()=> {
    console.log("Server started with express");
})

/*const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})*/


// server
// const myServer = http.createServer(app);

// myServer.listen(8000, () => console.log('server started...'))