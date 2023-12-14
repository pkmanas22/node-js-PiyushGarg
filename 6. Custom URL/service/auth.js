// const sessionIdToUserMap = new Map()

// JSON Web Token (JWT)
const jwt = require("jsonwebtoken")
const secretKey = "Pkmanas@123$short#url"

function setUser(user) {
    // sessionIdToUserMap.set(id,user)
    const payload = {
        // ...user,
        _id : user._id,
        email : user.email,
    }

    return jwt.sign(payload, secretKey)
}

function getUser(token) {
    // return sessionIdToUserMap.get(id)

    if (!token) {
        return null;
    }

    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        console.error("Error verifying JWT:", error.message);
        return null;
    }
}


module.exports = {
    setUser,
    getUser,
}