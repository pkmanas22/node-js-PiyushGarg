const { validateToken } = require("../services/authentication")

function checkForAuthentication(req, res,next) {
    const tokenCookie = req.cookies?.token;

    req.user = null;

    if(!tokenCookie) return next();

    try {
        const user = validateToken(tokenCookie);
        req.user = user;
    } catch (error) {
        next()
    }
    return next()
}

module.exports = {
    checkForAuthentication
}