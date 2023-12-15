const User = require("../models/user")
const { v4: uuidv4 } = require("uuid")
const { setUser, getUser } = require("../service/auth");
const { use } = require("../routes/user");

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    })
    return res.redirect("/")
}

async function handleUserLogin(req, res) {
    // console.log(req);
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password })

        console.log("User query:", { email, password });
        console.log("Database response:", user);

        if (!user) {
            console.log("User not found");
            return res.render("login", { error: "Invalid Username or password" });
        }
        /*const sessionId = uuidv4()*/

        // res.cookie("uid", token)
        /*
        With specific domain
        res.cookie("uid", token, {
            domain: ".piyushgarg.dev"  // www.piyushgarg.dev (or) blog.piyushgarg.dev, etc...
        })*/
        // return res.redirect("/")

        const token = setUser(user);
        // console.log(token);
        return res.json({ token });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}