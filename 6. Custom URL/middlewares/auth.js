const { getUser } = require("../service/auth")

async function restrictToLoggedinUserOnly(req, res, next) {
    // console.log(req);
    // const userUID = req.cookies?.uid;  // cookie purpose
    
    const userUID = req.headers["Authorization"];  // authorization purpose

    if (!userUID) {
        return res.redirect('/login')
    }

    // verify the token
    const token = userUID.split("Bearer ")[1];  // Bearer {fe4df6jhfdejf}

    const user = getUser(token)

    if (!user) {
        return res.redirect('/login')
    }

    req.user = user;
    next()
}

async function checkAuth(req, res, next) {
    // const userUID = req.cookies?.uid;

    const userUID = req.headers["authorization"];  // authorization purpose

    // verify the token
    const token = userUID.split("Bearer ")[1];  // Bearer {fe4df6jhfdejf}

    // const user = getUser(userUID)

    const user = getUser(token)

    req.user = user;
    next()
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
}