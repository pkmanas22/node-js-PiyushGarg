// Importing the getUser function from the auth service
const { getUser } = require("../service/auth")

// Authentication middleware
function checkForAuthentication(req, res, next) {
    // Retrieving the token from the "token" cookie
    const tokenCookie = req.cookies?.token;

    /*const user = getUser(authorizationHeaderValue)
    const authorizationHeaderValue = req.headers["authorization"];  // header purpose
    if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer ")) {
       return next()
    }
    const token = authorizationHeaderValue.split("Bearer ")[1];  // Bearer {fe4df6jhfdejf}*/

    // Setting the user on the request object to null initially
    req.user = null;

    // If no token is found in the cookie, continue to the next middleware
    if (!tokenCookie) return next();


    // Verify the token using the getUser function
    const user = getUser(tokenCookie);

    // Setting the user on the request object if authentication is successful
    req.user = user;

    // Continue to the next middleware
    return next();
}

// Authorization middleware
function restrictTo(roles = []) {
    return function (req, res, next) {
        // Redirecting to the login page if no user is found
        if (!req.user) {
            return res.redirect("/login");
        }

        // Checking if the user's role is included in the allowed roles
        if (!roles.includes(req.user.role)) {
            // Sending an "Unauthorized" response if the role is not allowed
            return res.status(403).end("Unauthorized");
        }

        // Continue to the next middleware if authorization is successful
        return next();
    };
}

// Exporting the middleware functions for use in other parts of the application
module.exports = {
    checkForAuthentication,
    restrictTo,
};
