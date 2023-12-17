const JWT = require('jsonwebtoken');

const secretKey = "Pkmanas@123$Blogging#@pp";

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        role: user.role,
        profileImageUrl: user.profileImageUrl,
    };

    return JWT.sign(payload, secretKey);
}

function validateToken(token) {
    if (!token) return null;

    try {
        return JWT.verify(token, secretKey);
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error verifying JWT:", error.message);

        // Check if the error is due to token expiration
        if (error.name === 'TokenExpiredError') {
            console.error("JWT Token Expired");
            return null;
        }

        // Return null for other verification errors
        return null;
    }
}

module.exports = {
    createTokenForUser,
    validateToken,
};
