const Type = require('../model/productType-schema')
const {typeRules, productTypeAttriName} = require('../validation/product-type-validation')
const Validator = require('validatorjs')

const createProductType = (req, res) => {
    const {typeName} = req.body

    let typeObj = {typeName}

    let check = productTypeValidation(typeObj, typeRules)

    if(!check.status){
        return res.status(err.statusCode).json({success: false, errMessage: check.errMessage})
    }

    return new Type(typeObj).save()
        .then(rs => res.status(200).json({success: true, result: rs}))
        .catch(err => res.status(500).json({success: false, err}))

}

const productTypeValidation = (obj, rules) => {
    let validator = new Validator(obj, rules)
    // validator.setAttributeNames(productAttriName)
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

module.exports = {createProductType}