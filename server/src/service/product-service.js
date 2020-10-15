const Product = require('../model/product-schema')

const createProduct = (req, res) => {
    let {proId, proName, trademark, proType, description, rate} = req.body

    console.log(req.body)
    console.log(proName)
}

module.exports = {createProduct}