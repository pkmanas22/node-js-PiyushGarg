// Importing required modules for the application
const express = require('express'); // Express.js for building web applications
const users = require('./MOCK_DATA.json'); // Sample user data from a JSON file
const fs = require('fs'); // File system module for file operations

// Initializing Express application
const app = express();
const PORT = 8000; // Setting the port for the server to listen on

// Middleware configuration for handling URL-encoded data
app.use(express.urlencoded({ extended: false }))

// HTML document render route to list all users
app.get('/users', (req, res) => {
    // Creating an HTML document with a list of user names
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `
    res.send(html)
})

// REST API routes

// GET /api/users - List all users in JSON format
app.get('/api/users', (req, res) => {
    return res.json(users)
})

// POST /api/users - Create a new user
app.post('/api/users', (req, res) => {
     // TODO: create new user
    const body = req.body
    // console.log(body);
    users.push({ ...body, id: users.length + 1 })
    // Writing updated user data to the JSON file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.status(201).json({ status: `success`, id: users.length })
    })
})


/*
// GET /api/users/1 - Get the user with ID 1
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    return res.json(user)
})


// PATCH /api/users/1 - Edit the user with ID 1
app.patch('/api/users:id', (req,res) => {
    // TODO: edit the user with id 
    return res.json({status:'pending'})
})


// DELETE /api/users/1 - Delete the user with ID 1
app.delete('/api/users:id', (req,res) => {
    // TODO: delete the user with id 
    return res.json({status:'pending'})
})
*/

// Routes for individual user operations (GET, PATCH, DELETE)
app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id)
        const user = users.find((user) => user.id === id)
        return res.json(user)
    })
    .patch((req, res) => {
         // TODO: edit the user with id 
        const id = Number(req.params.id)
        const index = users.findIndex((user) => user.id === id)
        const body = req.body
        users[index] = { ...users[index], ...body }
        // Writing updated user data to the JSON file
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, res) => { })
        return res.json({ status: 'Success', body: users[index] })
    })
    .delete((req, res) => {
        // TODO: delete the user with id 
        const id = Number(req.params.id)
        const index = users.findIndex((user) => user.id === id)
        // Deleting the specified user from the user array
        const deleted = users.splice(index, 1)[0]
        // Writing updated user data to the JSON file
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, res) => { })
        return res.json({ status: 'Success', delete: deleted })
    })

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
