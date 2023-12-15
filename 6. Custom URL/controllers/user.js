// Importing the User model
const User = require("../models/user")

// Importing necessary modules for generating UUID and handling authentication
const { v4: uuidv4 } = require("uuid")
const { setUser, getUser } = require("../service/auth");

// Handler function for user signup
async function handleUserSignup(req, res) {
    // Extracting user information from the request body
    const { name, email, password } = req.body;

    // Creating a new user in the database
    await User.create({
        name,
        email,
        password,
    })

    // Redirecting to the home page after successful signup
    return res.redirect("/")
}

// Handler function for user login
async function handleUserLogin(req, res) {

    // console.log(req);
    try {
        // Extracting email and password from the request body
        const { email, password } = req.body;

        // Querying the database to find a user with the provided email and password
        const user = await User.findOne({ email, password })

        // console.log("User query:", { email, password });
        // console.log("Database response:", user);


        // Handling the case when the user is not found
        if (!user) {
            console.log("User not found");
            return res.render("login", { error: "Invalid Username or password" });
        }

        // Generating a JWT token for the authenticated user
        const token = setUser(user);
        // console.log(token);

        /*const sessionId = uuidv4()
        With specific domain
        res.cookie("uid", token, {
            domain: ".piyushgarg.dev"  // www.piyushgarg.dev (or) blog.piyushgarg.dev, etc...
        })
        return res.json({ token });*/

        // Setting the token as a cookie in the response
        res.cookie("token", token)

        // Redirecting to the home page after successful login
        return res.redirect("/")
        
    } catch (error) {
        // Handling errors during the login process
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Exporting the handler functions for use in other parts of the application
module.exports = {
    handleUserSignup,
    handleUserLogin,
}
