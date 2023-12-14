const express = require('express');

const path = require("path")

const { connectToMongoDB } = require('./connect')

const urlRoute = require('./routes/url')

const staticRoute = require('./routes/staticRouter')

const URL = require('./models/url')

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => console.log("MongoDB connected"))

// ejs engine
app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))


app.use(express.json())   // middleware
app.use(express.urlencoded({ extended: false }))


app.use('/url', urlRoute)

app.use('/', staticRoute)


app.get('/url/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  }, {
    $push: {
      visitHistory: {
        timestamp: Date.now()
      }
    },
  })

  res.redirect(entry.redirectUrl)
})


// Server side rendering
app.get('/test', async (req, res) => {
  const allUrls = await URL.find({});
  /*
  return res.end(`
    <html>
      <head></head>
      <body>
        <ol>
          ${allUrls.map(
            (url) => `<li>${url.shortId} - ${url.redirectUrl} - ${url.visitHistory.length} </li>`
          ).join('')}
        </ol>
      </body>
    </html>
  `)
  */

  return res.render('home', { urls: allUrls })
})



// Start the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});