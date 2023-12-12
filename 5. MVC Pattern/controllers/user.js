const User = require("../models/users")

async function handleAllUsers(req, res) {
    // Retrieving all users from the MongoDB database
    const allDBUsers = await User.find({})
    return res.json(allDBUsers)
}

async function handleGetUserByID(req,res) {
    // Retrieving a specific user by ID from the MongoDB database
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ error: "user not found" })
    }
    return res.json(user)
}

async function handleUpdateUserByID(req,res) {
    // Updating a specific user's last name by ID in the MongoDB database
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" })
    return res.json({ status: 'success' })
}

async function handleDeleteUserByID(req,res) {
    // Deleting a specific user by ID from the MongoDB database
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: 'success' })
}

async function handleCreateNewUser(req,res) {
    // Handling POST request to create a new user
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

    return res.status(201).json({ msg: "Success..." , id: result._id})
}

module.exports = {
    handleAllUsers,
    handleGetUserByID,
    handleUpdateUserByID,
    handleDeleteUserByID,
    handleCreateNewUser
}