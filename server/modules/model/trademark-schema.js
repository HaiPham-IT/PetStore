const mongoose = require('mongoose')

const trademark = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Trademark', trademark)