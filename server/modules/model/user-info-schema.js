const mongoose = require('mongoose')

const info = new mongoose.Schema({
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
})

module.exports = mongoose.model('Info', info)