const mongoose = require('mongoose')
const Product = require('./product-schema')

const img = new mongoose.Schema({
    url: {
        type: String,
        require: true
    },
    proId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
})
module.exports = mongoose.model('Img', img)