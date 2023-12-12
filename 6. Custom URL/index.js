const express = require('express');

const { connectToMongoDB } = require('./connect')

const urlRoute = require('./routes/url')

const URL = require('./models/url')

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(console.log("monogDB connected"))


app.use(express.urlencoded({ extended: false }))
app.use(express.json())   // middleware


app.use('/url', urlRoute)

app.get('/:shortId', async (req, res) => {
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


// Start the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});