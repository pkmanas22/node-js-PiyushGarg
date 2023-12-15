// const sessionIdToUserMap = new Map() //using map

// Importing the JSON Web Token (JWT) library
const jwt = require("jsonwebtoken")

// Secret key used for JWT signing and verification
const secretKey = "Pkmanas@123$short#url"

// Function to create a JWT token based on user information
function setUser(user) {
    // sessionIdToUserMap.set(id,user)  //using map
    // Creating a payload containing essential user information
    const payload = {
        // ...user,  // for all user data
        _id: user._id,
        email: user.email,
        role: user.role,
    }

    // Signing the payload with the secret key to generate a JWT token
    return jwt.sign(payload, secretKey)
}

// Function to extract user information from a JWT token
function getUser(token) {
    // return sessionIdToUserMap.get(id)     //using map
    
    // Checking if the token is not provided
    if (!token) {
        return null;
    }

    try {
        // Verifying the token and extracting the user information from the payload
        return jwt.verify(token, secretKey);
    } catch (error) {
        // Handling errors during JWT verification
        console.error("Error verifying JWT:", error.message);
        return null;
    }
}

// Exporting the setUser and getUser functions for external use
module.exports = {
    setUser,
    getUser,
}
