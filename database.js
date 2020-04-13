const id = require('short-id')

let users = [
    {id: id.generate(), name: 'Vegeta', bio: 'Its over 9000'},
    {id: id.generate(), name: 'Goku', bio: 'Im hungry'},
    {id: id.generate(), name: 'Broly', bio: 'Kakarot'}
];

function getUsers() {
    return users
}

function getUsersById(id) {
    return users.find(user => user.id === id)
}

function createUser(data) {
    const payload = {
        id: id.generate(),
        ...data
    }

    users.push(payload)
    return payload
}

function deleteUser(id) {
    return users = users.filter(u => u.id != id)
}

function updateUser(id, data) {
    const index = users.findIndex(u => u.id === id)
    users[index] = {
        ...users[index],
        ...data
    }

    return users[index]
}

module.exports = {
    getUsers,
    getUsersById,
    createUser,
    deleteUser,
    updateUser
}