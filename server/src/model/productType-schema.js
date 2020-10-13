const mongoose = require('mongoose')

const productType = new mongoose.Schema({
    typeName: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model('ProductType', productType)