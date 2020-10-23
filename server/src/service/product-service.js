const Product = require('../model/product-schema')
const productvalidation = require('../validation/product-validation')
const Validator = require('validatorjs')
const productErrMess = require('../validation/errors-message/product-validation-errors-message')

const createProduct = (req, res) => {
    let {proId, proName, trademark, proType, description, rate} = req.body

    let product = {
        proId: proId,
        proName: proName,
        trademark: trademark,
        proType: proType,
        description: description,
        rate: rate
    }

    let validator = new Validator(product, productvalidation, productErrMess)

    

}

module.exports = {createProduct}