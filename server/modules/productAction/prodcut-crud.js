const Product = require('../model/product-schema')
const Type = require('../model/productType-schema')
const Trademark = require('../model/trademark-schema')

const createProduct = (req, res) => {
    let product = req.body
    let check = productValidation(product, rules)
    if(!check.status){
        return res.status(check.statusCode).json({success: false, errMessage: check.errMessage})
    }
    return checkProductType(product)
        .then(product => checkTrademark(product))
        .then(product => new Product(product).save())
        .then(rs => res.status(201).json({success: true, rs}))
        .catch(err => res.status(500).json({success: false, err}))

}