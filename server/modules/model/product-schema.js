const mongoose = require('mongoose')
const Trademark = require('./trademark-schema')

const product = new mongoose.Schema({
    proCode: {
        type: String, 
        require: true, 
        unique: true
    },
    proName: {
        type: String
    },
    trademark: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trademark'
    },
    proType: {
        type: String
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
    },
    img: [
        {
            type: String
        }
    ]
})

module.exports = mongoose.model('Product', product)