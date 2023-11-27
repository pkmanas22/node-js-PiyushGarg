const express = require('express');
const users = require('./MOCK_DATA.json')
const fs = require('fs')

const app = express();
const PORT = 8000;

// middleware -- plugin
app.use(express.urlencoded({ extended: false }))


// routes
// GET /users - List all users in HTML file - HTML document render
app.get('/users', (req, res) => {
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `
    res.send(html)
})


// REST API

// GET /api/users - List all users in JSON file
app.get('/api/users', (req, res) => {
    return res.json(users)
})


// POST /api/users - create a new user
app.post('/api/users', (req, res) => {
    // TODO: create new user
    const body = req.body
    // console.log(body);
    users.push({ ...body, id: users.length + 1 })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: `success`, id: users.length })
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


// all get,patch,delete in one place
app
    .route('/api/users/:id')
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
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, res) => { })
        return res.json({ status: 'Success', body: users[index] })
    })

    .delete((req, res) => {
        // TODO: delete the user with id 
        const id = Number(req.params.id)
        const index = users.findIndex((user) => user.id === id)

        const deleted = users.splice(index,1)[0]
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,res) => {})
        return res.json({ status: 'Success',delete: deleted })
    })


// Start the server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});