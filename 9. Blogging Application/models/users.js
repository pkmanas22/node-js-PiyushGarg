// Import necessary modules
const mongoose = require("mongoose");
const { createHash, randomBytes} = require('crypto');

// Define schema
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String,
        default: '/images/default.png'
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
}, {
    // Add timestamps for createdAt and updatedAt
    timestamps: true
});

UserSchema.pre("save", function (next) {
    const User = this;

    if (!User.isModified("password")) return;

    const salt = randomBytes(16).toString();

    const hashedPassword = createHash('sha256',salt)
        .update(User.password)
        .digest('hex')

    this.salt = salt;
    this.password = hashedPassword;
    next()
})

UserSchema.static('matchPassword', async function (email, password) {
    const user = await this.findOne({ email })
    if(!user) throw new Error("User not found")

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHash('sha256',salt)
        .update(password)
        .digest('hex')

    if (hashedPassword !== userProvidedHash) {
        throw new Error("Incorrect Password")
    }

    return {user, password: undefined, salt: undefined}
})

// Create model
const User = mongoose.model('user', UserSchema);


// Export the model
module.exports = User;