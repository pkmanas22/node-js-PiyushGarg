const JWT = require('jsonwebtoken')

const secretKey = "Pkmanas@123$Blogging#@pp"

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        role: user.role,
        profileImageUrl: user.profileImageUrl,
    }

    return JWT.sign(payload, secretKey)
}

function validateToken(token) {
    if(!token) return null;

    try {
        return JWT.verify(token, secretKey)
    } catch (error) {
        console.error("Error verifying JWT:", error.message);
        return null
    }
}

module.exports = {
    createTokenForUser,
    validateToken,
}