// Import necessary modules
const mongoose = require("mongoose");
const { createHash, randomBytes } = require('crypto');
const { createTokenForUser } = require("../services/authentication");

// Define schema for User
const UserSchema = new mongoose.Schema({
    // Full name of the user
    fullName: {
        type: String,
        required: true
    },
    // Email of the user (unique)
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Salt for password hashing
    salt: {
        type: String,
    },
    // Hashed password
    password: {
        type: String,
        required: true,
    },
    // URL for the user's profile image
    profileImageUrl: {
        type: String,
        default: '/images/default.png'
    },
    // Role of the user (USER or ADMIN)
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
}, {
    // Add timestamps for createdAt and updatedAt
    timestamps: true
});

// Pre-save hook to hash the password and generate a salt
UserSchema.pre("save", function (next) {
    try {
        const user = this;

        // If the password is not modified, proceed to the next middleware
        if (!user.isModified("password")) return next();

        // Generate a random salt
        const salt = randomBytes(16).toString();

        // Hash the password using the salt
        const hashedPassword = createHash('sha256', salt)
            .update(user.password)
            .digest('hex')

        // Update the user's salt and password fields
        user.salt = salt;
        user.password = hashedPassword;

        next();
    } catch (error) {
        // Pass the error to the next middleware or route
        next(error);
    }
});

// Static method to match the password and generate a token for the user
UserSchema.static('matchPasswordAndGenerateToken', async function (email, password) {
    try {
        const user = await this.findOne({ email });
        if (!user) {
            // If user not found, create a custom error and pass it to the next middleware or route
            const notFoundError = new Error("User not found");
            notFoundError.status = 404;
            throw notFoundError;
        }

        const salt = user.salt;
        const hashedPassword = user.password;

        // Hash the provided password using the user's salt
        const userProvidedHash = createHash('sha256', salt)
            .update(password)
            .digest('hex')

        // Compare the hashed passwords
        if (hashedPassword !== userProvidedHash) {
            // If incorrect password, create a custom error and pass it to the next middleware or route
            const incorrectPasswordError = new Error("Incorrect Password");
            incorrectPasswordError.status = 401;
            throw incorrectPasswordError;
        }

        // Generate a token for the user
        const token = createTokenForUser(user);
        return token;
    } catch (error) {
        // Pass the error to the next middleware or route
        throw error;
    }
});

// Create User model
const User = mongoose.model('user', UserSchema);

// Export the User model
module.exports = User;
