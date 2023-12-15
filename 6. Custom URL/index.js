const express = require('express');

const path = require("path")
const cookiePparser = require("cookie-parser")

const { connectToMongoDB } = require('./connect')

const { checkForAuthentication, restrictTo } = require("./middlewares/auth")

const URL = require('./models/url')

const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRoute = require("./routes/user")

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => console.log("MongoDB connected"))

// ejs engine
app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))


app.use(express.json())   // middleware
app.use(express.urlencoded({ extended: false }))
app.use(cookiePparser())
app.use(checkForAuthentication)


app.use('/url', restrictTo(["NORMAL", "ADMIN"]), urlRoute)
app.use('/user', userRoute)
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