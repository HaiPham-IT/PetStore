const Product = require('../model/product-schema')
const Type = require('../model/productType-schema')
const Trademark = require('../model/trademark-schema')
const {rules, rulesForModify, productAttriName} = require('../validation/product-validation')
const Validator = require('validatorjs')
const productErrMess = require('../validation/errors-message/product-validation-errors-message')

const createProduct = (req, res) => {
    let {proId, proName, trademark, proType, description, rate} = req.body

    let product = {proId, proName, trademark, proType, description, rate}

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

const getProducts = (req, res) =>{
    return Product.find().populate('trademarkId').populate('proTypeId')
        .then(rs => {
            let obj = {
                success: true,
                count: rs.length,
                result: rs
            }
            return res.status(200).json({obj})
        })
        .catch(err => res.status(500).json({success: false, err}))
}

const getById = (req, res) => {
    return Product.findById(req.params.id)
        .then(rs => res.status(200).json({success: true, rs}))
        .catch(err => res.status(500).json({success: false, err}))
}

const modifyProduct = (req, res) => {
    const {id, proId, proName, trademark, proType, description, rate} = req.body
    let product = {proId, proName, trademark, proType, description, rate}
    let err = productValidation(product, rulesForModify)
    if(!err.status){
        return res.status(err.statusCode).json({success: false, errMessage: err.errMessage})
    }

    return Product.updateOne({
            _id: id,
            $set: product
        })
        .then(rs => res.status(200).json({success: 'true'}))
        .catch(err => res.status(500).json({success: 'false', err}))
}

const productValidation = (product, rule) => {
    let validator = new Validator(product, rule, productErrMess)
    validator.setAttributeNames(productAttriName)
    let err = {}
    if(validator.fails()){
        err.status = false
        err.errMessage = validator.errors
        err.statusCode = 400
    }else{
        err.status = true
    }

    return err
}

let checkProductType = (product) => {
    return new Promise((resolve, reject)=>{
        return Type.findOne({typeName: product.proType})
            .then((rs) => {
                if(!rs) {
                    reject({err: 'Type does not exist'})
                }else{
                    product.proTypeId = rs._id
                    resolve(product)
                }
                return;
            })
            .catch(err=>{
                reject(err)
            })
    })
}

const checkTrademark = (product) => {
    return new Promise((resolve, reject)=>{
        return Trademark.findOne({trademarkName: product.trademark})
            .then((rs) => {
                if(!rs) {
                    reject({err: 'Trademark does not exist'})
                }else{
                    product.trademarkId = rs._id
                    resolve(product)
                } 
                return;
            })
            .catch(err=>reject(err))
    })
}

module.exports = {createProduct, getProducts, modifyProduct}