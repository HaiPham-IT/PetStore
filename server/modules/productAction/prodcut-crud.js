const Product = require('../model/product-schema')
const Trademark = require('../model/trademark-schema')
const createErr = require('../common/create-error')

const createProduct = (req, res, next) => {
    let product = req.body
    return Product.findOne({proCode: product.proCode})
        .then(rs => rs ? Promise.reject(createErr(`Product [proCode=${product.proCode}] already exist`, 409)) : new Product(product).save())
        .then(rs => res.status(200).json(rs))
        .catch(err => next(err))
}

const getAllProduct = (req, res, next) => {
    return Product.find().populate('trademark')
    .then(result => res.status(200).json(result))
    .catch(() => [])
}

const updateProduct = (req, res, next) => {
    let product = req.body
    const checkProCode = () => {
        if(req.body.proCode)return Product.findOne({proCode: product.proCode})
        return Promise.resolve()
    }
    return checkProCode()
    .then(rs => (rs && rs._id !== req.query.id) ? Promise.reject(createErr(`Product [proCode=${product.proCode}] already exist`, 409)) : Product.updateOne({_id: req.query.id},{$set: product}))
    .then(rs => res.status(200).json(rs))
    .catch(err => next(err))
}

const deleteProduct = (req, res, next) => {
    return Product.deleteOne({_id: req.params.id})
    .then(rs => res.status(200).json(rs))
    .catch(err => next(err))
}

module.exports = {createProduct, getAllProduct, updateProduct, deleteProduct}