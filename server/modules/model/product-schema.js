const mongoose = require('mongoose')
const Trademark = require('./trademark-schema')
const ProductType = require('./productType-schema')

const product = new mongoose.Schema({
    proId: {
        type: String, 
        require: true, 
        unique: true
    },
    proName: {
        type: String
    },
    trademarkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trademark'
    },
    proTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductType'
    },
    description: {
        type: String
    },
    rate: {
        type: Number,
        min: 0,
        max: 5
    },
    price: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Product', product)