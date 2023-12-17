const { Router } = require('express');
const User = require('../models/users')

const router = Router();

router.get('/signin', (req, res) => {
    return res.render('signin')
})

router.get('/signup', (req, res) => {
    return res.render('signup')
})

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.render("signup", {
                error: "Email address is already registered. Please use a different email."
            })
        }

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
        })
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await User.matchPasswordAndGenerateToken(email, password)
        // console.log(token);

        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("signin", {
            error: "incorrect Email Id or password"
        })
    }
});

router.get('/logout', async(req, res) => {
    res.clearCookie("token").redirect("/user/signin")
})

module.exports = router;