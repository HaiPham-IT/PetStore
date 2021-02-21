const mongoose = require('mongoose')

const user = new mongoose.Schema({
    username: {
        type: String,
        requied: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    info: {
        fullname: {
            type: String
        },
        phone: {
            type: String
        },
        code: {
            type: String
        },
        address: {
            type: String
        },
        email: {
            type: String
        }
    }
})

module.exports = mongoose.model('User', user)