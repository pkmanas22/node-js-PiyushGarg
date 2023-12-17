// Import
const { validateToken } = require("../services/authentication");

// Middleware: Check Authentication
async function checkForAuthentication(req, res, next) {
    try {
        // Extract Token from Cookies
        const tokenCookie = req.cookies?.token;

        // Initialize User Property
        req.user = null;

        // No Token: Continue to Next Middleware or Route
        if (!tokenCookie) return next();

        // Validate Token
        const user = await validateToken(tokenCookie);

        // Set User Property on Successful Validation
        req.user = user;

        // Continue to Next Middleware or Route
        return next();
    } catch (error) {
        // Error during Token Validation
        console.error("Error during token validation:", error);

        // Optionally, render an error page or provide an error response to the client
        return res.status(401).render('error', {
            message: 'Unauthorized',
            error: 'Authentication failed',
        });

        // If you prefer to send a JSON response:
        // return res.status(401).json({ error: 'Authentication failed' });
    }
}

// Export Middleware
module.exports = {
    checkForAuthentication,
};
