const Product = require('../model/product-schema')
const Trademark = require('../model/trademark-schema')

const createProduct = (req, res, next) => {
    let product = req.body
    return new Product(product).save().then(rs => res.status(200).json(rs)).catch(err => next(err))

}

const getAllProduct = (req, res, next) => {
    return Product.find().populate('trademark').then(result => res.status(200).json(result)).catch(() => [])
}

const updateProduct = (req, res, next) => {
    let product = req.body
    return Product.updateOne({_id: req.query.id},{$set: product}).then(rs => res.status(200).json(rs)).catch(err => next(err))
}

const deleteProduct = (req, res, next) => {
    return Product.deleteOne({_id: req.params.id}).then(rs => res.status(200).json(rs)).catch(err => next(err))
}

module.exports = {createProduct, getAllProduct, updateProduct, deleteProduct}