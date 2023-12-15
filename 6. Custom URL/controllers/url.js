// Importing the short-id library
const shortid = require("short-id");

// Importing the URL model
const URL = require("../models/url")

// Handler function for generating a new short URL
async function handleGenerateNewShortURL(req, res) {
    // Extracting the URL from the request body
    const body = req.body;
    // console.log(body);

    // Checking if the URL is provided in the request body
    if (!body.url) {
        return res.status(400).json({ error: "URL is required" })
    }

    // Generating a short ID using the short-id library
    const shortId = shortid.generate();

    // Creating a new URL entry in the database
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBY: req.user._id,
    })

    // return res.json({ id: shortId })
    
    // Rendering the 'home' template with the generated short ID
    return res.render('home', { id: shortId })
}

// Handler function for getting analytics for a short URL
async function handleGetAnalytics(req, res) {
    // Extracting the short ID from the request parameters
    const shortId = req.params.shortId;

    // Retrieving the URL entry from the database based on the short ID
    const result = await URL.findOne({ shortId })

    // Sending JSON response with total clicks and visit history
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory })
}

// Exporting the handler functions for use in other parts of the application
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}
