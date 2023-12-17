const { Router } = require('express');
const User = require('../models/users');

const router = Router();

// Render the sign-in page
router.get('/signin', (req, res) => {
    return res.render('signin');
});

// Render the sign-up page
router.get('/signup', (req, res) => {
    return res.render('signup');
});

// Handle sign-up form submission
router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.render("signup", {
                error: "Email address is already registered. Please use a different email."
            });
        }

        // Create a new user
        await User.create({
            fullName,
            email,
            password,
        });

        return res.redirect("/user/signin");
    } catch (error) {
        console.error("Error creating user: ", error);
        return res.render("signup", {
            error: "An error occurred while creating your account. Please try again."
        });
    }
});

// Handle sign-in form submission
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Attempt to authenticate the user and generate a token
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("signin", {
            error
        });
    }
});

// Log out the user by clearing the token cookie
router.get('/logout', async(req, res) => {
    res.clearCookie("token").redirect("/user/signin");
});

module.exports = router;
