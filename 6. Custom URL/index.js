// Importing required modules
const express = require('express');
const path = require("path")
const cookieParser = require("cookie-parser")

// Custom module for MongoDB connection
const { connectToMongoDB } = require('./connect')

// Middleware functions for authentication
const { checkForAuthentication, restrictTo } = require("./middlewares/auth")

// Model for URL schema
const URL = require('./models/url')

// Route handlers
const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRoute = require("./routes/user")

// Creating an Express application
const app = express();
const PORT = 8001;

// Connecting to MongoDB
connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => console.log("MongoDB connected"))

// Configuring EJS view engine
app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))

// Middleware setup
app.use(express.json())   // JSON parsing middleware
app.use(express.urlencoded({ extended: false })) // Form data parsing middleware
app.use(cookieParser()) // Cookie parsing middleware
app.use(checkForAuthentication) // Custom authentication middleware

// URL-related routes with authentication restriction
app.use('/url', restrictTo(["NORMAL", "ADMIN"]), urlRoute)

// User-related routes
app.use('/user', userRoute)

// Static routes
app.use('/', staticRoute)

// Handling redirection for short URLs
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

// Server side rendering for testing
app.get('/test', async (req, res) => {
  const allUrls = await URL.find({});
  /* --> for testing purpose
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
  
  // Rendering the 'home' template with URL data
  return res.render('home', { urls: allUrls })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
