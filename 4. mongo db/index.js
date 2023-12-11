const express = require('express');
const mongoose = require('mongoose')

const app = express();
const PORT = 8000;

// middleware
app.use(express.urlencoded({ extended: false }))

// Connection
mongoose
    .connect('mongodb://127.0.0.1:27017/testAppPiyush')
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Mongo error" + err))

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        requrid: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        requrid: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    jobTitle: {
        type: String,
    }
}, { timestamps: true })

// Model
const User = mongoose.model("user", userSchema)

// routes
// create the user
app.post('/api/users', async (req, res) => {
    const body = req.body
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ msg: "All fields are required..." })
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })

    console.log(result);

    return res.status(201).json({ msg: "Success..." })
})

// GET /users - List all users in HTML file - HTML document render
app.get('/users', async (req, res) => {
    const allDBUsers = await User.find({})
    const html = `
        <ul>
            ${allDBUsers.map((user) => `
                    <li>${user.firstName} - ${user.email}</li>
                `).join("")}
        </ul>
    `
    res.send(html)
})

// GET /api/users - List all users in JSON file
app.get('/api/users', async (req, res) => {
    const allDBUsers = await User.find({})
    return res.json(allDBUsers)
})

// all get,patch,delete in one place
app
    .route('/api/users/:id')
    .get(async (req, res) => {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ error: "user not found" })
        }
        return res.json(user)
    })
    // PATCH /api/users/1 - Edit the user with ID 1
    .patch(async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" })
        return res.json({ status: 'success' })
    })
    // DELETE /api/users/1 - Delete the user with ID 1
    .delete(async (req, res) => {
        await User.findByIdAndDelete(req.params.id)
        return res.json({ status: 'success' })
    })

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});