const http = require("http");
const fs = require('fs');
const url = require('url')

const myServer = http.createServer((req, res) => {
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
});

myServer.listen(8000, () => console.log('server started...'))