const Type = require('../model/productType-schema')
const {trademarkRules, trademarkAttriName} = require('../validation/trademark-validation')
const Validator = require('validatorjs')

const createTrademark = (req, res) => {
    const {trademarkName} = req.body

    let trademark = {trademarkName}

    let check = trademarkValidation(trademark, trademarkRules)

    if(!check.status){
        return res.status(err.statusCode).json({success: false, errMessage: check.errMessage})
    }

    return new Type(typeObj).save()
        .then(rs => res.status(200).json({success: true, result: rs}))
        .catch(err => res.status(500).json({success: false, err}))

}

const trademarkValidation = (obj, rules) => {
    let validator = new Validator(obj, rules)
    validator.setAttributeNames(trademarkAttriName)
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

module.exports = {createTrademark}