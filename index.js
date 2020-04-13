const express = require('express');
const db = require('./database.js');


const server = express();

server.use(express.json());

//Get users from DB
server.get('/api/users', (req, res) => {
    // res.json({ messages: 'hello world' })
    const users = db.getUsers()

    res.json(users)
})

//Get user by id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    const user = db.getUsersById(id)

    if(user) {
        res.json(user)
    }else {
        res.status(404).json({
            message: 'User not found'
        })
    }
})

//Create user
server.post('/api/users', (req, res) => {
    if(!req.body.name || !req.body.bio) {
        return res.status(400).json({
            message: 'Need username and/or bio'
        })
    }

    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    })

    res.status(201).json(newUser)
})

//Delete user with id
server.delete('/api/users/:id', (req, res) => {
    const user = db.getUsersById(req.params.id)

    if(user) {
        db.deleteUser(user)

        res.status(204).end()
    }else {
        res.status(404).json({
            message: 'User not found'
        })
    }
})

//Update user
server.put('/api/users/:id', (req, res) => {
    const user = getUsersById(req.params.id)

    if(user) {
        const updatedUser = db.updateUser(user.id, {
            name: req.params.name || user.name,
            bio: req.params.bio || user.bio
        })

        res.json(updatedUser)
    }else {
        res.status(404).json({
            message: 'User not found'
        })
    }
})

server.listen(8080, () => {
    console.log('server started at port 8080')
})