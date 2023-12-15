const { getUser } = require("../service/auth")

// Authentication
function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
    // const user = getUser(authorizationHeaderValue)

    // const authorizationHeaderValue = req.headers["authorization"];  // header purpose

    req.user = null;

    /*if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer ")) {
        return next()
    }*/
    
    if (!tokenCookie)   return next()

    // verify the token
    // const token = authorizationHeaderValue.split("Bearer ")[1];  // Bearer {fe4df6jhfdejf}
    const token = tokenCookie

    const user = getUser(token)
    req.user = user;

    return next();
}

// Authorization
function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) {
            return res.redirect("/login")
        }

        if (!roles.includes(req.user.role)) {
            return res.end("Unauthorized")
        }

        return next()
    }
}


module.exports = {
    checkForAuthentication,
    restrictTo,
}