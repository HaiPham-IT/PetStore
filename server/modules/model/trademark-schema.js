const mongoose = require('mongoose')

const trademark = new mongoose.Schema({
    trademarkName: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Trademark', trademark)