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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Info'
    }
})

module.exports = mongoose.model('User', user)