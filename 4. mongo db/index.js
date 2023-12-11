// Importing required modules for the application
const express = require('express'); // Express.js for building web applications
const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling

// Initializing Express application
const app = express();
const PORT = 8000; // Setting the port for the server to listen on

// Middleware configuration for handling URL-encoded data
app.use(express.urlencoded({ extended: false }))

// Connecting to MongoDB database
mongoose
    .connect('mongodb://127.0.0.1:27017/testAppPiyush') // Connect to the specified MongoDB database
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Mongo error" + err))

// Defining the schema for the user data in MongoDB
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    jobTitle: {
        type: String,
    }
}, { timestamps: true })

// Creating a model based on the defined schema
const User = mongoose.model("user", userSchema)

// Handling POST request to create a new user
app.post('/api/users', async (req, res) => {
    const body = req.body
    // Validating that all required fields are present in the request body
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

    // Creating a new user in the MongoDB database
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

// Handling GET request to list all users in an HTML file
app.get('/users', async (req, res) => {
    // Retrieving all users from the MongoDB database
    const allDBUsers = await User.find({})
    // Creating an HTML document with a list of users
    const html = `
        <ul>
            ${allDBUsers.map((user) => `
                    <li>${user.firstName} - ${user.email}</li>
                `).join("")}
        </ul>
    `
    res.send(html)
})

// Handling GET request to list all users in JSON format
app.get('/api/users', async (req, res) => {
    // Retrieving all users from the MongoDB database
    const allDBUsers = await User.find({})
    return res.json(allDBUsers)
})

// Handling various operations (GET, PATCH, DELETE) for a specific user ID
app
    .route('/api/users/:id')
    .get(async (req, res) => {
        // Retrieving a specific user by ID from the MongoDB database
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ error: "user not found" })
        }
        return res.json(user)
    })
    .patch(async (req, res) => {
        // Updating a specific user's last name by ID in the MongoDB database
        await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" })
        return res.json({ status: 'success' })
    })
    .delete(async (req, res) => {
        // Deleting a specific user by ID from the MongoDB database
        await User.findByIdAndDelete(req.params.id)
        return res.json({ status: 'success' })
    })

// Starting the server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
