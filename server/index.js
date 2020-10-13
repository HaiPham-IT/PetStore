const Product = require('./src/model/product-schema')
const Validation = require('validatorjs')
const product_validator = require('./src/validation/product-validation')

let product = {
    proId: '',
    proName: 'pate',
    trademark: 'Whiscat',
    proType: 'food',
    description: 'this is a food for pet',
    rate: '1'
}
 
let validator = new Validation(product, product_validator)
// console.log(validator.passes)
if(validator.fails()){
    if(validator.errors.has('proId')) console.log(validator.errors.first('proId'))
}